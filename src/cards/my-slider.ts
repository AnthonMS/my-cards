/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    LitElement,
    html,
    customElement,
    property,
    CSSResult,
    TemplateResult,
    css,
    PropertyValues,
    state
} from 'lit-element'
import { styleMap } from 'lit-html/directives/style-map'
import { HassEntity } from 'home-assistant-js-websocket'
import { hasConfigOrEntityChanged } from 'custom-card-helpers'; // community maintained npm module with common helper functions/types

import type { LovelaceCard } from '../types/lovelace';
import type { HomeAssistant } from '../types/homeassistant';
import type { MySliderConfig } from '../types/types'

import { SLIDER_VERSION } from './extras/const'
import { localize } from '../localize/localize'
import { getStyle } from './styles/my-slider.styles'
import { deflate } from '../scripts/deflate'
import { percentage, roundPercentage, getClickPosRelToTarget, stateActive, deepMerge, miredsToKelvin, kelvinToMireds } from '../scripts/helpers'
import { applySliderMin, shiftForHiddenMin } from '../scripts/slider-math'
import { objectEvalTemplate } from '../scripts/templating'

/* eslint no-console: 0 */
console.info(
    `%c  ---- MY-SLIDER-V2 ---- \n%c  ${localize('common.version')} ${SLIDER_VERSION}    `,
    'color: orange; font-weight: bold; background: black',
    'color: white; font-weight: bold; background: green',
);

// This puts your card into the UI card picker dialog
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
    type: 'my-slider-v2',
    name: 'Slider Card V2',
    description: 'Custom Slider Card V2 for Lovelace.',
});

@customElement('my-slider-v2')
export class MySliderV2 extends LitElement {
    @property() private _config?: MySliderConfig
    private entity: HassEntity | undefined
    private sliderEl: HTMLElement | undefined
    private touchInput: boolean = false
    private thumbTapped: boolean = false
    private isSliding: boolean = false
    private clientXLast: number = 0
    private clientYLast: number = 0
    private actionTaken: boolean = false
    private readonly zero: number = 0
    private oldVal: number = 0
    private sliderVal: number = 0
    private sliderValPercent: number = 0.00
    private initialTransition: string = ''
    private deflatedValueStl: Record<string, any> = {}
    private lastIntermediateTs: number = 0
    private pendingIntermediate: { val: number; valPercent: number } | null = null
    private intermediateTimer: ReturnType<typeof setTimeout> | undefined = undefined
    private valueVisible: boolean = false
    private valueAxisPercent: number = 0
    private setSliderValues(val: number, valPercent: number, alreadyInversed = false): void {
        if (this._config.inverse && !alreadyInversed) {
            this.sliderVal = this._config.max - val;
            this.sliderValPercent = 100 - valPercent;
        } else {
            this.sliderVal = val;
            this.sliderValPercent = valPercent;
        }
    }

    public static getStubConfig(): object {
        return {}
    }

    static get properties() {
        return {
            hass: {},
            config: {},
            active: {}
        }
    }

    @property({ attribute: false }) public hass!: HomeAssistant;
    @state() private config!: MySliderConfig;
    public setConfig(config: MySliderConfig): void {
        const allowedEntities = [
            'light',
            'input_number',
            'number',
            'media_player',
            'cover',
            'fan',
            'switch',
            'input_boolean',
            'lock'
        ]

        if (!config.entity) {
            throw new Error("You need to define entity")
        }

        // #48: with an explicit `attribute:` the card reads/writes that attribute
        // generically, so any domain is allowed (e.g. humidifier). The whitelist
        // still applies to state-based configs.
        if (!allowedEntities.includes(config.entity.split('.')[0]) && !config.attribute) {
            throw new Error(`Entity has to be one of the following: ${allowedEntities.map(e => ' ' + e)}`)
        }

        this.config = {
            name: 'MySliderV2',
            ...config,
        }
    }

    protected shouldUpdate(changedProps: PropertyValues): boolean {
        if (!this.config) {
            return false
        }
        if (this._config !== undefined) {
            // If slider is a seekbar for a media_player and it is currently playing, we want to keep updating the card since we have to calcuate progress ourselves
            if (this._config.mode === 'seekbar' && this.entity.state === 'playing') {
                // return true
            }
        }
        return hasConfigOrEntityChanged(this, changedProps, false)
    }
    // After your component has been rendered
    updated(changedProperties: PropertyValues) {
        super.updated(changedProperties);
        requestAnimationFrame(() => {
            if (this.sliderEl === undefined && this.shadowRoot !== null) {
                this.sliderEl = this.shadowRoot.querySelector('.my-slider-custom-container');
                const progressEl: HTMLElement | null = this.sliderEl.querySelector('.my-slider-custom-progress')
                this.initialTransition = progressEl!.style.transition
            }
        })
    }

    // ------------------------------------------------------------------
    // Input handlers. These were closures recreated inside every render(),
    // and createAndCleanupEventListeners() re-registered them on document each
    // time WITHOUT being able to remove the previous render's closures (a
    // removeEventListener with a brand-new function is a no-op) — so document
    // listeners accumulated for the element's whole lifetime and every one of
    // them ran on every mouse move. They are now stable instance fields,
    // registered once in connectedCallback and removed in disconnectedCallback
    // (which also fixes the element being kept alive after removal).
    // Bodies are verbatim moves; only the shared document/lit wiring changed.
    // ------------------------------------------------------------------
    private sliderHandler = (event) => {
        switch (event.type) {
            case 'mousedown':
                if (this.touchInput) return
                this.startInput(event)
                break
            case 'touchstart':
                this.touchInput = true
                this.startInput(event)
                break
            case 'mousemove':
                if (this.touchInput) return
                this.moveInput(event)
                break
            case 'touchmove':
                if (this._config.disableScroll)
                    event.preventDefault()
                this.moveInput(event)
                break
            case 'mouseup':
            case 'touchend':
            case 'touchcancel':
                this.stopInput(event)
                break
        }
    }

