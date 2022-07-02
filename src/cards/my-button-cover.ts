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
// import { HassEntity } from 'home-assistant-js-websocket'
import {
    HomeAssistant,
    hasConfigOrEntityChanged,
    hasAction,
    ActionHandlerEvent,
    handleAction,
    handleClick,
} from 'custom-card-helpers' // This is a community maintained npm module with common helper functions/types
import { actionHandler } from '../scripts/action-handler-directive'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'

import type { MyButtonCoverCardConfig } from './extras/types'
import { BUTTON_COVER_VERSION } from './extras/const'
import { localize } from '../localize/localize'
import { objectToStyleString } from '../scripts/helpers'
import { getStyle } from './styles/style-configs'

/* eslint no-console: 0 */
console.info(
    `%c  ---- MY-BUTTON-COVER ---- \n%c  ${localize('common.version')} ${BUTTON_COVER_VERSION}    `,
    'color: orange; font-weight: bold; background: black',
    'color: white; font-weight: bold; background: green',
);

// This puts your card into the UI card picker dialog
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
    type: 'my-button-cover',
    name: 'Cover Button Card',
    description: 'Custom Cover Button Card for Lovelace.',
})

@customElement('my-button-cover')
export class MyButtonCover extends LitElement {
    // private _stateObj: HassEntity | undefined;
    // private _evaledVariables: any | undefined;

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
    @internalProperty() private config!: MyButtonCoverCardConfig;

