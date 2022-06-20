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
} from 'lit-element';
import {
    HomeAssistant,
    hasConfigOrEntityChanged,
    hasAction,
    ActionHandlerEvent,
    handleAction,
    LovelaceCardEditor,
    getLovelace
} from 'custom-card-helpers'; // This is a community maintained npm module with common helper functions/types
import { actionHandler } from '../action-handler-directive';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'

import type { MyButtonLightCardConfig } from '../types';
import { BUTTON_LIGHT_VERSION } from '../const';
import { localize } from '../localize/localize';
import { objectToStyleString } from '../helpers'
import { getStyle } from './style-configs'

/* eslint no-console: 0 */
console.info(
    `%c  ---- MY-BUTTON-LIGHT ---- \n%c  ${localize('common.version')} ${BUTTON_LIGHT_VERSION}    `,
    'color: orange; font-weight: bold; background: black',
    'color: white; font-weight: bold; background: green',
);

// This puts your card into the UI card picker dialog
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
    type: 'my-button-light',
    name: 'Light Button Card',
    description: 'Custom Light Button Card for Lovelace.',
});

// TODONE Name your custom element
@customElement('my-button-light')
export class MyButtonLight extends LitElement {

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
    @internalProperty() private config!: MyButtonLightCardConfig;

    // https://lit-element.polymer-project.org/guide/properties#accessors-custom
    public setConfig(config: MyButtonLightCardConfig): void {

        if (!config.entity) {
            throw new Error("You need to define entity");
        }

        if (!config.entity.includes("light.")) {
            throw new Error("Entity has to be a light.");
        }

        this.config = {
            name: 'MyButtonLight',
            disabled_scroll: false,
            ...config,
        }

        // console.log('this.config initial:', this.config)
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
        // console.log('Config:', this.config)
        // var conf = JSON.parse(JSON.stringify(this.config))
        const styles = this.config.styles ? this.config.styles : {}
        const entityId = this.config.entity ? this.config.entity : "ERROR: NO ENTITY ID"
        const entity = this.hass.states[`${entityId}`]
        const showLabel = this.config.showLabel ? this.config.showLabel : true
        const label = this.config.label ? this.config.label : entity.attributes.friendly_name

        // ---- Slider Config ---- //
        const sliderConfig = this.config.slider ? this.config.slider : {}
        var slider_step = sliderConfig.step ? sliderConfig.step : "1"
        var slider_min = sliderConfig.min ? sliderConfig.min : 1
        var slider_max = sliderConfig.max ? sliderConfig.max : 100

        const cardStyle = objectToStyleString(getStyle('my-button-card', styles.card))
        const iconStyle = objectToStyleString(getStyle('my-button-icon', styles.icon))
        const labelStyle = objectToStyleString(getStyle('my-button-label', styles.label))

        const toggleScroll = () => {
            this.config.disabled_scroll = !this.config.disabled_scroll
            if (this.config.disabled_scroll) {
                disableBodyScroll(window)
            } else {
                enableBodyScroll(window)
            }
        }
        
		const handleInput = (e) => {
			if (sliderConfig.intermediate) {
                this._setBrightness(entity, e.target, slider_min, slider_max)
			}
		};
		const handleChange = (e) => {
			if (!sliderConfig.intermediate) {
                this._setBrightness(entity, e.target, slider_min, slider_max)
			}
		};
        const handleSlider = (e) => {
            console.log('Handle Slider', e)
            this._setBrightness(entity, e.target, slider_min, slider_max)
        }

        const slider = () => {
            return html`
                <div class="slider-container" style="">
                    <input name="slider" type="range" class="${entity.state}" style=""
                        min="${slider_min}" max="${slider_max}"
                        step="${slider_step}" .value="${entity.state === "off" ? 0 : Math.round(entity.attributes.brightness / 2.56)}"
                        @input=${sliderConfig.intermediate && handleSlider} @change=${!sliderConfig.intermediate && handleSlider}
                        @touchstart=${sliderConfig.toggle_scroll ? toggleScroll : null}
                        @touchend=${sliderConfig.toggle_scroll ? toggleScroll : null} >
                </div>
            `;
        }



        return html`
            <ha-card class="my-button-card" style="${cardStyle}">
                <div class="flex-container">
                    <div class="row-1">
                        <ha-icon class="my-button-icon" icon="${this.config.icon ? this.config.icon : 'mdi:cog-outline'}" style="${iconStyle}"/>
                    </div>
                    <div class="row-2">
                        <label class="my-button-label" style="${labelStyle}">${label}</label>
                    </div>
                    <div class="row-3">
                        <div class="slider-container">
                            <input name="slider" type="range" class="" style=""
                                min="${slider_min}" max="${slider_max}" step="${slider_step}" 
                                value="${entity.state === "off" ? 0 : Math.round(entity.attributes.brightness / 2.56)}"
                                @change=${!sliderConfig.intermediate && handleSlider}
                                @input=${sliderConfig.intermediate && handleSlider}
                                @touchstart=${sliderConfig.toggle_scroll ? toggleScroll : null}
                                @touchend=${sliderConfig.toggle_scroll ? toggleScroll : null}
                            />
                        </div>
                    </div>
                </div>
            </ha-card>
        `;


        // @input=${sliderConfig.intermediate && handleSlider} @change=${!sliderConfig.intermediate && handleSlider} 

        // return html`
        //     <ha-card class="my-button-card" style="${cardStyle}"
        //         @action=${this._handleAction}
        //         .actionHandler=${actionHandler({
        //     hasHold: hasAction(this.config.hold_action),
        //     hasDoubleClick: hasAction(this.config.double_tap_action),
        // })}>
        //         <div class="row-1">
        //             <ha-icon class="my-button-icon" icon="${this.config.icon ? this.config.icon : 'mdi:cog-outline'}" style="${iconStyle}"/>
        //         </div>
        //     </ha-card>
        // `;
    }