    private startInput = (event) => {
        if (this.actionTaken) return

        const clickX = event.clientX || event.touches[0].clientX
        const clickY = event.clientY || event.touches[0].clientY
        if (this.clientXLast === 0) {
            this.clientXLast = clickX
        }
        if (this.clientYLast === 0) {
            this.clientYLast = clickY
        }

        if (this._config.allowTapping) {
            this.actionTaken = true
            this.calcProgress(event)
            return
        }
        else {
            const actualTarget = event.composedPath()[0]
            const thumbElement = this.shadowRoot?.querySelector('.my-slider-custom-thumb')
            if (actualTarget.classList.contains('my-slider-custom-thumb')) {
                this.thumbTapped = true
                this.actionTaken = true
                this.calcProgress(event)
                return
            }
            else if (thumbElement) {
                const thumbRect = thumbElement.getBoundingClientRect()

                if (clickX >= thumbRect.left - this._config.marginOfError &&
                    clickX <= thumbRect.right + this._config.marginOfError &&
                    clickY >= thumbRect.top - this._config.marginOfError &&
                    clickY <= thumbRect.bottom + this._config.marginOfError) {
                    this.thumbTapped = true
                    this.actionTaken = true
                    this.calcProgress(event)
                    return
                }
            }
        }
        if (this._config.allowSliding) {
            this.actionTaken = true
        }

        this.clientYLast = clickY
        this.clientXLast = clickX
    }

    private stopInput = (event) => {
        if (!this.actionTaken) return

        // Same pre-first-frame exposure as moveInput: skip the transition reset when
        // sliderEl is not set yet (there is nothing rendered to reset), but still fall
        // through so the input flags below are cleared. (F-10)
        if (this.sliderEl !== undefined && this.sliderEl !== null) {
            const progressEl: HTMLElement | null = this.sliderEl.querySelector('.my-slider-custom-progress')
            progressEl!.style.transition = this.initialTransition
        }

        // #23: hide the floating value label when the interaction ends
        if (this._config.showValue && this.shadowRoot) {
            const valueEl: HTMLElement | null = this.shadowRoot.querySelector('.my-slider-custom-value')
            if (valueEl) valueEl.style.display = 'none'
        }
        this.valueVisible = false

        if (this._config.allowTapping) {
            this.calcProgress(event)
        }
        else if (this.thumbTapped) {
            this.calcProgress(event)
        }
        else if (this.isSliding) {
            this.calcProgress(event)
        }
        // Commit the release value even if it landed inside a throttle gap. Runs
        // while actionTaken is still true (it's cleared in the setTimeout below),
        // so setValue's `if (!this.actionTaken) return` guard still passes.
        this.flushIntermediate()
        this.lastIntermediateTs = 0
        this.thumbTapped = false
        this.touchInput = false
        this.isSliding = false
        setTimeout(() => {
            this.actionTaken = false
        }, 50);
    }

    private moveInput = (event) => {
        if (this.actionTaken) {
            // sliderEl is grabbed in a requestAnimationFrame after first render (updated()).
            // A drag that begins before that frame reaches here with sliderEl undefined and
            // used to throw an uncaught TypeError. Ignore the move instead — calcProgress
            // already guards the same way. (F-10)
            if (this.sliderEl === undefined || this.sliderEl === null) return
            const progressEl: HTMLElement | null = this.sliderEl.querySelector('.my-slider-custom-progress')
            progressEl!.style.transition = ''


            const clickX = event.clientX || event.touches[0].clientX
            const clickY = event.clientY || event.touches[0].clientY
            if (this._config.allowTapping || this.isSliding ||
                (!this._config.allowTapping && this.thumbTapped)) {
                this.calcProgress(event)
                this.clientXLast = clickX
                this.clientYLast = clickY
            }
            else if (this._config.allowSliding) {
                if (!this._config.vertical) {
                    if (Math.abs(clickX - this.clientXLast) >= this._config.slideDistance) {
                        this.isSliding = true
                        this.clientXLast = clickX
                        this.clientYLast = clickY
                    }
                }
                else {
                    if (Math.abs(clickY - this.clientYLast) >= this._config.slideDistance) {
                        this.isSliding = true
                        this.clientXLast = clickX
                        this.clientYLast = clickY
                    }
                }
            }
        }
    }

    connectedCallback(): void {
        super.connectedCallback()
        document.addEventListener('mouseup', this.sliderHandler)
        document.addEventListener('touchend', this.sliderHandler)
        document.addEventListener('touchcancel', this.sliderHandler)
        document.addEventListener('mousemove', this.sliderHandler)
    }

    disconnectedCallback(): void {
        document.removeEventListener('mouseup', this.sliderHandler)
        document.removeEventListener('touchend', this.sliderHandler)
        document.removeEventListener('touchcancel', this.sliderHandler)
        document.removeEventListener('mousemove', this.sliderHandler)
        super.disconnectedCallback()
    }

