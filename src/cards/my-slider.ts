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
    internalProperty,
} from 'lit-element'
import { styleMap } from 'lit-html/directives/style-map'
import { HassEntity } from 'home-assistant-js-websocket';
import {
    HomeAssistant,
    hasConfigOrEntityChanged,
} from 'custom-card-helpers'; // This is a community maintained npm module with common helper functions/types
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'

import type { MySliderCardConfig } from '../types'
import { SLIDER_VERSION } from '../const'
import { localize } from '../localize/localize'
import { getStyle } from './styles/my-slider.styles'
import './scripts/deflate.js'
import { percentage, roundPercentage, getClickPosRelToTarget } from './scripts/helpers'

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

// TODONE Name your custom element
@customElement('my-slider-v2')
export class MySliderV2 extends LitElement {
    private entity: HassEntity | undefined
    private sliderId: String = ''
    private sliderEl: HTMLBodyElement | undefined
    private touchInput: Boolean = false
    private showMin: Boolean = false
    private savedMin: number = 0
    private min: number = 0
    private max: number = 100
    private minThreshold: number = 0
    private maxThreshold: number = 100
    private step: number = 1
    private sliderVal: number = 0
    private sliderValPercent: number = 0.00
    private setSliderValues(val, valPercent): void {
        this.sliderVal = val
        this.sliderValPercent = valPercent
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
    @internalProperty() private config!: MySliderCardConfig;

    // https://lit-element.polymer-project.org/guide/properties#accessors-custom
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
            throw new Error("You need to define entity");
        }

        if (!allowedEntities.includes(config.entity.split('.')[0])) {
            throw new Error(`Entity has to be one of the following: ${allowedEntities.map(e => ' ' + e)}`);
        }

