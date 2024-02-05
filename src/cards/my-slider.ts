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
// import './scripts/deflate.js'
import { deflate } from '../scripts/deflate'
import { percentage, roundPercentage, getClickPosRelToTarget, stateActive, deepMerge } from '../scripts/helpers'
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
    private sliderEl: HTMLBodyElement | undefined
    private touchInput: Boolean = false
    private thumbTapped: Boolean = false
    private isSliding: Boolean = false
    private clientXLast: number = 0
    private clientYLast: number = 0
    private actionTaken: Boolean = false
    private zero: number = 0
    private oldVal: number = 0
    private sliderVal: number = 0
    private sliderValPercent: number = 0.00
    private setSliderValues(val, valPercent): void {
        if (this._config.inverse) {
            this.sliderVal = this._config.max - val
            this.sliderValPercent = 100 - valPercent
        }
        else {
            this.sliderVal = val
            this.sliderValPercent = valPercent
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
            'lock'
        ]

        if (!config.entity) {
            throw new Error("You need to define entity")
        }

        if (!allowedEntities.includes(config.entity.split('.')[0])) {
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
        if (this.sliderEl === undefined) {
            this.sliderEl = this.shadowRoot?.querySelector('.my-slider-custom-container');
        }
    }

    protected render(): TemplateResult | void {
        const initFailed = this.initializeConfig()
        if (initFailed !== null) return initFailed

        const defaultProgressStyle = [
            // { 'transition': this.vertical ? 'height 0.2s ease 0s' : 'width 0.2s ease 0s' },
        ]
        const progressStyle = this._config!.styles?.progress ? { ...defaultProgressStyle, ...this._config!.styles.progress } : defaultProgressStyle

        const deflatedCardStl = deflate(this._config!.styles?.card) ? deflate(this._config!.styles?.card) : {}
        const deflatedContainerStl = deflate(this._config!.styles?.container) ? deflate(this._config!.styles?.container) : {}
        const deflatedTrackStl = deflate(this._config!.styles?.track) ? deflate(this._config!.styles?.track) : {}
        const deflatedProgressStl = deflate(progressStyle)
        // const deflatedProgressStl = deflate(this._config!.styles?.progress) ? deflate(this._config!.styles?.progress) : {}
        const deflatedThumbStl = deflate(this._config!.styles?.thumb) ? deflate(this._config!.styles?.thumb) : {}
        // ---------- Styles ---------- //
        const cardStl = getStyle('card', deflatedCardStl)
        const containerStl = getStyle('container', deflatedContainerStl)
        const trackStl = getStyle('track', deflatedTrackStl)
        const progressStl = getStyle('progress', deflatedProgressStl)
        const thumbStl = getStyle('thumb', deflatedThumbStl)

        if (this._config.vertical) {
            progressStl.height = this.sliderValPercent.toString() + '%'

            // Setting default styles for vertical if nothing is provided
            cardStl.height = deflatedCardStl.height ? deflatedCardStl.height : '100%'
            cardStl.width = deflatedCardStl.width ? deflatedCardStl.width : '30px'
            progressStl.width = deflatedProgressStl.width ? deflatedProgressStl.width : '100%'
            progressStl.right = deflatedProgressStl.right ? deflatedProgressStl.right : 'auto'
            thumbStl.right = deflatedThumbStl.right ? deflatedThumbStl : 'auto'
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

        const sliderHandler = (event) => {
            switch (event.type) {
                case 'mousedown':
                    if (this.touchInput) return
                    startInput(event)
                    break
                case 'touchstart':
                    this.touchInput = true
                    startInput(event)
                    break
                case 'mousemove':
                    if (this.touchInput) return
                    moveInput(event)
                    break
                case 'touchmove':
                    if (this._config.disableScroll)
                        event.preventDefault()
                    moveInput(event)
                    break
                case 'mouseup':
                case 'touchend':
                case 'touchcancel':
                    stopInput(event)
                    break
            }
        }

        const startInput = (event) => {
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

        const stopInput = (event) => {
            if (!this.actionTaken) return
            if (this._config.allowTapping) {
                this.calcProgress(event)
            }
            else if (this.thumbTapped) {
                this.calcProgress(event)
            }
            else if (this.isSliding) {
                this.calcProgress(event)
            }
            this.thumbTapped = false
            this.touchInput = false
            this.isSliding = false
            setTimeout(() => {
                this.actionTaken = false
            }, 50);
        }

        const moveInput = event => {
            if (this.actionTaken) {
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

        this.createAndCleanupEventListeners(sliderHandler)
        return html`
            <ha-card class="my-slider-custom-card" style="${styleMap(cardStl)}">
                <div class="my-slider-custom-container" id="${this._config.sliderId}" style="${styleMap(containerStl)}" data-value="${this.sliderVal}" data-progress-percent="${this.sliderValPercent}"
                    @mousedown="${sliderHandler}"
                    @mouseup="${sliderHandler}"
                    @mousemove="${sliderHandler}"
                    @touchstart="${sliderHandler}"
                    @touchend="${sliderHandler}"
                    @touchcancel="${sliderHandler}" 
                    @touchmove="${sliderHandler}"
                >
                    <div class="my-slider-custom-track" style="${styleMap(trackStl)}">
                        <div class="my-slider-custom-progress" style="${styleMap(progressStl)}">
                            <div class="my-slider-custom-thumb" style="${styleMap(thumbStl)}"></div>
                        </div>
                    </div>
                </div>
            </ha-card>
        `
    }

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


        this._config.mode = this._config!.mode !== undefined ? this._config!.mode :
            this._config!.colorMode !== undefined ? this._config!.colorMode :
                this._config!.coverMode !== undefined ? this._config!.coverMode :
                    entityType === 'light' ? 'brightness' :
                        entityType === 'cover' ? 'position' :
                            entityType === 'media_player' ? 'volume' :
                                'brightness'

        this._config.sliderId = `slider-${this._config!.entity.replace('.', '-')}-${this._config.mode}`
        this._config.disableScroll = this._config!.disableScroll !== undefined ? this._config!.disableScroll : true
        this._config.allowTapping = this._config!.allowTapping !== undefined ? this._config!.allowTapping : true
        this._config.allowSliding = this._config!.allowSliding !== undefined ? this._config!.allowSliding : false
        this._config.marginOfError = this._config!.marginOfError !== undefined ? this._config!.marginOfError : 10
        this._config.slideDistance = this._config!.slideDistance !== undefined ? this._config!.slideDistance : 10
        this._config.showMin = this._config!.showMin !== undefined ? this._config!.showMin : false
        this._config.minThreshold = this._config!.minThreshold ? this._config!.minThreshold : 0
        this._config.maxThreshold = this._config!.maxThreshold ? this._config!.maxThreshold : 100
        this._config.sliderMin = this._config!.sliderMin ? this._config!.sliderMin : 0

        const defaultConfig:MySliderConfig = {
            sliderId: `slider-${this._config!.entity.replace('.', '-')}-${this._config.mode}`,
            type: this._config.type,
            disableScroll: this._config!.disableScroll !== undefined ? this._config!.disableScroll : true,
            allowTapping: this._config!.allowTapping !== undefined ? this._config!.allowTapping : true,
            allowSliding: this._config!.allowSliding !== undefined ? this._config!.allowSliding : false,
            marginOfError: this._config!.marginOfError !== undefined ? this._config!.marginOfError : 10,
            slideDistance: this._config!.slideDistance !== undefined ? this._config!.slideDistance : 10,
            showMin: this._config!.showMin !== undefined ? this._config!.showMin : false,
            minThreshold: this._config!.minThreshold ? this._config!.minThreshold : 0,
            maxThreshold: this._config!.maxThreshold ? this._config!.maxThreshold : 100,
            sliderMin: this._config!.sliderMin ? this._config!.sliderMin : 0,
            vertical: this._config!.vertical !== undefined ? this._config!.vertical : false,
            flipped: this._config!.flipped !== undefined ? this._config!.flipped : false,
            inverse: this._config!.inverse !== undefined ? this._config!.inverse : false,
            intermediate: this._config!.intermediate !== undefined ? this._config!.intermediate : false,
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
        switch (entityType) {

            case 'light': /* ------------ LIGHT ------------ */
                if (defaultConfig.mode === 'brightness') {
                    this.oldVal = Math.ceil(percentage(this.entity.attributes.brightness, 256))
                    if (this.entity.state === 'on') {
                        tmpVal = Math.ceil(percentage(this.entity.attributes.brightness, 256))
                        if (!defaultConfig.showMin && defaultConfig.min) { // Subtracting savedMin to make slider 0 be far left
                            tmpVal = tmpVal - this._config.min
                        }
                        // tmpVal = tmpVal < this._config.sliderMin ? this._config.sliderMin : tmpVal
                    }

                    tmpVal = (tmpVal * (100 - this._config.sliderMin) / 100) + this._config.sliderMin
                    tmpVal = tmpVal < defaultConfig.sliderMin ? defaultConfig.sliderMin : tmpVal
                }
                else if (defaultConfig.mode === 'temperature') {
                    if (this.entity.state !== 'on') break
                    defaultConfig.min = defaultConfig!.min ? defaultConfig!.min : this.entity.attributes.min_mireds
                    defaultConfig.max = defaultConfig!.max ? defaultConfig!.max : this.entity.attributes.max_mireds
                    tmpVal = parseFloat(this.entity.attributes.color_temp)
                    this.oldVal = parseFloat(this.entity.attributes.color_temp)
                    if (!defaultConfig.showMin) { // Subtracting savedMin to make slider 0 be far left
                        defaultConfig.max = defaultConfig.max - defaultConfig.min
                        tmpVal = tmpVal - defaultConfig.min
                    }

                    tmpVal = (tmpVal * (100 - defaultConfig.sliderMin) / 100) + defaultConfig.sliderMin
                    tmpVal = tmpVal < defaultConfig.sliderMin ? defaultConfig.sliderMin : tmpVal

                }
                else if (defaultConfig.mode === 'hue' && this.entity.attributes.color_mode === 'hs') {
                    if (this.entity.state !== 'on') break

                    defaultConfig.min = defaultConfig!.min ? defaultConfig!.min : 0
                    defaultConfig.max = defaultConfig!.max ? defaultConfig!.max : 360
                    this.oldVal = parseFloat(this.entity.attributes.hs_color[0])

                    tmpVal = parseFloat(this.entity.attributes.hs_color[0])
                    if (!defaultConfig.showMin) { // Subtracting savedMin to make slider 0 be far left
                        defaultConfig.max = defaultConfig.max - defaultConfig.min
                        tmpVal = tmpVal - defaultConfig.min
                    }
                    tmpVal = (tmpVal * (100 - defaultConfig.sliderMin) / 100) + defaultConfig.sliderMin
                    tmpVal = tmpVal < defaultConfig.sliderMin ? defaultConfig.sliderMin : tmpVal
                }
                else if (defaultConfig.mode === 'saturation' && this.entity.attributes.color_mode === 'hs') {
                    if (this.entity.state !== 'on') break

                    defaultConfig.min = defaultConfig!.min ? defaultConfig!.min : 0
                    defaultConfig.max = defaultConfig!.max ? defaultConfig!.max : 100
                    this.oldVal = parseFloat(this.entity.attributes.hs_color[1])

                    tmpVal = parseFloat(this.entity.attributes.hs_color[1])
                    if (!defaultConfig.showMin) { // Subtracting savedMin to make slider 0 be far left
                        defaultConfig.max = defaultConfig.max - defaultConfig.min
                        tmpVal = tmpVal - defaultConfig.min
                    }
                    tmpVal = (tmpVal * (100 - defaultConfig.sliderMin) / 100) + defaultConfig.sliderMin
                    tmpVal = tmpVal < defaultConfig.sliderMin ? defaultConfig.sliderMin : tmpVal
                }
                this.setSliderValues(tmpVal, roundPercentage(percentage(tmpVal, defaultConfig.max)))


                break
            case 'input_number': /* ------------ INPUT_NUMBER ------------ */
            case 'number':
                defaultConfig.step = defaultConfig!.step ? defaultConfig!.step : this.entity.attributes.step
                defaultConfig.min = defaultConfig!.min ? defaultConfig!.min : this.entity.attributes.min
                defaultConfig.max = defaultConfig!.max ? defaultConfig!.max : this.entity.attributes.max
                this.oldVal = parseFloat(this.entity.state)
                tmpVal = parseFloat(this.entity.state)
                if (!defaultConfig.showMin && defaultConfig.min) { // Subtracting savedMin to make slider 0 be far left
                    defaultConfig.max = defaultConfig.max - defaultConfig.min
                    tmpVal = tmpVal - defaultConfig.min
                }
                tmpVal = (tmpVal * (100 - defaultConfig.sliderMin) / 100) + defaultConfig.sliderMin
                tmpVal = tmpVal < defaultConfig.sliderMin ? defaultConfig.sliderMin : tmpVal

                this.setSliderValues(tmpVal, roundPercentage(percentage(tmpVal, defaultConfig.max)))

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

                tmpVal = (tmpVal * (100 - defaultConfig.sliderMin) / 100) + defaultConfig.sliderMin
                tmpVal = tmpVal < defaultConfig.sliderMin ? defaultConfig.sliderMin : tmpVal
                this.oldVal = tmpVal
                this.setSliderValues(tmpVal, roundPercentage(percentage(tmpVal, defaultConfig.max)))
                if (defaultConfig.mode === 'seekbar' && this.entity.state === 'playing') {
                    this.updateSeekbar()
                }

                break
            case 'cover': /* ------------ COVER ------------ */
                tmpVal = 0
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
                    defaultConfig.max = defaultConfig.max - defaultConfig.min
                    tmpVal = tmpVal - defaultConfig.min
                }

                defaultConfig.inverse = true
                defaultConfig.vertical = true
                defaultConfig.flipped = true

                tmpVal = (tmpVal * (100 - defaultConfig.sliderMin) / 100) + defaultConfig.sliderMin
                tmpVal = tmpVal < defaultConfig.sliderMin ? defaultConfig.sliderMin : tmpVal
                this.oldVal = tmpVal
                this.setSliderValues(tmpVal, roundPercentage(percentage(tmpVal, defaultConfig.max)))


                break
            case 'fan': /* ------------ FAN ------------ */
                tmpVal = 0
                if (this.entity.attributes.percentage != undefined) {
                    tmpVal = Number(this.entity.attributes.percentage)
                }
                this.oldVal = tmpVal

                if (!defaultConfig.showMin && defaultConfig.min) { // Subtracting savedMin to make slider 0 be far left (sometimes needed, sometimes not. I dont have a fan to test this. Sorry)
                    defaultConfig.max = defaultConfig.max - defaultConfig.min
                    tmpVal = tmpVal - defaultConfig.min
                }

                tmpVal = (tmpVal * (100 - defaultConfig.sliderMin) / 100) + defaultConfig.sliderMin
                tmpVal = tmpVal < defaultConfig.sliderMin ? defaultConfig.sliderMin : tmpVal
                this.setSliderValues(tmpVal, roundPercentage(percentage(tmpVal, defaultConfig.max)))
                break
            case 'switch': /* ------------ SWITCH ------------ */
                defaultConfig.minThreshold = defaultConfig!.minThreshold ? defaultConfig!.minThreshold : 15
                defaultConfig.maxThreshold = defaultConfig!.maxThreshold ? defaultConfig!.maxThreshold : 75
                tmpVal = Number(Math.max(this.zero, defaultConfig.minThreshold))

                tmpVal = (tmpVal * (100 - defaultConfig.sliderMin) / 100) + defaultConfig.sliderMin
                tmpVal = tmpVal < defaultConfig.sliderMin ? defaultConfig.sliderMin : tmpVal
                this.setSliderValues(tmpVal, tmpVal)
                break
            case 'lock': /* ------------ LOCK ------------ */
                defaultConfig.minThreshold = defaultConfig!.minThreshold ? defaultConfig!.minThreshold : 15
                defaultConfig.maxThreshold = defaultConfig!.maxThreshold ? defaultConfig!.maxThreshold : 75
                tmpVal = Number(Math.max(this.zero, defaultConfig.minThreshold))// Set slider to larger of 2 minimums

                tmpVal = (tmpVal * (100 - defaultConfig.sliderMin) / 100) + defaultConfig.sliderMin
                tmpVal = tmpVal < defaultConfig.sliderMin ? defaultConfig.sliderMin : tmpVal
                this.oldVal = tmpVal
                this.setSliderValues(tmpVal, tmpVal)

                break
            default:
                console.log('No Entity type initiated... (' + this._config!.entity.split('.')[0] + ')')
                break
        }

        this._config = deepMerge(defaultConfig, this._config)

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
        if (this.sliderEl == undefined || this.sliderEl === null) return
        const clickPos = getClickPosRelToTarget(event, this.sliderEl)
        const sliderWidth = this.sliderEl.offsetWidth
        const sliderHeight = this.sliderEl.offsetHeight
        // Calculate what the percentage is of the clickPos.x between 0 and sliderWidth / clickPos.y between 0 and sliderHeight
        const clickPercent = this._config.vertical ? roundPercentage(clickPos.y / sliderHeight * 100) : roundPercentage(clickPos.x / sliderWidth * 100)
        const newValue = clickPercent / 100 * (this._config.max - 0)
        const flippedValue = this._config.max - newValue
        let val = this._config.flipped ? Math.round(flippedValue) : Math.round(newValue)
        // Set val to be either min, max, zero or value
        val = val < this._config.min && this._config.showMin ? this._config.min : val > this._config.max ? this._config.max : val < this.zero ? this.zero : val
        this.setProgress(this.sliderEl, Math.round(val), event.type)
    }

    private setProgress(slider, val, action) {
        const progressEl = slider.querySelector('.my-slider-custom-progress')

        // Round val to nearest step
        val = Math.round(val / this._config.step) * this._config.step

        let valuePercentage = roundPercentage(percentage(val, this._config.max))
        valuePercentage = valuePercentage < this._config.sliderMin ? this._config.sliderMin : valuePercentage

        if (this._config.vertical) {
            // Set progessHeight to match value
            progressEl.style.height = valuePercentage.toString() + '%'
        }
        else {
            // Set progessWidth to match value
            progressEl.style.width = valuePercentage.toString() + '%'
        }

        // Check if value has changed
        if (this.sliderVal !== val) {
            // Check if we should update entity on mousemove or mouseup
            if ((this._config!.intermediate && (action === 'mousemove' || action === 'mousedown' || action === 'touchmove' || action === 'touchstart')) ||
                (!this._config!.intermediate && (action === 'mouseup' || action === 'touchend' || action === 'touchcancel'))) {
                this.setValue(val, valuePercentage)
            }
        }
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
                this._setSwitch(this.entity, val)
                break
            default:
                console.log('Default')
                break
        }
    }

    private _setBrightness(entity, value): void {
        this.hass.callService("light", "turn_on", {
            entity_id: entity.entity_id,
            brightness: value * 2.56
        })
        this.oldVal = value
    }
    private _setColorTemp(entity, value): void {
        this.hass.callService("light", "turn_on", {
            entity_id: entity.entity_id,
            color_temp: value
        })
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
        this.setSliderValues(val, valPercent) // Set slider to larger of 2 minimums

        const progressEl: HTMLElement | null = this.sliderEl!.querySelector('.my-slider-custom-progress')
        const initialTransition = progressEl!.style.transition
        if (!this._config.vertical) {
            progressEl!.style.transition = 'width 0.2s ease 0s'
            progressEl!.style.width = valPercent.toString() + '%'
        }
        else {
            progressEl!.style.transition = 'height 0.2s ease 0s'
            progressEl!.style.height = valPercent.toString() + '%'
        }
        setTimeout(() => { // Remove transition when done
            progressEl!.style.transition = initialTransition
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
        this.setSliderValues(val, valPercent) // Set slider to larger of 2 minimums

        const progressEl: HTMLElement | null = this.sliderEl!.querySelector('.my-slider-custom-progress')
        const initialTransition = progressEl!.style.transition
        if (!this._config.vertical) {
            progressEl!.style.transition = 'width 0.2s ease 0s'
            progressEl!.style.width = valPercent.toString() + '%'
        }
        else {
            progressEl!.style.transition = 'height 0.2s ease 0s'
            progressEl!.style.height = valPercent.toString() + '%'
        }
        setTimeout(() => { // Remove transition when done
            progressEl!.style.transition = initialTransition
        }, 200)
    }

    private createAndCleanupEventListeners(func): void {
        document.removeEventListener("mouseup", func)
        document.removeEventListener("touchend", func)
        document.removeEventListener("touchcancel", func)
        document.addEventListener("mouseup", func)
        document.addEventListener("touchend", func)
        document.addEventListener("touchcancel", func)
        document.addEventListener("mousemove", func)
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
*/

/*
TODO:
- Create colorMode config key. It should accept: (https://developers.home-assistant.io/docs/core/entity/light/)
    'brightness', 'temperature', 'hue' 'saturation', 'red', 'green', 'blue', 'white', 'x_color', 'y_color' and 'toggle'
    Future maybe: 'hs', 'rgb', 'rgbw', 'xy_color'. This will be where there will automatically be multiple sliders with same config in the same card
    - brightness: Adjust brightness of light (IMPLEMENTED)
    - temperature: Adjust temperature/warmth of light (IMPLEMENTED)
    - hue: Adjust Hue value in hs_color (0-360)
    - saturation: Adjust Saturation in hs_color (0-100)


    - hs: Adjust Hue & Saturation of light
    - rgb: Adjust Red, Green & Blue colors on light
    - rgbw: Adjust Red, Green, Blue & white colors on light
    - xy_color: Adjust lights colors by adjust xy_color attribute
TODONE:
*/