    protected render(): TemplateResult | void {
        const initFailed = this.initializeConfig()
        if (initFailed !== null) return initFailed

        const defaultProgressStyle = [
            { 'transition': this._config.vertical ? 'height 0.2s ease 0s' : 'width 0.2s ease 0s' },
        ]
        const progressStyle = this._config!.styles?.progress ? { ...defaultProgressStyle, ...this._config!.styles.progress } : defaultProgressStyle

        const deflatedCardStl = deflate(this._config!.styles?.card) || {}
        const deflatedContainerStl = deflate(this._config!.styles?.container) || {}
        const deflatedTrackStl = deflate(this._config!.styles?.track) || {}
        const deflatedProgressStl = deflate(progressStyle)
        const deflatedThumbStl = deflate(this._config!.styles?.thumb) || {}
        const deflatedValueStl = deflate(this._config!.styles?.value) || {}
        this.deflatedValueStl = deflatedValueStl // cached for setProgress (per-mousemove path)
        // ---------- Styles ---------- //
        const cardStl = getStyle('card', deflatedCardStl)
        const containerStl = getStyle('container', deflatedContainerStl)
        const trackStl = getStyle('track', deflatedTrackStl)
        const progressStl = getStyle('progress', deflatedProgressStl)
        const thumbStl = getStyle('thumb', deflatedThumbStl)
        const valueStl = getStyle('value', deflatedValueStl)

        if (this._config.vertical) {
            progressStl.height = this.sliderValPercent.toString() + '%'

            // Setting default styles for vertical if nothing is provided
            cardStl.height = deflatedCardStl.height ? deflatedCardStl.height : '100%'
            cardStl.width = deflatedCardStl.width ? deflatedCardStl.width : '30px'
            progressStl.width = deflatedProgressStl.width ? deflatedProgressStl.width : '100%'
            progressStl.right = deflatedProgressStl.right ? deflatedProgressStl.right : 'auto'
            // F-2 fix: assigned the whole deflated style object instead of its .right value,
            // silently dropping a user styles.thumb 'right' on vertical sliders.
            thumbStl.right = deflatedThumbStl.right ? deflatedThumbStl.right : 'auto'
            thumbStl.width = deflatedThumbStl.width ? deflatedThumbStl.width : '100%'
            thumbStl.height = deflatedThumbStl.height ? deflatedThumbStl.height : '10px'

            if (this._config.flipped) {
                progressStl.top = deflatedProgressStl.top ? deflatedProgressStl.top : '0'
                thumbStl.bottom = deflatedThumbStl.bottom ? deflatedThumbStl.bottom : '-5px'
            }
            else {
                progressStl.bottom = deflatedProgressStl.bottom ? deflatedProgressStl.bottom : '0'
                thumbStl.top = deflatedThumbStl.top ? deflatedThumbStl.top : '-5px'
            }
        }
        else {
            progressStl.width = this.sliderValPercent.toString() + '%'
            if (this._config.flipped) {
                progressStl.right = deflatedProgressStl.right ? deflatedProgressStl.right : '0'
                thumbStl.right = deflatedThumbStl.right ? deflatedThumbStl.right : 'auto'
                thumbStl.left = deflatedThumbStl.left ? deflatedThumbStl.left : '-5px'
            }
        }

        if (this._config.showValue) {
            // The value bubble is absolutely positioned against the card (it lives OUTSIDE
            // the overflow:hidden container so it can float above the thumb) and never
            // affects surrounding layout. Make sure the card is a positioning context.
            if (!deflatedCardStl.position) cardStl.position = 'relative'
            if (this._config.vertical) {
                // vertical default: bubble to the RIGHT of the slider, tracking the thumb vertically
                valueStl.left = deflatedValueStl.left ? deflatedValueStl.left : 'calc(100% + 8px)'
                valueStl.bottom = deflatedValueStl.bottom ? deflatedValueStl.bottom : 'auto'
                valueStl.top = deflatedValueStl.top ? deflatedValueStl.top : '0%'
                valueStl.transform = deflatedValueStl.transform ? deflatedValueStl.transform : 'translate(0, -50%)'
            }
            // Intermediate:true now re-renders mid-drag; styleMap re-applies valueStl
            // every render. Drive display + tracked position from the live drag state so
            // the bubble doesn't blink off (display) or snap to 0% (left) between frames.
            valueStl.display = this.valueVisible ? 'block' : 'none'
            if (this.valueVisible) {
                if (!this._config.vertical) {
                    if (deflatedValueStl.left === undefined) valueStl.left = this.valueAxisPercent + '%'
                } else {
                    if (deflatedValueStl.top === undefined) valueStl.top = this.valueAxisPercent + '%'
                }
            }
        }

        return html`
            <ha-card class="my-slider-custom-card" style="${styleMap(cardStl)}">
                <div class="my-slider-custom-container" id="${this._config.sliderId}" style="${styleMap(containerStl)}" data-value="${this.sliderVal}" data-progress-percent="${this.sliderValPercent}"
                    @mousedown="${this.sliderHandler}"
                    @mouseup="${this.sliderHandler}"
                    @mousemove="${this.sliderHandler}"
                    @touchstart="${{ handleEvent: this.sliderHandler, passive: true }}"
                    @touchend="${this.sliderHandler}"
                    @touchcancel="${this.sliderHandler}" 
                    @touchmove="${{ handleEvent: this.sliderHandler, passive: !this._config.disableScroll }}"
                >
                    <div class="my-slider-custom-track" style="${styleMap(trackStl)}">
                        <div class="my-slider-custom-progress" style="${styleMap(progressStl)}">
                            <div class="my-slider-custom-thumb" style="${styleMap(thumbStl)}"></div>
                        </div>
                    </div>
                </div>
                ${this._config.showValue ? html`<div class="my-slider-custom-value" style="${styleMap(valueStl)}"></div>` : ''}
            </ha-card>
        `
    }