        this.config = {
            name: 'MySliderV2',
            ...config,
        }
    }

    // https://lit-element.polymer-project.org/guide/lifecycle#shouldupdate
    protected shouldUpdate(changedProps: PropertyValues): boolean {
        if (!this.config) {
            return false
        }

        return hasConfigOrEntityChanged(this, changedProps, false)
    }

    // https://lit-element.polymer-project.org/guide/templates
    protected render(): TemplateResult | void {
        this.initializeConfig()

        // ---------- Styles ---------- //
        const cardStl = getStyle('card', this.config.styles?.card?.deflate())
        const containerStl = getStyle('container', this.config.styles?.container?.deflate())
        const trackStl = getStyle('track', this.config.styles?.track?.deflate())
        const progressStl = getStyle('progress', this.config.styles?.progress?.deflate())
        const thumbStl = getStyle('thumb', this.config.styles?.thumb?.deflate())
        progressStl.width = this.sliderValPercent.toString() + '%'

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
                    if (this.config.disable_scroll)
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
            this.sliderEl = event.target
            if (this.config.dragging === true) return
            this.config.dragging = true
            this.calcProgress(event)
        }

        const stopInput = (event) => {
            if (this.config.dragging === false) return
            this.config.dragging = false
            this.calcProgress(event)
        }

        const moveInput = event => {
            if (this.config.dragging) {
                this.calcProgress(event)
            }
        }

        this.createAndCleanupEventListeners(sliderHandler)
        return html`
            <ha-card style="${styleMap(cardStl)}">
                <div class="my-slider-custom" id="${this.sliderId}" style="${styleMap(containerStl)}"
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

    private initializeConfig(): void {
        const entityId = this.config.entity
        // const entity = this.hass.states[`${entityId}`]
        this.entity = this.hass.states[`${entityId}`]

        this.sliderId = `slider-${this.config.entity.replace('.', '-')}`
        this.showMin = this.config.showMin ? this.config.showMin : false
        this.savedMin = this.config.min ? this.config.min : 0
        this.max = this.config.max ? this.config.max : 100
        this.minThreshold = this.config.minThreshold ? this.config.minThreshold : 0
        this.maxThreshold = this.config.maxThreshold ? this.config.maxThreshold : 100
        this.step = this.config.step ? this.config.step : 1
        
        switch (entityId.split('.')[0]) {
            case 'light':
                // TODO: Check if light is warmth or 
                if (!this.config.warmth) {
                    if (this.entity.state !== 'on') break
                    let val = Math.round(this.entity.attributes.brightness / 2.56)
                    if (!this.showMin) {
                        val = val - this.savedMin // Subtracting savedMin to make slider 0 be far left
                    }
                    const valuePercentage = roundPercentage(percentage(val, this.max, this.min))
                    this.setSliderValues(val, valuePercentage)
                }
                else {
                    if (this.entity.state !== 'on') break
                    this.savedMin = this.entity.attributes.min_mireds
                    this.max = this.entity.attributes.max_mireds
                    let val = parseFloat(this.entity.attributes.color_temp)
                    if (!this.showMin) {
                        this.max = this.max - this.savedMin // Subtracting savedMin to make slider 0 be far left
                        val = val - this.savedMin // Subtracting savedMin to make slider 0 be far left
                    }
                    const valuePercent = roundPercentage(percentage(val, this.max))
                    this.setSliderValues(val, valuePercent)
                }
                break
            case 'input_number':
                this.step = this.entity.attributes.step
                this.savedMin = this.entity.attributes.min
                this.max = this.entity.attributes.max
                let val = parseFloat(this.entity.state)
                if (!this.showMin) {
                    this.max = this.max - this.savedMin // Subtracting savedMin to make slider 0 be far left
                    val = val - this.savedMin // Subtracting savedMin to make slider 0 be far left
                }
                const valuePercentage = roundPercentage(percentage(val, this.max))
                this.setSliderValues(val, valuePercentage)
                break
            case 'switch':
                this.minThreshold = this.config.minThreshold ? this.config.minThreshold : 15
                this.maxThreshold = this.config.maxThreshold ? this.config.maxThreshold : 75
                this.setSliderValues(Number(Math.max(this.min, this.minThreshold)), Number(Math.max(this.min, this.minThreshold)))
                break
            case 'lock':
                this.minThreshold = this.config.minThreshold ? this.config.minThreshold : 15
                this.maxThreshold = this.config.maxThreshold ? this.config.maxThreshold : 75
                const num = Number(Math.max(this.min, this.minThreshold))
                this.setSliderValues(num,num) // Set slider to larger of 2 minimums
                break
            default:
                console.log('Default')
                break
        }
    }

    private calcProgress(event) {
        if (this.sliderEl == undefined || this.sliderEl === null) return
        // const clickPos = getClickPosRelToTarget(e)
        const clickPos = getClickPosRelToTarget(event, this.sliderEl)
        const sliderWidth = this.sliderEl.offsetWidth
        // Calculate what the percentage is of the clickPos.x between 0 and sliderWidth
        // const clickPercentage = roundPercentage(clickPos!.x / sliderWidth * 100)
        const clickPercentage = roundPercentage(percentage(clickPos!.x, sliderWidth))
        const newValue = clickPercentage / 100 * (this.max - 0)
        this.setProgress(this.sliderEl, Math.round(newValue), event.type)
    }

    private setProgress(slider, val, action) {
        if (val > this.max) {
            val = this.max
        }
        else if (val < this.min) {
            val = this.min
        }
        // find the percentage of sliderValue between sliderMin and sliderMax.
        const progressEl = slider.querySelector('.my-slider-custom-progress')
        // const valuePercentage = roundPercentage(val / (this.max - this.min) * 100)
        const valuePercentage = roundPercentage(percentage(val, this.max, 0))
        // Set progessWidth to match value
        progressEl.style.width = valuePercentage.toString() + '%'

        // Check if value has changed
        if (this.sliderVal !== val) {
            // Check if we should update entity on mousemove or mouseup
            if (this.config.intermediate && (action === 'mousemove' || action === 'touchmove')) {
                this.setValue(val, valuePercentage)
            }
            else if (!this.config.intermediate && (action === 'mouseup' || action === 'touchend' || action === 'touchcancel')) {
                this.setValue(val, valuePercentage)
            }
        }
    }

    private setValue(val, valPercent) {
        if (!this.entity) return
        this.setSliderValues(val, valPercent)
        if (!this.showMin) {
            val = val + this.savedMin  // Adding saved min to make up for minimum not being 0
        }
    
        switch (this.config.entity.split('.')[0]) {
            case 'light':
                if (!this.config.warmth) { // Brightness
                    this._setBrightness(this.entity, val)
                }
                else { // Warmth
                    this._setWarmth(this.entity, val)
                }
                break
            case 'input_number':
                    this._setInputNumber(this.entity, val)
                break
            case 'lock':
                    this._setLock(this.entity, val)
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
    }
	private _setWarmth(entity, value): void {
		this.hass.callService("light", "turn_on", {
			entity_id: entity.entity_id,
			color_temp: value
		})
	}
	private _setInputNumber(entity, value): void {
		this.hass.callService("input_number", "set_value", {
			entity_id: entity.entity_id,
			value: value
		})
	}
	private _setFan(entity, value): void {
		this.hass.callService("fan", "set_percentage", {
			entity_id: entity.entity_id,
			percentage: value
		})
	}
	private _setCover(entity, value): void {
		this.hass.callService("cover", "set_cover_position", {
			entity_id: entity.entity_id,
			position: value
		});
	}
	private _setMediaVolume(entity, value): void {
		this.hass.callService("media_player", "volume_set", {
			entity_id: entity.entity_id,
			volume_level: value / 100
		})
	}

	private _setSwitch(entity, value): void {
		var threshold = Math.min(this.max, this.maxThreshold) //pick lesser of the two
		if (Number(threshold) <= value) {
			this.hass.callService('homeassistant', 'toggle', {
				entity_id: entity.entity_id
			})
		}

        const val = Number(Math.max(this.min, this.minThreshold))
        const valPercent = roundPercentage(percentage(val, this.max, this.min))
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

        const val = Number(Math.max(this.min, this.minThreshold))
        const valPercent = roundPercentage(percentage(val, this.max, this.min))
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
min: 0
max: 100
intermediate: false
disable_scroll: false
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