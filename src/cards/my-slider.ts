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
import { styleMap, StyleInfo } from 'lit-html/directives/style-map'
import {
    HomeAssistant,
    hasConfigOrEntityChanged,
} from 'custom-card-helpers'; // This is a community maintained npm module with common helper functions/types
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'

import type { MySliderCardConfig } from '../types'
import { SLIDER_VERSION } from '../const'
import { localize } from '../localize/localize'
import { getStyle } from './styles/my-slider.styles'
import { objectToStyleString } from '../helpers'
import './scripts/deflate.js'

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

        if (!config.entity) {
            throw new Error("You need to define entity");
        }

        if (!config.entity.includes("input_number.") && !config.entity.includes("light.") && !config.entity.includes("media_player.") && !config.entity.includes("cover.") && !config.entity.includes("fan.") && !config.entity.includes("switch.") && !config.entity.includes("lock.")) {
            throw new Error("Entity has to be a light, input_number, media_player, cover or a fan.");
        }

        this.config = {
            name: 'MySliderV2',
            disabled_scroll: false,
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
        // var minBar = this.config.minBar ? this.config.minBar : 0;
        // console.log("Test-Card Config:", this.config)

        // -- Make copy of the config, this way we can add empty -- //
        // -- objects and save ourselves a lot of if statements -- //
        const entityId = this.config.entity ? this.config.entity : "ERROR"
        const entity = this.hass.states[`${entityId}`]

        const sliderId = `slider-${this.config.entity.replace('.', '-')}`
		const min = this.config.min ? this.config.min : 0
		const max = this.config.max ? this.config.max : 100

        // ---------- Styles ---------- //
        const cardStl = getStyle('card', this.config.styles?.card?.deflate())
        const containerStl = getStyle('container', this.config.styles?.container?.deflate())
        const trackStl = getStyle('track', this.config.styles?.track?.deflate())
        const progressStl = getStyle('progress', this.config.styles?.progress?.deflate())
        const thumbStl = getStyle('thumb', this.config.styles?.thumb?.deflate())
        progressStl.width = Math.round(entity.attributes.brightness / 2.56).toString() + '%'

        const setValue = (_val) => {
            this._setBrightness(entity, _val, min, max)
        }

        const calcProgress = (e) => {
            const clickPos = getClickPosRelToTarget(e)
            const sliderWidth = e.target.offsetWidth
            // Calculate what the percentage is of the clickPos.x between 0 and sliderWidth
            const clickPercentage = roundPercentage(clickPos.x / sliderWidth * 100)
            const newValue = clickPercentage / 100 * (max - min)
            setProgress(e.target, Math.round(newValue), e.type)
        }

        const setProgress = (slider, val, action) => {
            // find the percentage of sliderValue between sliderMin and sliderMax.
            const progressEl = slider.querySelector('.my-slider-custom-progress')
            const valuePercentage = roundPercentage(val / (max - min) * 100)
            // Set progessWidth to match value
            progressEl.style.width = valuePercentage.toString() + '%'

            // Check if value has changed
            if (Math.round(entity.attributes.brightness / 2.56) !== val) {
                // Check if we should update entity on mousemove or mouseup
                if (this.config.intermediate && action === 'mousemove') {
                    console.log('Set value intermediate:', val)
                    setValue(val)
                }
                else if (!this.config.intermediate && action === 'mouseup') {
                    console.log('Set value on mouse up:', val)
                    setValue(val)
                }
            }
        }

        const getClickPosRelToTarget = (event) => {
            var rect = event.target.getBoundingClientRect();
            var x = event.clientX - rect.left; //x position within the element.
            var y = event.clientY - rect.top;  //y position within the element.
            return { x, y }
        }

        const roundPercentage = (val) => {
            return Math.round((val + Number.EPSILON) * 100) / 100
        }

        const toggleScroll = () => {
            this.config.disabled_scroll = !this.config.disabled_scroll
            if (this.config.disabled_scroll) {
                disableBodyScroll(window)
            } else {
                enableBodyScroll(window)
            }
        }

        const mouseDown = (e) => {
            if (this.config.dragging === true) return
            this.config.dragging = true
            calcProgress(e)
        }
        const mouseUp = (e) => {
            if (this.config.dragging === false) return
            this.config.dragging = false
            if (e.target.id === sliderId) {
                calcProgress(e)
            }
        }
        const mouseMove = (e) => {
            if (this.config.dragging) {
                calcProgress(e)
            }
        }

        const touchStart = (e) => {
            if (this.config.dragging === true) return
            this.config.dragging = true
            console.log('Touch Start:', this.config.dragging, e)
            //calcProgress(e)
        }
        const touchEnd = (e) => {
            if (this.config.dragging === false) return
            this.config.dragging = false
            console.log('Touch End:', this.config.dragging, e)
            if (e.target.id === sliderId) {
                //calcProgress(e)
            }
        }
        const touchCancel = (e) => {
            if (this.config.dragging === false) return
            this.config.dragging = false
            console.log('Touch Cancel:', this.config.dragging, e)
            if (e.target.id === sliderId) {
                //calcProgress(e)
            }
        }
        const touchMove = (e) => {
            if (this.config.dragging) {
                console.log('Touch Move:', e)
                //calcProgress(e)
            }
        }


        document.removeEventListener("mouseup", mouseUp)
        document.addEventListener("mouseup", mouseUp)

        return html`
            <ha-card style="${styleMap(cardStl)}">
                <div class="my-slider-custom" id="${sliderId}" style="${styleMap(containerStl)}"
                    @mousedown="${mouseDown}"
                    @mouseup="${mouseUp}"
                    @mousemove="${mouseMove}"
                    @touchstart="${touchStart}"
                    @touchend="${touchEnd}"
                    @touchcancel="${touchCancel}" 
                    @touchmove="${touchMove}"
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

	private _setBrightness(_entity, value, _min, _max): void {
		if (value > _max) {
			value = _max
		} 
        else if (value < _min) {
			value = _min
		}

		this.hass.callService("homeassistant", "turn_on", {
			entity_id: _entity.entity_id,
			brightness: value * 2.56
		})
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
min: 0
max: 100
intermediate: false
styles:
  card: 
    - height: 50px
*/