    // https://lit-element.polymer-project.org/guide/properties#accessors-custom
    public setConfig(config: MyButtonCoverCardConfig): void {

        if (!config.entity) {
            throw new Error("You need to define entity");
        }

        if (!config.entity.includes("cover.")) {
            throw new Error("Entity has to be a cover.");
        }

        this.config = {
            name: 'MyButtonCover',
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
        const styles = this.config.styles ? JSON.parse(JSON.stringify(this.config.styles)) : {}
        const entityId = this.config.entity ? this.config.entity : "ERROR"
        const entity = this.hass.states[`${entityId}`]

        // ---- Icon Config ---- //
        const defaultIconAttr = {
            show: true,
            icon: '',
            iconOpen: 'mdi:blinds-open',
            iconClose: 'mdi:blinds',
        }
        // If icon is just a string, then save that under iconConfig. If it's an object, then combine default with custom configs. If nothing then just use default config
        const iconConfig = typeof this.config.icon === 'string' ? { ...defaultIconAttr, icon: this.config.icon } : typeof this.config.icon === 'object' ? { ...defaultIconAttr, ...this.config.icon } : defaultIconAttr

        // ---- Label Config ---- //
        const defaultLabelAttr = {
            show: true,
            text: entity.attributes.friendly_name,
            vertical: true
        }
        // If label is just a string, then save that under labelConfig. If it's an object, then combine default with custom configs. If nothing then just use default config
        const labelConfig = typeof this.config.label === 'string' ? { ...defaultLabelAttr, text: this.config.label } : typeof this.config.label === 'object' ? { ...defaultLabelAttr, ...this.config.label } : defaultLabelAttr

        // ---- Slider Config ---- //
        const defaultSliderConfig = {
            min: 0,
            max: 100,
            step: '1'
        }
        const sliderConfig = this.config.slider ? { ...defaultSliderConfig, ...this.config.slider } : defaultSliderConfig

        // ---- Styles ---- //
        const cardStyle = getStyle('my-button-card', styles.card)
        const iconStyle = getStyle('my-button-icon', styles.icon)
        const labelStyle = labelConfig.vertical ? getStyle('my-button-label-vertical', styles.label) : getStyle('my-button-label', styles.label)
        const labelWrapperStyle = getStyle('my-button-label-wrapper', styles['label-wrapper'])
        const { containerStyle, inputStyle } = getStyle('my-button-slider-vertical', styles.slider)
        const sliderWrapperStyle = getStyle('my-button-slider-wrapper', styles.slider?.wrapper)

        const toggleScroll = () => {
            this.config.disabled_scroll = !this.config.disabled_scroll
            if (this.config.disabled_scroll) {
                disableBodyScroll(window)
            } else {
                enableBodyScroll(window)
            }
        }

        const handleSlider = (e) => {
            this._setCover(entity, e.target, sliderConfig.min, sliderConfig.max)
        }

        if (entityId === 'ERROR')
            return html`<ha-card>Error: No Entity ID</ha-card>`


        const icon = () => {
            if (!iconConfig.show) return html``
            let icon = iconConfig.icon ? iconConfig.icon : ''
            let iconOpen = iconConfig.iconOpen ? iconConfig.iconOpen : 'mdi:blinds-open'
            let iconClose = iconConfig.iconClose ? iconConfig.iconClose : 'mdi:blinds'

            if (icon === '') {
                icon = iconClose
                if (entity.attributes.current_position >= 50) {
                    icon = iconOpen
                }
            }

            return html`
                <ha-icon class="my-button-icon" icon="${icon}" style="${objectToStyleString(iconStyle)}"
                    @action=${e => this._handleAction(e, iconConfig)}
                    .actionHandler=${actionHandler({
                hasDoubleClick: iconConfig?.double_tap_action?.action !== 'none',
                hasHold: iconConfig?.hold_action?.action !== 'none',
            })}
                />
            `
        }

        const label = () => {
            if (!labelConfig.show) return html``
            return html`
                <div style="${labelConfig.vertical ? objectToStyleString(labelWrapperStyle) : 'display: block;'}"
                    @action=${e => this._handleAction(e, labelConfig)}
                    .actionHandler=${actionHandler({
                hasDoubleClick: labelConfig?.double_tap_action?.action !== 'none',
                hasHold: labelConfig?.hold_action?.action !== 'none',
            })}
                >

                    <label style="${objectToStyleString(labelStyle)}">${labelConfig.text}</label>
                </div>
            `
        }

        return html`
            <ha-card class="my-button-card" style="${objectToStyleString(cardStyle)}">
                <div class="my-button-wrapper">
                    <div class="flex-container-columns">
                        <div class="column-1"
                            @action=${e => this._handleAction(e, this.config)}
                            .actionHandler=${actionHandler({
            hasDoubleClick: this.config?.double_tap_action?.action !== 'none',
            hasHold: this.config?.hold_action?.action !== 'none',
        })}
                        >
                            <div class="flex-container-rows">
                                <div class="row-1">
                                    ${icon()}
                                </div>
                                <div class="row-2">
                                    ${label()}
                                </div>
                                <div class="row-3"></div>
                            </div>
                        </div>
                        <div class="column-2">
                            <div style="${objectToStyleString(sliderWrapperStyle)}">
                                <div class="slider-container" style="${objectToStyleString(containerStyle)}">
                                    <input name="slider" type="range" class="" style="${objectToStyleString(inputStyle)}"
                                        min="${sliderConfig.min}" max="${sliderConfig.max}" step="${sliderConfig.step}" 
                                        value="${entity.attributes.current_position}"
                                        @change=${!sliderConfig.intermediate && handleSlider}
                                        @input=${sliderConfig.intermediate && handleSlider}
                                        @touchstart="${sliderConfig.toggle_scroll ? toggleScroll : null}"
                                        @touchend="${sliderConfig.toggle_scroll ? toggleScroll : null}"
                                        @mousedown="${sliderConfig.toggle_scroll ? toggleScroll : null}"
                                        @mouseup="${sliderConfig.toggle_scroll ? toggleScroll : null}"
                                        @touchcancel="${sliderConfig.toggle_scroll ? toggleScroll : null}"
                                    />
                                </div>
                            </div>
                        </div>
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

    private _setCover(_entity, _target, _minSet, _maxSet): void {
        var value = _target.value;
        if (value > _maxSet) {
            value = _maxSet;
        } else if (value < _minSet) {
            value = _minSet;
        }

        this.hass.callService("cover", "set_cover_position", {
            entity_id: _entity.entity_id,
            position: value
        });

        _target.value = value;
    }

    // https://lit-element.polymer-project.org/guide/styles
    static get styles(): CSSResult {
        return css`
            .my-button-icon {
                --mdc-icon-size: 100%;
            }
            .my-button-wrapper {
                height: 100%;
                width: 100%;
                margin: 0;
                padding: 0;
                position: relative;
                pointer-events: auto;
            }
            .flex-container-columns {
                padding: 0;
                margin: 0;
                display: flex;
                flex-flow: row;
                height: 100%;
                pointer-events: auto;
            }
            .flex-container-columns .column-1 {
                flex: 1;
            }
            .flex-container-columns .column-2 {
                flex: 0;
            }

            .flex-container-rows {
                padding: 0;
                margin: 0;
                display: flex;
                flex-flow: column;
                height: 100%;
            }
            
            .flex-container-rows .row-1 {
                flex: 0 1 auto; 
            }
            .flex-container-rows .row-2 {
                flex: 1 1 auto;
                padding-bottom: 5px;
            }
            .flex-container-rows .row-3 {
                flex: 0 1 auto;
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
// label
//   text
//   show
//   vertical
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
//   label-wrapper (only used if label.vertical = true)
//   slider:
//     container:
//         color-on: rgba(253, 216, 53, 1)
//         color-off: rgba(86, 86, 86, 0.75)
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