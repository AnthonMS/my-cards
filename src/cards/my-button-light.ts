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
    // LovelaceCardEditor,
    // getLovelace
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

let computed_styles = {}
// TODONE Name your custom element
@customElement('my-button-light')
export class MyButtonLight extends LitElement {
    // private _stateObj: HassEntity | undefined;
    private _trackStyle: string | undefined
    private _thumbStyle: string | undefined

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

        // ---- Icon Config ---- //
        const defaultIconAttr = {
            show: true,
            icon: 'mdi:cog-outline'
        }
        // If icon is just a string, then save that under iconConfig. If it's an object, then combine default with custom configs. If nothing then just use default config
        const iconConfig = typeof this.config.icon === 'string' ? { ...defaultIconAttr, icon: this.config.icon } : typeof this.config.icon === 'object' ? { ...defaultIconAttr, ...this.config.icon } : defaultIconAttr

        // ---- Label Config ---- //
        const defaultLabelAttr = {
            show: true,
            text: entity.attributes.friendly_name
        }
        // If label is just a string, then save that under labelConfig. If it's an object, then combine default with custom configs. If nothing then just use default config
        const labelConfig = typeof this.config.label === 'string' ? { ...defaultLabelAttr, text: this.config.label } : typeof this.config.label === 'object' ? { ...defaultLabelAttr, ...this.config.label } : defaultLabelAttr

        // ---- Slider Config ---- //
        const defaultSliderConfig = {
            min: 0,
            max: 100,
            step: '1',
            show: true
        }
        const sliderConfig = this.config.slider ? { ...defaultSliderConfig, ...this.config.slider } : defaultSliderConfig


        const cardStyle = getStyle('my-button-card', styles.card)
        const iconStyle = getStyle('my-button-icon', styles.icon)
        const labelStyle = getStyle('my-button-label', styles.label)
        const { containerStyle, inputStyle, trackStyle, thumbStyle } = getStyle('my-button-slider', styles.slider)
        this._trackStyle = objectToStyleString(trackStyle)
        this._thumbStyle = objectToStyleString(thumbStyle)
        // Update colors based on entity state
        if (entity.state === 'on') {
            if (cardStyle['color-on']) cardStyle.background = cardStyle['color-on']
            if (iconStyle['color-on']) iconStyle.color = iconStyle['color-on']
            if (labelStyle['color-on']) labelStyle.color = labelStyle['color-on']
            if (containerStyle['color-on']) containerStyle['--slider-color'] = containerStyle['color-on']
        }
        else {
            if (cardStyle['color-off']) cardStyle.background = cardStyle['color-off']
            if (iconStyle['color-off']) iconStyle.color = iconStyle['color-off']
            else iconStyle.color = 'var(--paper-item-icon-color)'
            if (labelStyle['color-off']) labelStyle.color = labelStyle['color-off']
            if (containerStyle['color-off']) containerStyle['--slider-color'] = containerStyle['color-off']
            else containerStyle['--slider-color'] = 'var(--paper-slider-secondary-color)'
        }


        const toggleScroll = () => {
            this.config.disabled_scroll = !this.config.disabled_scroll
            if (this.config.disabled_scroll) {
                disableBodyScroll(window)
            } else {
                enableBodyScroll(window)
            }
        }

        const handleSlider = (e) => {
            this._setBrightness(entity, e.target, sliderConfig.min, sliderConfig.max)
        }

        const icon = () => {
            if (!iconConfig.show) return html``

            return html`
                <ha-icon class="my-button-icon" icon="${iconConfig.icon}" style="${objectToStyleString(iconStyle)}"
                    @action=${e => this._handleAction(e, this.config)}
                    .actionHandler=${actionHandler({
                hasDoubleClick: this.config?.double_tap_action?.action !== 'none',
                hasHold: this.config?.hold_action?.action !== 'none',
            })} />
            `
        }

        const slider = () => {
            if (!sliderConfig.show) return html``

            return html`
                <div class="slider-container" style="${objectToStyleString(containerStyle)}">
                    <input name="slider" type="range" class="" style="${objectToStyleString(inputStyle)}"
                        min="${sliderConfig.min}" max="${sliderConfig.max}" step="${sliderConfig.step}" 
                        value="${entity.state === "off" ? 0 : Math.round(entity.attributes.brightness / 2.56)}"
                        @change=${!sliderConfig.intermediate && handleSlider}
                        @input=${sliderConfig.intermediate && handleSlider}
                        @touchstart=${sliderConfig.toggle_scroll ? toggleScroll : null}
                        @touchend=${sliderConfig.toggle_scroll ? toggleScroll : null}
                    />
                </div>
            `
        }

