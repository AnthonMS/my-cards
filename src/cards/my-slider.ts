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
import {
    HomeAssistant,
    hasConfigOrEntityChanged,
    LovelaceCard
} from 'custom-card-helpers'; // This is a community maintained npm module with common helper functions/types
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'

import type { MySliderCardConfig } from './extras/types'
import { SLIDER_VERSION } from './extras/const'
import { localize } from '../localize/localize'
import { getStyle } from './styles/my-slider.styles'
// import './scripts/deflate.js'
import { deflate } from '../scripts/deflate'
import { percentage, roundPercentage, getClickPosRelToTarget } from '../scripts/helpers'

/* eslint no-console: 0 */
console.info(
    `%c  ---- MY-SLIDER-V2 ---- \n%c  ${localize('common.version')} ${SLIDER_VERSION}    `,
    'color: orange; font-weight: bold; background: black',
    'color: white; font-weight: bold; background: green',
);
console.info('HELLO FROM SLIDER-V2');

// This puts your card into the UI card picker dialog
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
    type: 'my-slider-v2',
    name: 'Slider Card V2',
    description: 'Custom Slider Card V2 for Lovelace.',
});

// TODONE Name your custom element
@customElement('my-slider-v2')
export class MySliderV2 extends LitElement {
    @property() private _config?: MySliderCardConfig
    private entity: HassEntity | undefined
    private sliderId: String = ''
    private sliderEl: HTMLBodyElement | undefined
    private touchInput: Boolean = false
    private disableScroll: Boolean = true
    private allowTapping: Boolean = true
    private thumbTapped: Boolean = false
    private actionTaken: Boolean = false
    private vertical: Boolean = false
    private flipped: Boolean = false
    private inverse: Boolean = false
    private showMin: Boolean = false
    private zero: number = 0
    private savedMin: number = 1
    private min: number = 0
    private max: number = 100
    private minThreshold: number = 0
    private maxThreshold: number = 100
    private step: number = 1
    private sliderVal: number = 0
    private sliderValPercent: number = 0.00
    private setSliderValues(val, valPercent): void {
        if (this.inverse) {
            this.sliderVal = this.max - val
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
    @state() private config!: MySliderCardConfig;
    public setConfig(config: MySliderCardConfig): void {
        const allowedEntities = [
            'light',
            'input_number',
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

        return hasConfigOrEntityChanged(this, changedProps, false)
    }

    protected render(): TemplateResult | void {
        const initFailed = this.initializeConfig()
        if (initFailed !== null) return initFailed

        const deflatedCardStl = deflate(this._config!.styles?.card) ? deflate(this._config!.styles?.card) : {}
        const deflatedContainerStl = deflate(this._config!.styles?.container) ? deflate(this._config!.styles?.container) : {}
        const deflatedTrackStl = deflate(this._config!.styles?.track) ? deflate(this._config!.styles?.track) : {}
        const deflatedProgressStl = deflate(this._config!.styles?.progress) ? deflate(this._config!.styles?.progress) : {}
        const deflatedThumbStl = deflate(this._config!.styles?.thumb) ? deflate(this._config!.styles?.thumb) : {}
        // ---------- Styles ---------- //
        const cardStl = getStyle('card', deflatedCardStl)
        const containerStl = getStyle('container', deflatedContainerStl)
        const trackStl = getStyle('track', deflatedTrackStl)
        const progressStl = getStyle('progress', deflatedProgressStl)
        const thumbStl = getStyle('thumb', deflatedThumbStl)
        
        if (this.vertical) {
            progressStl.height = this.sliderValPercent.toString() + '%'

            // Setting default styles for vertical if nothing is provided
            cardStl.height = deflatedCardStl.height ? deflatedCardStl.height : '100%'
            cardStl.width = deflatedCardStl.width ? deflatedCardStl.width : '30px'
            progressStl.width = deflatedProgressStl.width ? deflatedProgressStl.width : '100%'
            progressStl.right = deflatedProgressStl.right ? deflatedProgressStl.right : 'auto'
            thumbStl.right = deflatedThumbStl.right ? deflatedThumbStl : 'auto'
            thumbStl.width = deflatedThumbStl.width ? deflatedThumbStl.width : '100%'
            thumbStl.height = deflatedThumbStl.height ? deflatedThumbStl.height : '10px'

            if (this.flipped) {
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
            if (this.flipped) {
                progressStl.right = deflatedProgressStl.right ? deflatedProgressStl.right : '0'
                thumbStl.right = deflatedThumbStl.right ? deflatedThumbStl.right : 'auto'
                thumbStl.left = deflatedThumbStl.left ? deflatedThumbStl.left : '-5px'
            }
        }

        const setElements = (event) => {
            const sliderMaybe = event.path.find(el => el.classList.contains('my-slider-custom'))
            if (!sliderMaybe) {
                this.sliderEl = event.target
            }
            else {
                this.sliderEl = sliderMaybe
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
                    if (this.disableScroll)
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
            setElements(event)

            if (this.allowTapping) {
                this.actionTaken = true
                this.calcProgress(event)
            }
            else {
                if (event.path[0].classList.contains('my-slider-custom-thumb')) {
                    this.thumbTapped = true
                    this.actionTaken = true
                    this.calcProgress(event)
                } // else: tapping not allowed
            }
        }

        const stopInput = (event) => {
            if (!this.actionTaken) return
            if (this.allowTapping) {
                this.calcProgress(event)
            }
            else if (this.thumbTapped) {
                this.calcProgress(event)
            }
            this.thumbTapped = false
            this.actionTaken = false
        }

        const moveInput = event => {
            if (this.actionTaken) {
                this.calcProgress(event)
            }
        }

        this.createAndCleanupEventListeners(sliderHandler)
        return html`
            <ha-card style="${styleMap(cardStl)}">
                <div class="my-slider-custom" id="${this.sliderId}" style="${styleMap(containerStl)}" data-value="${this.sliderVal}" data-progress-percent="${this.sliderValPercent}"
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
        this.entity = this.hass.states[`${this.config.entity}`]
        try {
            this._config = this._objectEvalTemplate(this.entity, this.config)
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

        this.sliderId = `slider-${this._config!.entity.replace('.', '-')}`
        this.vertical = this._config!.vertical !== undefined ? this._config!.vertical : false
        this.flipped = this._config!.flipped !== undefined ? this._config!.flipped : false
        this.inverse = this._config!.inverse !== undefined ? this._config!.inverse : false
        this.disableScroll = this._config!.disableScroll !== undefined ? this._config!.disableScroll : true
        this.allowTapping = this._config!.allowTapping !== undefined ? this._config!.allowTapping : true
        this.showMin = this._config!.showMin !== undefined ? this._config!.showMin : false
        this.min = this._config!.min ? this._config!.min : 0
        this.max = this._config!.max ? this._config!.max : 100
        this.minThreshold = this._config!.minThreshold ? this._config!.minThreshold : 0
        this.maxThreshold = this._config!.maxThreshold ? this._config!.maxThreshold : 100
        this.step = this._config!.step ? this._config!.step : 1
        
        let tmpVal
        switch (this._config!.entity.split('.')[0]) {

            case 'light': /* ------------ LIGHT ------------ */
                // TODO: Check if light is warmth or 
                if (!this._config!.warmth) {
                    if (this.entity.state === 'on') {
                        tmpVal = Math.round(this.entity.attributes.brightness / 2.56)
                        if (!this.showMin) { // Subtracting savedMin to make slider 0 be far left
                            tmpVal = tmpVal - this.min
                        }
                    }
                    else {
                        tmpVal = 0
                    }
                    
                    this.setSliderValues(tmpVal, roundPercentage(percentage(tmpVal, this.max)))
                }
                else {
                    if (this.entity.state !== 'on') break
                    this.min = this._config!.min ? this._config!.min : this.entity.attributes.min_mireds
                    this.max = this._config!.max ? this._config!.max : this.entity.attributes.max_mireds
                    tmpVal = parseFloat(this.entity.attributes.color_temp)
                    if (!this.showMin) { // Subtracting savedMin to make slider 0 be far left
                        this.max = this.max - this.min
                        tmpVal = tmpVal - this.min 
                    }
                    
                    this.setSliderValues(tmpVal, roundPercentage(percentage(tmpVal, this.max)))
                }

                break
            case 'input_number': /* ------------ INPUT_BOOLEAN ------------ */
                this.step = this._config!.step ? this._config!.step : this.entity.attributes.step
                this.min = this._config!.min ? this._config!.min : this.entity.attributes.min
                this.max = this._config!.max ? this._config!.max : this.entity.attributes.max
                tmpVal = parseFloat(this.entity.state)
                if (!this.showMin) { // Subtracting savedMin to make slider 0 be far left
                    this.max = this.max - this.min
                    tmpVal = tmpVal - this.min
                }
                
                this.setSliderValues(tmpVal, roundPercentage(percentage(tmpVal, this.max)))


                break
            case 'media_player': /* ------------ MEDIA_PLAYER ------------ */
                tmpVal = 0
                if (this.entity.attributes.volume_level != undefined) {
                    tmpVal = Number(this.entity.attributes.volume_level * 100)
                }

                if (!this.showMin) { // Subtracting savedMin to make slider 0 be far left
                    this.max = this.max - this.min
                    tmpVal = tmpVal - this.min
                }

                this.setSliderValues(tmpVal, roundPercentage(percentage(tmpVal, this.max)))


                break
            case 'cover': /* ------------ COVER ------------ */
                tmpVal = 0
                if (this.entity.attributes.current_position != undefined) {
                    tmpVal = Number(this.entity.attributes.current_position)
                }

                if (!this.showMin) { // Subtracting savedMin to make slider 0 be far left
                    this.max = this.max - this.min
                    tmpVal = tmpVal - this.min
                }

                
                this.inverse = this._config!.inverse !== undefined ? this._config!.inverse : true
                this.vertical = this._config!.vertical !== undefined ? this._config!.vertical : true
                this.flipped = this._config!.flipped !== undefined ? this._config!.flipped : true

                this.setSliderValues(tmpVal, roundPercentage(percentage(tmpVal, this.max)))


                break
            case 'fan': /* ------------ FAN ------------ */
                tmpVal = 0
                if (this.entity.attributes.percentage != undefined) {
                    tmpVal = Number(this.entity.attributes.percentage)
                }

                if (!this.showMin) { // Subtracting savedMin to make slider 0 be far left (sometimes needed, sometimes not. I dont have a fan to test this. Sorry)
                    this.max = this.max - this.min
                    tmpVal = tmpVal - this.min
                }

                this.setSliderValues(tmpVal, roundPercentage(percentage(tmpVal, this.max)))


                break
            case 'switch': /* ------------ SWITCH ------------ */
                this.minThreshold = this._config!.minThreshold ? this._config!.minThreshold : 15
                this.maxThreshold = this._config!.maxThreshold ? this._config!.maxThreshold : 75
                tmpVal = Number(Math.max(this.zero, this.minThreshold))
                this.setSliderValues(tmpVal, tmpVal)


                break
            case 'lock': /* ------------ LOCK ------------ */
                this.minThreshold = this._config!.minThreshold ? this._config!.minThreshold : 15
                this.maxThreshold = this._config!.maxThreshold ? this._config!.maxThreshold : 75
                tmpVal = Number(Math.max(this.zero, this.minThreshold))// Set slider to larger of 2 minimums
                this.setSliderValues(tmpVal,tmpVal)

                break
            default:
                console.log('Default')
                break
        }

        return null // Succes in this case
    }

    private calcProgress(event) {
        if (this.sliderEl == undefined || this.sliderEl === null) return
        const clickPos = getClickPosRelToTarget(event, this.sliderEl)
        const sliderWidth = this.sliderEl.offsetWidth
        const sliderHeight = this.sliderEl.offsetHeight
        // Calculate what the percentage is of the clickPos.x between 0 and sliderWidth / clickPos.y between 0 and sliderHeight
        const clickPercent = this.vertical ? roundPercentage(clickPos.y/sliderHeight * 100) : roundPercentage(clickPos.x/sliderWidth * 100)
        const newValue = clickPercent / 100 * (this.max - 0)
        const flippedValue = this.max - newValue
        let val = this.flipped ? Math.round(flippedValue) : Math.round(newValue)
        // Set val to be either min, max, zero or value
        val = val < this.min && this.showMin ? this.min : val > this.max ? this.max : val < this.zero ? this.zero : val
        this.setProgress(this.sliderEl, Math.round(val), event.type)
    }

    private setProgress(slider, val, action) {
        const progressEl = slider.querySelector('.my-slider-custom-progress')
        const valuePercentage = roundPercentage(percentage(val, this.max))
        if (this.vertical) {
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
            if (this._config!.intermediate && (action === 'mousemove' || action === 'touchmove')) {
                this.setValue(val, valuePercentage)
            }
            else if (!this._config!.intermediate && (action === 'mouseup' || action === 'touchend' || action === 'touchcancel')) {
                this.setValue(val, valuePercentage)
            }
        }
    }

    private setValue(val, valPercent) {
        if (!this.entity) return
        this.setSliderValues(val, valPercent)
        if (!this.showMin) {
            val = val + this.min  // Adding saved min to make up for minimum not being 0
        }
        if (this.inverse) {
            val = this.max - val
            valPercent = 100 - valPercent
        } 
        if (!this.actionTaken) return // We do not want to set any values based on pure movement of slider. Only set it on user action.

        switch (this._config!.entity.split('.')[0]) {
            case 'light':
                if (!this._config!.warmth) { // Brightness
                    this._setBrightness(this.entity, val)
                }
                else { // Warmth
                    this._setWarmth(this.entity, val)
                }
                break
            case 'input_number':
                this._setInputNumber(this.entity, val)
                break
            case 'media_player':
                this._setMediaVolume(this.entity, val)
                break
            case 'cover':
                this._setCover(this.entity, val)
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
        if (entity.state === 'off' || (Math.abs((value - Math.round(entity.attributes.brightness / 2.56))) > this.step)) {
            this.hass.callService("light", "turn_on", {
                entity_id: entity.entity_id,
                brightness: value * 2.56
            })
        }
    }
	private _setWarmth(entity, value): void {
        let oldVal = parseFloat(entity.attributes.color_temp)
        // // Do not ask me why this is not needed here. In my mind it should be required, but it's off by that much when subtracting. (Should not code with corona)
        // if (!this.showMin) {
        //     oldVal = oldVal - this.min // Subtracting savedMin to make slider 0 be far left
        // }
        if (entity.state === 'off' || Math.abs((value - oldVal)) > this.step) {
            this.hass.callService("light", "turn_on", {
                entity_id: entity.entity_id,
                color_temp: value
            })
        }
	}
	private _setInputNumber(entity, value): void {
        let oldVal = parseFloat(entity.state)
        if (!this.showMin) {
            oldVal = oldVal - this.min // Subtracting savedMin to make slider 0 be far left
        }

        if (Math.abs((value - oldVal)) > this.step) {
            this.hass.callService("input_number", "set_value", {
                entity_id: entity.entity_id,
                value: value
            })
        }
	}
	private _setMediaVolume(entity, value): void {
        let oldVal = Number(this.entity!.attributes.volume_level * 100)
        if (!this.showMin) { // Subtracting savedMin to make slider 0 be far left
            oldVal = oldVal - this.min
        }

        // TODO: This will be false if entity is off. Set volume even when off/not playing/idle? (whatever states to check for?)
        if (Math.abs((value - oldVal)) > this.step) {
            this.hass.callService("media_player", "volume_set", {
                entity_id: entity.entity_id,
                volume_level: value / 100
            })
        }
	}
	private _setCover(entity, value): void {
		this.hass.callService("cover", "set_cover_position", {
			entity_id: entity.entity_id,
			position: value
		});
	}
	private _setFan(entity, value): void {
		this.hass.callService("fan", "set_percentage", {
			entity_id: entity.entity_id,
			percentage: value
		})
	}

	private _setSwitch(entity, value): void {
		var threshold = Math.min(this.max, this.maxThreshold) //pick lesser of the two
		if (Number(threshold) <= value) {
			this.hass.callService('homeassistant', 'toggle', {
				entity_id: entity.entity_id
			})
		}

        const val = Number(Math.max(this.zero, this.minThreshold))
        const valPercent = roundPercentage(percentage(val, this.max))
        this.setSliderValues(val, valPercent) // Set slider to larger of 2 minimums
        const progressEl: HTMLElement | null = this.sliderEl!.querySelector('.my-slider-custom-progress')
        progressEl!.style.transition = 'width 0.2s ease 0s' // Make it sprong back nicely
        progressEl!.style.width = valPercent.toString() + '%'
        setTimeout(() => { // Remove transition when done
            progressEl!.style.transition = 'initial'
        }, 200)
	}
	private _setLock(entity, value): void {
		var threshold = Math.min(this.max, this.maxThreshold) //pick lesser of the two
		if (Number(threshold) <= value) {
			var newLockState = entity.state === "locked" ? 'unlock' : 'lock'
			this.hass.callService("lock", newLockState, {
				entity_id: entity.entity_id
			})
		}

        const val = Number(Math.max(this.zero, this.minThreshold))
        const valPercent = roundPercentage(percentage(val, this.max))
        this.setSliderValues(val, valPercent) // Set slider to larger of 2 minimums
        const progressEl: HTMLElement | null = this.sliderEl!.querySelector('.my-slider-custom-progress')
        progressEl!.style.transition = 'width 0.2s ease 0s' // Make it sprong back nicely
        progressEl!.style.width = valPercent.toString() + '%'
        setTimeout(() => { // Remove transition when done
            progressEl!.style.transition = 'initial'
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

    

    // // Not used on slider since we handle the action ourselves
    // private _evalActions(config: MySliderCardConfig, action: string): MySliderCardConfig {
    //     // const configDuplicate = copy(config);
    //     const configDuplicate = JSON.parse(JSON.stringify(config));
    //     /* eslint no-param-reassign: 0 */
    //     const __evalObject = (configEval: any): any => {
    //         if (!configEval) {
    //             return configEval;
    //         }
    //         Object.keys(configEval).forEach((key) => {
    //             if (typeof configEval[key] === 'object') {
    //                 configEval[key] = __evalObject(configEval[key]);
    //             } else {
    //                 configEval[key] = this._getTemplateOrValue(this.entity, configEval[key]);
    //             }
    //         });
    //         return configEval;
    //     };
    //     configDuplicate[action] = __evalObject(configDuplicate[action]);
    //     if (!configDuplicate[action].confirmation && configDuplicate.confirmation) {
    //         configDuplicate[action].confirmation = __evalObject(configDuplicate.confirmation);
    //     }
    //     return configDuplicate;
    // }

    private _objectEvalTemplate(state: HassEntity | undefined, obj: any | undefined): any {
        const objClone = JSON.parse(JSON.stringify(obj))
        return this._getTemplateOrValue(state, objClone);
    }

    private _getTemplateOrValue(state: HassEntity | undefined, value: any | undefined): any | undefined {
        if (['number', 'boolean'].includes(typeof value)) return value;
        if (!value) return value;
        if (typeof value === 'object') {
            Object.keys(value).forEach((key) => {
                value[key] = this._getTemplateOrValue(state, value[key]);
            });
            return value;
        }
        const trimmed = value.trim();
        if (trimmed.substring(0, 3) === '[[[' && trimmed.slice(-3) === ']]]') {
            const tmp = this._evalTemplate(state, trimmed.slice(3, -3))
            return tmp
        } else {
            return value
        }
    }

    private _evalTemplate(state: HassEntity | undefined, func: any): any {
        /* eslint no-new-func: 0 */
        try {
            return new Function('states', 'entity', 'user', 'hass', 'html', `'use strict'; ${func}`).call(
                this,
                this.hass!.states,
                state,
                this.hass!.user,
                this.hass,
                html,
            );
        } catch (e) {
            
            if (e instanceof Error) {
                const funcTrimmed = func.length <= 100 ? func.trim() : `${func.trim().substring(0, 98)}...`;
                e.message = `${e.name}: ${e.message} in '${funcTrimmed}'`;
                e.name = 'MyCardJSTemplateError';
                throw e;
              }
              else {
                  console.log('Unexpected error (_evalTemplate)', e);
              }
        }
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
warmth: false
vertical: false (This will set the vertical to be vertical and handled from bottom to top. Automatically used on covers)
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

TODONE:
*/