    // Returns null on success, or a renderable error (TemplateResult / hui-error-card
    // HTMLElement). Kept as `any` because typing it forces a wider render() signature
    // than lit-element 2 declares; revisit with the lit 3 migration.
    private initializeConfig(): any {
        if (this.actionTaken) return null
        this.entity = this.hass.states[`${this.config.entity}`]
        try {
            this._config = objectEvalTemplate(this, this.entity, this.config)
        } catch (e) {
            if (e instanceof Error) {
                if (e.stack) console.error(e.stack)
                else console.error(e)
                const errorCard = document.createElement('hui-error-card') as LovelaceCard
                errorCard.setConfig({
                    type: 'error',
                    error: e.toString(),
                    origConfig: this.config,
                })
                return errorCard
            }
            else {
                console.log('Unexpected error evaluating config on init:', e)
            }
        }
        if (!this._config) return html`Error with evaluated _config`
        const entityType = this._config.entity ? this._config.entity?.split('.')[0] : this._config!.entity ? this._config!.entity.split('.')[0] : 'none'

        const defaultConfig:MySliderConfig = {
            sliderId: `slider-${this._config!.entity.replace('.', '-')}-${this._config.mode}`,
            type: this._config.type,
            disableScroll: this._config!.disableScroll !== undefined ? this._config!.disableScroll : true,
            allowTapping: this._config!.allowTapping !== undefined ? this._config!.allowTapping : true,
            allowSliding: this._config!.allowSliding !== undefined ? this._config!.allowSliding : false,
            marginOfError: this._config!.marginOfError !== undefined ? this._config!.marginOfError : 10,
            slideDistance: this._config!.slideDistance !== undefined ? this._config!.slideDistance : 10,
            showMin: this._config!.showMin !== undefined ? this._config!.showMin : false,
            showValue: this._config!.showValue !== undefined ? this._config!.showValue : false,
            minThreshold: 0,
            maxThreshold: 100,
            sliderMin: this._config!.sliderMin ? this._config!.sliderMin : 0,
            vertical: this._config!.vertical !== undefined ? this._config!.vertical : false,
            flipped: this._config!.flipped !== undefined ? this._config!.flipped : false,
            inverse: this._config!.inverse !== undefined ? this._config!.inverse : false,
            intermediate: this._config!.intermediate !== undefined ? this._config!.intermediate : false,
            intermediateInterval: this._config!.intermediateInterval !== undefined ? this._config!.intermediateInterval : 100,
            min: this._config!.min ? this._config!.min : 0,
            max: this._config!.max ? this._config!.max : 100,
            step: this._config!.step ? this._config!.step : 1,
            mode: this._config!.mode !== undefined ? this._config!.mode :
                this._config!.colorMode !== undefined ? this._config!.colorMode :
                    this._config!.coverMode !== undefined ? this._config!.coverMode :
                        entityType === 'light' ? 'brightness' :
                            entityType === 'cover' ? 'position' :
                                entityType === 'media_player' ? 'volume' :
                                    'brightness',
        }

        let tmpVal = 0
        let sliderVal1 = 0
        let sliderVal2 = 0
        let alreadyInversed = false
        if (this._config.attribute !== undefined) { /* ------------ ATTRIBUTE (#48) ------------ */
            // Read the value from an entity attribute instead of the state. Takes
            // precedence over the per-domain branches below. min/max default from the
            // HA convention min_<attribute>/max_<attribute> when those exist (e.g.
            // humidifier: humidity + min_humidity/max_humidity).
            defaultConfig.min = this._config!.min ? this._config!.min :
                this.entity.attributes['min_' + this._config.attribute] !== undefined ? this.entity.attributes['min_' + this._config.attribute] : 0
            defaultConfig.max = this._config!.max ? this._config!.max :
                this.entity.attributes['max_' + this._config.attribute] !== undefined ? this.entity.attributes['max_' + this._config.attribute] : 100

            const attrVal = parseFloat(this.entity.attributes[this._config.attribute])
            tmpVal = isNaN(attrVal) ? 0 : attrVal
            this.oldVal = tmpVal
            if (!defaultConfig.showMin && defaultConfig.min) { // Subtracting savedMin to make slider 0 be far left
                ({ max: defaultConfig.max, val: tmpVal } = shiftForHiddenMin(defaultConfig.min, defaultConfig.max, tmpVal))
            }
            tmpVal = applySliderMin(tmpVal, defaultConfig.sliderMin)

            sliderVal1 = tmpVal
            sliderVal2 = roundPercentage(percentage(tmpVal, defaultConfig.max))
        }
        else switch (entityType) {

            case 'light': /* ------------ LIGHT ------------ */
                if (defaultConfig.mode === 'brightness') {
                    this.oldVal = Math.ceil(percentage(this.entity.attributes.brightness, 256))
                    if (this.entity.state === 'on') {
                        tmpVal = Math.ceil(percentage(this.entity.attributes.brightness, 256))
                        if (!defaultConfig.showMin && defaultConfig.min) { // Subtracting savedMin to make slider 0 be far left
                            ({ max: defaultConfig.max, val: tmpVal } = shiftForHiddenMin(defaultConfig.min, defaultConfig.max, tmpVal))
                        }
                    }
                    tmpVal = applySliderMin(tmpVal, defaultConfig.sliderMin)
                }
                else if (defaultConfig.mode === 'temperature') {
                    if (this.entity.state !== 'on') break
                    // Modern HA (2022.11+) exposes kelvin attributes and newer versions no longer
                    // provide the deprecated mireds attributes. The slider keeps operating in
                    // mireds internally and derives them from kelvin when needed. Kelvin and
                    // mireds scales are inverted, hence min<->max swapping. (#73)
                    const attrs = this.entity.attributes
                    const minMireds = attrs.min_mireds !== undefined ? attrs.min_mireds :
                        attrs.max_color_temp_kelvin !== undefined ? kelvinToMireds(attrs.max_color_temp_kelvin) : undefined
                    const maxMireds = attrs.max_mireds !== undefined ? attrs.max_mireds :
                        attrs.min_color_temp_kelvin !== undefined ? kelvinToMireds(attrs.min_color_temp_kelvin) : undefined
                    const currentMireds = attrs.color_temp !== undefined && attrs.color_temp !== null ? attrs.color_temp :
                        attrs.color_temp_kelvin !== undefined && attrs.color_temp_kelvin !== null ? kelvinToMireds(attrs.color_temp_kelvin) : undefined
                    defaultConfig.min = this._config!.min ? this._config!.min : minMireds
                    defaultConfig.max = this._config!.max ? this._config!.max : maxMireds
                    tmpVal = parseFloat(currentMireds as any)
                    this.oldVal = parseFloat(currentMireds as any)
                    if (!defaultConfig.showMin) { // Subtracting savedMin to make slider 0 be far left
                        ({ max: defaultConfig.max, val: tmpVal } = shiftForHiddenMin(defaultConfig.min, defaultConfig.max, tmpVal))
                    }

                    tmpVal = applySliderMin(tmpVal, defaultConfig.sliderMin)

                }
                else if (defaultConfig.mode === 'hue' && this.entity.attributes.color_mode === 'hs') {
                    if (this.entity.state !== 'on') break

                    defaultConfig.min = this._config!.min ? this._config!.min : 0
                    defaultConfig.max = this._config!.max ? this._config!.max : 360
                    this.oldVal = parseFloat(this.entity.attributes.hs_color[0])

                    tmpVal = parseFloat(this.entity.attributes.hs_color[0])
                    if (!defaultConfig.showMin) { // Subtracting savedMin to make slider 0 be far left
                        ({ max: defaultConfig.max, val: tmpVal } = shiftForHiddenMin(defaultConfig.min, defaultConfig.max, tmpVal))
                    }
                    tmpVal = applySliderMin(tmpVal, defaultConfig.sliderMin)
                }
                else if (defaultConfig.mode === 'saturation' && this.entity.attributes.color_mode === 'hs') {
                    if (this.entity.state !== 'on') break

                    defaultConfig.min = this._config!.min ? this._config!.min : 0
                    defaultConfig.max = this._config!.max ? this._config!.max : 100
                    this.oldVal = parseFloat(this.entity.attributes.hs_color[1])

                    tmpVal = parseFloat(this.entity.attributes.hs_color[1])
                    if (!defaultConfig.showMin) { // Subtracting savedMin to make slider 0 be far left
                        ({ max: defaultConfig.max, val: tmpVal } = shiftForHiddenMin(defaultConfig.min, defaultConfig.max, tmpVal))
                    }
                    tmpVal = applySliderMin(tmpVal, defaultConfig.sliderMin)
                }
                sliderVal1 = tmpVal
                sliderVal2 = roundPercentage(percentage(tmpVal, defaultConfig.max))

                break
            case 'input_number': /* ------------ INPUT_NUMBER ------------ */
            case 'number':
                defaultConfig.step = this._config!.step ? this._config!.step : this.entity.attributes.step
                defaultConfig.min = this._config!.min ? this._config!.min : this.entity.attributes.min
                defaultConfig.max = this._config!.max ? this._config!.max : this.entity.attributes.max
                
                this.oldVal = parseFloat(this.entity.state)
                tmpVal = parseFloat(this.entity.state)
                if (!defaultConfig.showMin && defaultConfig.min) { // Subtracting savedMin to make slider 0 be far left
                    ({ max: defaultConfig.max, val: tmpVal } = shiftForHiddenMin(defaultConfig.min, defaultConfig.max, tmpVal))
                }
                tmpVal = applySliderMin(tmpVal, defaultConfig.sliderMin)

                sliderVal1 = tmpVal
                sliderVal2 = roundPercentage(percentage(tmpVal, defaultConfig.max))

                break
            case 'media_player': /* ------------ MEDIA_PLAYER ------------ */
                tmpVal = 0
                if (defaultConfig.mode === 'volume') {
                    if (this.entity.attributes.volume_level != undefined) {
                        tmpVal = Number(this.entity.attributes.volume_level * 100)
                    }

                    if (!defaultConfig.showMin) { // Subtracting savedMin to make slider 0 be far left
                        defaultConfig.max = defaultConfig.max - defaultConfig.min
                        // tmpVal = tmpVal - defaultConfig.min
                    }
                }
                else if (defaultConfig.mode === 'seekbar') {
                    defaultConfig.max = this.entity.attributes.media_duration
                    const now = new Date();
                    const updatedAt = new Date(this.entity.attributes.media_position_updated_at)
                    const initialPosition = this.entity.attributes.media_position
                    // Calculate the difference in seconds
                    let timeDifference = (now.getTime() - updatedAt.getTime()) / 1000
                    // Calculate the current position
                    let currentPosition = initialPosition + timeDifference
                    // Ensure the current position does not exceed the duration
                    currentPosition = Math.min(currentPosition, defaultConfig.max);
                    tmpVal = currentPosition
                }

                tmpVal = applySliderMin(tmpVal, defaultConfig.sliderMin)
                this.oldVal = tmpVal
                
                sliderVal1 = tmpVal
                sliderVal2 = roundPercentage(percentage(tmpVal, defaultConfig.max))

                break
            case 'cover': /* ------------ COVER ------------ */
                defaultConfig.inverse = this._config!.inverse ? this._config!.inverse : true
                defaultConfig.vertical = this._config!.vertical ? this._config!.vertical : true
                defaultConfig.flipped = this._config!.flipped ? this._config!.flipped : true

                if (defaultConfig.mode === 'position') {
                    if (this.entity.attributes.current_position != undefined) {
                        tmpVal = Number(this.entity.attributes.current_position)
                    }
                } else if (defaultConfig.mode === 'tilt') {
                    if (this.entity.attributes.current_tilt_position != undefined) {
                        tmpVal = Number(this.entity.attributes.current_tilt_position)
                    }
                }

                if (!defaultConfig.showMin && defaultConfig.min) { // Subtracting savedMin to make slider 0 be far left
                    ({ max: defaultConfig.max, val: tmpVal } = shiftForHiddenMin(defaultConfig.min, defaultConfig.max, tmpVal))
                }
                
                // Calculate tmpVal based on the inverse logic
                if (defaultConfig.inverse) {
                    // Inverted logic
                    tmpVal = defaultConfig.max - tmpVal; // Invert for the slider
                    alreadyInversed = true
                }

                tmpVal = applySliderMin(tmpVal, defaultConfig.sliderMin)
                this.oldVal = tmpVal

                sliderVal1 = tmpVal
                sliderVal2 = roundPercentage(percentage(tmpVal, defaultConfig.max))

                break
            case 'fan':
                tmpVal = 0
                if (this.entity.attributes.percentage != undefined) {
                    tmpVal = Number(this.entity.attributes.percentage)
                }
                this.oldVal = tmpVal

                if (!defaultConfig.showMin && defaultConfig.min) { // Subtracting savedMin to make slider 0 be far left (sometimes needed, sometimes not. I dont have a fan to test this. Sorry)
                    ({ max: defaultConfig.max, val: tmpVal } = shiftForHiddenMin(defaultConfig.min, defaultConfig.max, tmpVal))
                }

                tmpVal = applySliderMin(tmpVal, defaultConfig.sliderMin)

                sliderVal1 = tmpVal
                sliderVal2 = roundPercentage(percentage(tmpVal, defaultConfig.max))
                break
            case 'switch':
                defaultConfig.minThreshold = this._config!.minThreshold ? this._config!.minThreshold : 15
                defaultConfig.maxThreshold = this._config!.maxThreshold ? this._config!.maxThreshold : 75
                tmpVal = Number(Math.max(this.zero, defaultConfig.minThreshold))

                tmpVal = applySliderMin(tmpVal, defaultConfig.sliderMin)

                sliderVal1 = tmpVal
                sliderVal2 = tmpVal
                break
            case 'input_boolean':
                break
            case 'lock': /* ------------ LOCK ------------ */
                defaultConfig.minThreshold = this._config!.minThreshold ? this._config!.minThreshold : 15
                defaultConfig.maxThreshold = this._config!.maxThreshold ? this._config!.maxThreshold : 95
                tmpVal = Number(Math.max(this.zero, defaultConfig.minThreshold))// Set slider to larger of 2 minimums

                tmpVal = applySliderMin(tmpVal, defaultConfig.sliderMin)
                this.oldVal = tmpVal
                sliderVal1 = tmpVal
                sliderVal2 = tmpVal

                break
            default:
                console.log('No Entity type initiated... (' + this._config!.entity.split('.')[0] + ')')
                break
        }

        this._config = deepMerge(defaultConfig, this._config)
        this.setSliderValues(sliderVal1, sliderVal2, alreadyInversed)
        
        if (defaultConfig.mode === 'seekbar' && this.entity.state === 'playing') {
            this.updateSeekbar()
        }
        return null // Success in this case
    }