        const label = () => {
            if (!labelConfig.show) return html``

            return html`
                <label class="my-button-label" style="${objectToStyleString(labelStyle)}">${labelConfig.text}</label>
            `
        }

        return html`
            <ha-card class="my-button-card" style="${objectToStyleString(cardStyle)}">
                <div class="flex-container">
                    <div class="row-1" 
                    @action=${e => this._handleAction(e, this.config)}
                    .actionHandler=${actionHandler({
            hasDoubleClick: this.config?.double_tap_action?.action !== 'none',
            hasHold: this.config?.hold_action?.action !== 'none',
        })}>
                        ${icon()}
                    </div>
                    <div class="row-2" 
                    @action=${e => this._handleAction(e, this.config)}
                    .actionHandler=${actionHandler({
            hasDoubleClick: this.config?.double_tap_action?.action !== 'none',
            hasHold: this.config?.hold_action?.action !== 'none',
        })}>
                        ${label()}
                    </div>
                    <div class="row-3">
                        ${slider()}
                    </div>
                </div>
            </ha-card>
        `;
    }

    private _handleAction(ev: any, actionConfig: any): void {
        if (!actionConfig.entity) {
            actionConfig.entity = this.config.entity
        }
        if (ev.detail?.action) {
            switch (ev.detail.action) {
                case 'tap':
                    if (actionConfig.tap_action)
                        this._handleTap(actionConfig);
                    break;
                case 'hold':
                    if (actionConfig.hold_action)
                        this._handleHold(actionConfig);
                    break;
                case 'double_tap':
                    if (actionConfig.double_tap_action)
                        this._handleDblTap(actionConfig);
                    break;
                default:
                    break;
            }
        }
    }

    private _handleTap(actionConfig: any): void {
        // handleClick(this, this.hass!, this._evalActions(config, 'tap_action'), false, false);
        handleAction(this, this.hass, actionConfig, 'tap')
    }

    private _handleHold(actionConfig: any): void {
        // handleClick(this, this.hass!, this._evalActions(config, 'hold_action'), true, false);
        handleAction(this, this.hass, actionConfig, 'hold')
    }

    private _handleDblTap(actionConfig: any): void {
        // handleClick(this, this.hass!, this._evalActions(config, 'double_tap_action'), false, true);
        handleAction(this, this.hass, actionConfig, 'double_tap')
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

    private _setBrightness(_entity, _target, _minSet: number, _maxSet: number): void {
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
                margin: 0 2px 2px 2px;
            }

            .slider-container input[type="range"]::-webkit-slider-runnable-track {
                height: 100%;
                -webkit-appearance: none;
                color: var(--accent-color);
                transition: box-shadow 0.2s ease-in-out;
            }
            
            .slider-container input[type="range"]::-webkit-slider-thumb {
                width: 8px;
                height: 80px;
                -webkit-appearance: none;
                cursor: ew-resize;
                border-radius: 0;
                transition: box-shadow 0.2s ease-in-out;
                position: relative;
            
                box-shadow: -3500px 0 0 3500px var(--slider-color), inset 0 0 0 25px rgba(0, 0, 0, 0);
            
                top: calc((100% - 80px) / 2);
                border-right: 2px solid var(--slider-color);
                border-left: 4px solid var(--slider-color);
                border-top: 28px solid var(--slider-color);
                border-bottom: 28px solid var(--slider-color);
                pointer-events: auto;
            }
            
            .slider-container input[type=range]::-moz-range-thumb {
                width: calc(25px / 4);
                height: calc(80px / 2);
                box-shadow: -3500px 10px 0 3500px var(--slider-color), inset 0 0 0 25px rgba(0, 0, 0, 0);
                top: calc((100% - 80px) / 2);
                cursor: ew-resize;
                border-radius: 0;
                transition: box-shadow 0.2s ease-in-out;
                position: relative;
                border-radius: 0;
                border-right: 10px solid var(--slider-color);
                border-left: 10px solid var(--slider-color);
                border-top: 20px solid var(--slider-color);
                border-bottom: 20px solid var(--slider-color);
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
//     color-on: rgba(253, 216, 53, 1)
//     color-off: rgba(86, 86, 86, 0.75)
//   icon
//     color-on: green
//     color-off: red
//   label
//   slider:
    // container:
    //     color-on: rgba(253, 216, 53, 1)
    //     color-off: rgba(86, 86, 86, 0.75)
//     input:
//       height: 100%
//     track: (Not implemented yet)
//       height: 100%
//       color: red
//     thumb: (Not implemented yet)
//       height: 80px
// tap_action
// double_tap_action
// hold_action