    private _handleAction(ev: ActionHandlerEvent): void {
        if (this.hass && this.config && ev.detail.action) {
            handleAction(this, this.hass, this.config, ev.detail.action);
        }
    }

    private _showWarning(warning: string): TemplateResult {
        return html` <hui-warning>${warning}</hui-warning> `;
    }

    private _showError(error: string): TemplateResult {
        const errorCard = document.createElement('hui-error-card');
        errorCard.setConfig({
            type: 'error',
            error,
            origConfig: this.config,
        });

        return html` ${errorCard} `;
    }

    private _setBrightness(_entity, _target, _minSet:number, _maxSet:number): void {
        // Set to max or min of value exceed, otherwise set to target.value
        const value = _target.value > _maxSet ? _maxSet : _target.value < _minSet ? _minSet : _target.value

        this.hass.callService("homeassistant", "turn_on", {
            entity_id: _entity.entity_id,
            brightness: value * 2.56
        })

        _target.value = value
    }

    // https://lit-element.polymer-project.org/guide/styles
    static get styles(): CSSResult {
        return css`
            .my-button-icon {
                --mdc-icon-size: 100%;
            }
            .flex-container {
                padding: 0;
                margin: 0;
                display: flex;
                flex-flow: column;
                height: 100%;
            }
            .flex-container div {
            }
            
            .flex-container .row-1 {
                flex: 0 1 auto; 
            }
            .flex-container .row-2 {
                flex: 1 1 auto;
            }
            .flex-container .row-3 {
                flex: 0 1 auto;
                margin: 0 2px;
            }

            
            .slider-container {
                height: 30px;
                position: relative;
                overflow: hidden;
                border-radius: 10px;
            }

            .slider-container input[type="range"] {
                outline: 0;
                border: 0;
                width: 100%;
                height: 100%;
                border-radius: 10px
                background-color: #4d4d4d; /*Remaining Slider color*/
                margin: 0;
                transition: box-shadow 0.2s ease-in-out;
                overflow: hidden;
                -webkit-appearance: none;
                position: absolute;
                top: 0px;
                bottom: 0px;
                right: 0px;
                left: 0px;
                -webkit-transform: rotate(0);
                -moz-transform: rotate(0);
                -o-transform: rotate(0);
                -ms-transform: rotate(0);
                transform: rotate(0);
                pointer-events: auto;
            }
            
            .slider-container input[type="range"]::-webkit-slider-runnable-track {
                height: 100%;
                -webkit-appearance: none;
                color: var(--accent-color);
                transition: box-shadow 0.2s ease-in-out;
            }
            
            .slider-container input[type="range"]::-webkit-slider-thumb {
                width: 25px;
                height: 80px;
                -webkit-appearance: none;
                cursor: ew-resize;
                border-radius: 0;
                transition: box-shadow 0.2s ease-in-out;
                position: relative;
            
                box-shadow: -3500px 0 0 3500px var(--accent-color), inset 0 0 0 25px #FFFFFF;
            
                top: calc((100% - 80px) / 2);
                border-right: 10px solid var(--accent-color);
                border-left: 10px solid var(--accent-color);
                border-top: 20px solid var(--accent-color);
                border-bottom: 20px solid var(--accent-color);
                pointer-events: auto;
            }
            
            .slider-container input[type=range]::-moz-range-thumb {
              width: calc(25px / 4);
              height: calc(80px / 2);
              box-shadow: -3500px 10px 0 3500px var(--accent-color), inset 0 0 0 25px #FFFFFF;
              top: calc((100% - 80px) / 2);
              cursor: ew-resize;
              border-radius: 0;
              transition: box-shadow 0.2s ease-in-out;
              position: relative;
              border-radius: 0;
              border-right: 10px solid var(--accent-color);
              border-left: 10px solid var(--accent-color);
              border-top: 20px solid var(--accent-color);
              border-bottom: 20px solid var(--accent-color);
              pointer-events: auto;
            }
            
            .slider-container input[type="range"]::-webkit-slider-thumb:hover {
                cursor: default;
            }
            
            .slider-container input[type="range"]:hover {
              cursor: default;
            }
        `;
    }
}



// Options:

// entity
// icon
// name
// slider
//   intermediate
//   step
//   min
//   max
//   toggle_scroll
// styles
//   card
//   icon
//   label
// tap_action
// double_tap_action
// hold_action