    private async updateSeekbar() {
        // if (this.sliderEl === undefined) return
        if (this.sliderEl === undefined) {
            setTimeout(() => this.updateSeekbar(), 500);
            return
        }
        if (this.entity.state !== 'playing') {
            return
        }

        let tmpVal = 0
        this._config.max = this.entity.attributes.media_duration
        const now = new Date()
        const updatedAt = new Date(this.entity.attributes.media_position_updated_at)
        const initialPosition = this.entity.attributes.media_position
        // Calculate the difference in seconds
        let timeDifference = (now.getTime() - updatedAt.getTime()) / 1000
        // Calculate the current position
        let currentPosition = initialPosition + timeDifference
        // Ensure the current position does not exceed the duration
        currentPosition = Math.min(currentPosition, this._config.max)
        tmpVal = currentPosition

        this.setSliderValues(tmpVal, roundPercentage(percentage(tmpVal, this._config.max)));
        this.setProgress(this.sliderEl, Math.round(tmpVal), 'updateSeekbar')

        // Update seekbar in 1 second again
        setTimeout(() => this.updateSeekbar(), 1000);
    }

    private calcProgress(event) {
        if (this.sliderEl === undefined || this.sliderEl === null) return
        const clickPos = getClickPosRelToTarget(event, this.sliderEl)
        const sliderWidth = this.sliderEl.offsetWidth
        const sliderHeight = this.sliderEl.offsetHeight
        // Calculate what the percentage is of the clickPos.x between 0 and sliderWidth / clickPos.y between 0 and sliderHeight
        const clickPercent = this._config.vertical ? roundPercentage(clickPos.y / sliderHeight * 100) : roundPercentage(clickPos.x / sliderWidth * 100)
        const newValue = clickPercent / 100 * (this._config.max - 0)
        const flippedValue = this._config.max - newValue
        let val = this._config.flipped ? flippedValue : newValue
        // Set val to be either min, max, zero or value
        val = val < this._config.min && this._config.showMin ? this._config.min : val > this._config.max ? this._config.max : val < this.zero ? this.zero : val
        this.setProgress(this.sliderEl, val, event.type)
    }

    private setProgress(slider, val, action) {
        const progressEl = slider.querySelector('.my-slider-custom-progress')

        // Round val to nearest step
        val = Math.round(val / this._config.step) * this._config.step

        let valuePercentage = roundPercentage(percentage(val, this._config.max))
        valuePercentage = valuePercentage < this._config.sliderMin ? this._config.sliderMin : valuePercentage

        // #23: update the floating value label while dragging (opt-in via showValue).
        // Only shown for user press/move actions; end actions and programmatic calls
        // (setSwitch/setLock/updateSeekbar) never show it, stopInput hides it.
        if (this._config.showValue && this.actionTaken &&
            (action === 'mousedown' || action === 'touchstart' || action === 'mousemove' || action === 'touchmove')) {
            const valueEl: HTMLElement | null = this.shadowRoot ? this.shadowRoot.querySelector('.my-slider-custom-value') : null
            if (valueEl) {
                valueEl.textContent = `${parseFloat(val.toFixed(2))}`
                // Follow the thumb (like the native HA slider bubble). Only the coordinate
                // along the slider axis is managed here; a user-supplied styles.value
                // `left` (horizontal) / `top` (vertical) disables tracking so fully custom
                // static positioning keeps working.
                const userValueStl = this.deflatedValueStl || {}
                if (!this._config.vertical) {
                    if (userValueStl.left === undefined) {
                        valueEl.style.left = (this._config.flipped ? 100 - valuePercentage : valuePercentage) + '%'
                    }
                }
                else {
                    if (userValueStl.top === undefined) {
                        valueEl.style.top = (this._config.flipped ? valuePercentage : 100 - valuePercentage) + '%'
                    }
                }
                valueEl.style.display = 'block'
                this.valueVisible = true
                this.valueAxisPercent = !this._config.vertical
                    ? (this._config.flipped ? 100 - valuePercentage : valuePercentage)
                    : (this._config.flipped ? valuePercentage : 100 - valuePercentage)
            }
        }


        if (this._config.vertical) {
            progressEl.style.height = valuePercentage.toString() + '%'
        }
        else {
            progressEl.style.width = valuePercentage.toString() + '%'
        }

        // Check if value has changed
        if (this.sliderVal !== val) {
            // Check if we should update entity on mousemove or mouseup
            if ((this._config!.intermediate && (action === 'mousemove' || action === 'mousedown' || action === 'touchmove' || action === 'touchstart')) ||
                (!this._config!.intermediate && (action === 'mouseup' || action === 'touchend' || action === 'touchcancel'))) {
                if (this._config!.intermediate) {
                    this.setValueIntermediate(val, valuePercentage)
                } else {
                    this.setValue(val, valuePercentage)
                }
            }
        }
    }

    // Intermediate throttling: remember the latest value and dispatch at most once
    // per intermediateInterval ms (leading + trailing edge), so a fast drag sends a
    // bounded number of service calls instead of one per pointermove.
    private setValueIntermediate(val: number, valPercent: number): void {
        this.pendingIntermediate = { val, valPercent }
        const interval = this._config!.intermediateInterval !== undefined ? this._config!.intermediateInterval : 100
        const elapsed = Date.now() - this.lastIntermediateTs
        if (elapsed >= interval) {
            this.flushIntermediate()
        } else if (this.intermediateTimer === undefined) {
            this.intermediateTimer = setTimeout(() => {
                this.intermediateTimer = undefined
                this.flushIntermediate()
            }, interval - elapsed)
        }
    }

    // Sends whatever value is pending right now and resets the throttle window.
    // Called on each throttle tick and once from stopInput, so the value the user
    // released on always lands even if it fell inside a throttle gap.
    private flushIntermediate(): void {
        if (this.intermediateTimer !== undefined) {
            clearTimeout(this.intermediateTimer)
            this.intermediateTimer = undefined
        }
        if (this.pendingIntermediate === null) return
        this.lastIntermediateTs = Date.now()
        const { val, valPercent } = this.pendingIntermediate
        this.pendingIntermediate = null
        this.setValue(val, valPercent)
    }


    private setValue(val, valPercent) {
        if (!this.entity) return
        this.setSliderValues(val, valPercent)

        if (!this._config.showMin) {
            val = val + this._config.min  // Adding min to make up for minimum not being 0
        }
        if (!this.actionTaken) return // We do not want to set any values based on pure movement of slider. Only set it on user action.

        // Adjust val and valPercent to take into account sliderMin
        val = percentage(val - this._config.sliderMin, 100 - this._config.sliderMin)
        val = val < this._config.min ? this._config.min : val
        // valPercent = percentage(valPercent - this._config.sliderMin, 100 - this._config.sliderMin)
        if (this._config.inverse) {
            // Mirror the value within the entity's REAL range. When showMin is false,
            // min was just added back to val and max was shrunk by min, so the real range
            // is [min, max + min]; with showMin true it is [min, max]. For min = 0 (the
            // common case: brightness, volume, cover position) both formulas reduce to the
            // previous `max - val`, so those domains are unchanged. Previously, domains
            // with min > 0 (e.g. temperature in mireds) produced out-of-range values. (#63)
            if (!this._config.showMin) {
                val = 2 * this._config.min + this._config.max - val;
            }
            else {
                val = this._config.min + this._config.max - val;
            }
        }

        if (this._config.attribute !== undefined) {
            // #48: attribute configs write through the domain's set_<attribute> service
            this._setAttribute(this.entity, val)
            if (!this._config.intermediate) this.actionTaken = false
            return
        }

        switch (this._config!.entity.split('.')[0]) {
            case 'light':
                if (this._config.mode === 'brightness') {
                    this._setBrightness(this.entity, val)
                }
                else if (this._config.mode === 'temperature') {
                    this._setColorTemp(this.entity, val)
                }
                else if (this._config.mode === 'hue') {
                    this._setHue(this.entity, val)
                }
                else if (this._config.mode === 'saturation') {
                    this._setSaturation(this.entity, val)
                }
                break
            case 'input_number':
            case 'number':
                this._setInputNumber(this.entity, val)
                break
            case 'media_player':
                if (this._config.mode === 'volume') {
                    this._setMediaVolume(this.entity, val)
                }
                else if (this._config.mode === 'seekbar') {
                    this._setMediaSeek(this.entity, val)
                }
                break
            case 'cover':
                if (this._config.mode === 'position') {
                    this._setCover(this.entity, val)
                } else if (this._config.mode === 'tilt') {
                    this._setCoverTilt(this.entity, val)
                }
                break
            case 'fan':
                this._setFan(this.entity, val)
                break
            case 'lock':
                this._setLock(this.entity, val)
                break
            case 'switch':
            case 'input_boolean':
                this._setSwitch(this.entity, val)
                break
            default:
                console.log('Default')
                break
        }
        if (!this._config.intermediate) this.actionTaken = false
    }

    private _setBrightness(entity, value): void {
        this.hass.callService("light", "turn_on", {
            entity_id: entity.entity_id,
            brightness: value * 2.56
        })
        this.oldVal = value
    }
    private _setColorTemp(entity, value): void {
        // Modern HA removed the deprecated 'color_temp' (mireds) parameter from
        // light.turn_on ("extra keys not allowed"). Send kelvin when the light
        // exposes kelvin attributes; keep legacy mireds for older installs. (#73)
        const attrs = entity.attributes ? entity.attributes : {}
        const supportsKelvin = attrs.color_temp_kelvin !== undefined ||
            attrs.min_color_temp_kelvin !== undefined ||
            attrs.max_color_temp_kelvin !== undefined
        if (supportsKelvin) {
            this.hass.callService("light", "turn_on", {
                entity_id: entity.entity_id,
                color_temp_kelvin: miredsToKelvin(value)
            })
        }
        else {
            this.hass.callService("light", "turn_on", {
                entity_id: entity.entity_id,
                color_temp: value
            })
        }
        this.oldVal = value

    }
    private _setHue(entity, value): void {
        let currentSaturation = 0
        if (entity.attributes.hs_color) {
            currentSaturation = parseFloat(entity.attributes.hs_color[1])
        }
        this.hass.callService("light", "turn_on", {
            entity_id: entity.entity_id,
            hs_color: [value, currentSaturation]
        })
        this.oldVal = value
    }
    private _setSaturation(entity, value): void {
        let currentHue = 0
        if (entity.attributes.hs_color) {
            currentHue = parseFloat(entity.attributes.hs_color[0])
        }
        this.hass.callService("light", "turn_on", {
            entity_id: entity.entity_id,
            hs_color: [currentHue, value]
        })
        this.oldVal = value
    }

    private _setAttribute(entity, value): void {
        // #48: write convention: <domain>.set_<attribute> with the attribute name as
        // the service-data key, e.g. humidifier.set_humidity { humidity: 55 }.
        const serviceData: any = { entity_id: entity.entity_id }
        // the internal sliderMin/min rescaling can leave float noise (e.g. 55.00000000000001);
        // trim it so services with integer/decimal schemas get a clean number
        serviceData[this._config.attribute] = parseFloat(parseFloat(value).toFixed(4))
        this.hass.callService(entity.entity_id.split('.')[0], `set_${this._config.attribute}`, serviceData)
        this.oldVal = value
    }
    private _setInputNumber(entity, value): void {
        this.hass.callService(entity.entity_id.split('.')[0], "set_value", { // either "input_number" or "number"
            entity_id: entity.entity_id,
            value: value
        })
        this.oldVal = value
    }
    private _setMediaVolume(entity, value): void {
        this.hass.callService("media_player", "volume_set", {
            entity_id: entity.entity_id,
            volume_level: value / 100
        })
        this.oldVal = value
    }
    private _setMediaSeek(entity, value): void {
        this.hass.callService("media_player", "media_seek", {
            entity_id: entity.entity_id,
            seek_position: value
        })
        this.oldVal = value
    }
    private _setCover(entity, value): void {
        this.hass.callService("cover", "set_cover_position", {
            entity_id: entity.entity_id,
            position: value
        })
        this.oldVal = value
    }

    private _setCoverTilt(entity, value): void {
        this.hass.callService("cover", "set_cover_tilt_position", {
            entity_id: entity.entity_id,
            tilt_position: value
        })
        this.oldVal = value
    }

    private _setFan(entity, value): void {
        this.hass.callService("fan", "set_percentage", {
            entity_id: entity.entity_id,
            percentage: value
        })
        this.oldVal = value
    }

    private _setSwitch(entity, value): void {
        var threshold = Math.min(this._config.max, this._config.maxThreshold) //pick lesser of the two
        if (Number(threshold) <= value) {
            this.hass.callService('homeassistant', 'toggle', {
                entity_id: entity.entity_id
            })
            this.oldVal = value
        }

        const val = Number(Math.max(this.zero, this._config.minThreshold))
        const valPercent = roundPercentage(percentage(val, this._config.max))

        const progressEl: HTMLElement | null = this.sliderEl!.querySelector('.my-slider-custom-progress')

        if (!this._config.vertical) {
            progressEl!.style.transition = 'width 0.2s ease 0s'
        }
        else {
            progressEl!.style.transition = 'height 0.2s ease 0s'
        }

        this.setSliderValues(val, valPercent)
        this.setProgress(this.sliderEl, val, 'setSwitch')
        setTimeout(() => { // Remove transition when done
            progressEl!.style.transition = this.initialTransition
        }, 200)
    }
    private _setLock(entity, value): void {
        var threshold = Math.min(this._config.max, this._config.maxThreshold) //pick lesser of the two
        if (Number(threshold) <= value) {
            var newLockState = entity.state === "locked" ? 'unlock' : 'lock'
            this.hass.callService("lock", newLockState, {
                entity_id: entity.entity_id
            })
        }

        const val = Number(Math.max(this.zero, this._config.minThreshold))
        const valPercent = roundPercentage(percentage(val, this._config.max))
        const progressEl: HTMLElement | null = this.sliderEl!.querySelector('.my-slider-custom-progress')

        if (!this._config.vertical) {
            progressEl!.style.transition = 'width 0.2s ease 0s'
        }
        else {
            progressEl!.style.transition = 'height 0.2s ease 0s'
        }
        this.setSliderValues(val, valPercent)
        this.setProgress(this.sliderEl, val, 'setLock')
        setTimeout(() => { // Remove transition when done
            progressEl!.style.transition = this.initialTransition
        }, 200)
    }


    // https://lit-element.polymer-project.org/guide/styles
    static get styles(): CSSResult {
        return css`
		`;
    }
}


/*
type: custom:my-slider-v2
entity: light.sofa_spots
attribute: none (Read/write this entity ATTRIBUTE instead of its state, e.g. 'humidity' on a humidifier. Range defaults from the entity's own min_<attribute>/max_<attribute> attributes; min/max config overrides. Writes via <domain>.set_<attribute>. See docs/cards/slider-v2.md)
colorMode: 'brightness' (Can be 'brightness', 'temperature', 'hue', 'saturation')
coverMode: 'position' (Accept: 'position', 'tilt')
mode: combined colorMode, coverMode and other future modes.
// warmth: false (Will be removed now!)
vertical: false (This will set the slider to be vertical and handled from bottom to top. Automatically used on covers)
flipped: false (This will just flip the slider to go from right to left or top to bottom. Automatically used on covers)
inverse: false (Will inverse how far the slider has progressed compared to value. so if brightness is 75%, then it will only be 25% progressed. This is useful for cover, where it is automatically used.)
min: 0
max: 100
intermediate: false
disableScroll: true (Disable scrolling on touch devices when starting the touchmove from within the slider)
allowTapping: true (Tap anywhere on the slider to set that value. If false you can only drag from thumb.)
showMin: false
showValue: false (Show a floating label with the current value while dragging. Style via styles.value. See docs/cards/slider-v2.md)
minThreshold: 15 (Only used for determining how much progress should be shown on a switch or lock)
maxThreshold: 75 (Only used to determine how far users have to slide to activate toggle commands for switch and lock)
styles:
  card:
    - height: 50px
  container:
    - background: red
  track:
    - background: blue
  thumb:
    - background: yellow
  value:
    - font-size: 16px
*/

