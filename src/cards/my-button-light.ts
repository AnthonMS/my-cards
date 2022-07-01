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
import { HassEntity } from 'home-assistant-js-websocket'
import {
    HomeAssistant,
    hasConfigOrEntityChanged,
} from 'custom-card-helpers'; // This is a community maintained npm module with common helper functions/types
import { actionHandler } from '../action-handler-directive';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'

import type { MyButtonLightCardConfig } from '../types';
import { BUTTON_LIGHT_VERSION } from '../const';
import { localize } from '../localize/localize';
import { getStyle } from './styles/my-button-light.styles'
import { deflate } from './scripts/deflate'

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

@customElement('my-button-light')
export class MyButtonLight extends LitElement {
    private entity: HassEntity | undefined
    private cardStl: StyleInfo = {}
    private containerStl: StyleInfo = {}
    private iconStl: StyleInfo = {}
    private labelStl: StyleInfo = {}
    private row1Stl: StyleInfo = {}
    private row2Stl: StyleInfo = {}
    private row3Stl: StyleInfo = {}
    private lastAction: number = 0
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
        if (!this.entity) return html``
        // const entityId = this.config.entity
        // const entity = this.hass.states[`${entityId}`]

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
            text: this.entity.attributes.friendly_name
        }
        // If label is just a string, then save that under labelConfig. If it's an object, then combine default with custom configs. If nothing then just use default config
        const labelConfig = typeof this.config.label === 'string' ? { ...defaultLabelAttr, text: this.config.label } : typeof this.config.label === 'object' ? { ...defaultLabelAttr, ...this.config.label } : defaultLabelAttr

        // ---- Slider Config ---- //
        const defaultSliderConfig = {
            show: true
        }
        const sliderConfig = this.config.slider ? { ...defaultSliderConfig, ...this.config.slider } : defaultSliderConfig

        const handleSlider = (e) => {
            this._setBrightness(this.entity, e.target, sliderConfig.min, sliderConfig.max)
        }

        const icon = () => {
            if (!iconConfig.show) return html``
            return html`
                <ha-icon icon="${iconConfig.icon}" style="${styleMap(this.iconStl)}"
                    @action=${e => this._handleAction(e, this.config)}
                    .actionHandler=${actionHandler({
                hasDoubleClick: this.config?.double_tap_action?.action !== 'none',
                hasHold: this.config?.hold_action?.action !== 'none',
            })} />
            `

            if (iconConfig.tap_action || iconConfig.double_tap_action || iconConfig.hold_action) {
                return html`
                    <ha-icon icon="${iconConfig.icon}" style="${styleMap(this.iconStl)}"
                        @action=${e => this._handleAction(e, iconConfig)}
                        .actionHandler=${actionHandler({
                    hasDoubleClick: iconConfig.double_tap_action?.action !== 'none',
                    hasHold: iconConfig.hold_action?.action !== 'none',
                })} />
                `
            }
            else {
                return html`
                    <ha-icon icon="${iconConfig.icon}" style="${styleMap(this.iconStl)}" />
                `
            }
        }

        const slider = () => {
            if (!sliderConfig.show) return html``

            return html`
                <div>Slider Goes here...</div>
            `
        }

        const label = () => {
            if (!labelConfig.show) return html``

            return html`
                <label style="${styleMap(this.labelStl)}">${labelConfig.text}</label>
            `
        }

        return html`
            <ha-card style="${styleMap(this.cardStl)}">
                <div style="${styleMap(this.containerStl)}">
                    <div style="${styleMap(this.row1Stl)}"
                        @action=${e => this._handleAction(e, this.config)}
                        .actionHandler=${actionHandler({
                            hasDoubleClick: this.config?.double_tap_action?.action !== 'none',
                            hasHold: this.config?.hold_action?.action !== 'none',
                        })}>
                        ${icon()}
                    </div>
                    <div style="${styleMap(this.row2Stl)}"
                        @action=${e => this._handleAction(e, this.config)}
                        .actionHandler=${actionHandler({
                            hasDoubleClick: this.config?.double_tap_action?.action !== 'none',
                            hasHold: this.config?.hold_action?.action !== 'none',
                        })}>
                        ${label()}
                    </div>
                    <div style="${styleMap(this.row3Stl)}">
                        ${slider()}
                    </div>
                </div>
            </ha-card>
        `;
    }

    private initializeConfig(): void {
        const entityId = this.config.entity
        // const entity = this.hass.states[`${entityId}`]
        this.entity = this.hass.states[`${entityId}`]

        
        const deflatedCardStl = deflate(this.config.styles?.card) ? deflate(this.config.styles?.card) : {}
        const deflatedContainerStl = deflate(this.config.styles?.container) ? deflate(this.config.styles?.container) : {}
        const deflatedIconStl = deflate(this.config.styles?.icon) ? deflate(this.config.styles?.icon) : {}
        const deflatedLabelStl = deflate(this.config.styles?.label) ? deflate(this.config.styles?.label) : {}
        const deflatedRow1Stl = deflate(this.config.styles?.row1) ? deflate(this.config.styles?.row1) : {}
        const deflatedRow2Stl = deflate(this.config.styles?.row2) ? deflate(this.config.styles?.row2) : {}
        const deflatedRow3Stl = deflate(this.config.styles?.row3) ? deflate(this.config.styles?.row3) : {}
        // ---------- Styles ---------- //
        this.cardStl = getStyle('card', deflatedCardStl)
        this.containerStl = getStyle('container', deflatedContainerStl)
        this.iconStl = getStyle('icon', deflatedIconStl)
        this.labelStl = getStyle('label', deflatedLabelStl)
        this.row1Stl = getStyle('row1', deflatedRow1Stl)
        this.row2Stl = getStyle('row2', deflatedRow2Stl)
        this.row3Stl = getStyle('row3', deflatedRow3Stl)
    }

    private _handleAction(ev: any, actionConfig: any): void {
        ev.stopPropagation()
        ev.stopImmediatePropagation()
        if (!actionConfig.entity) {
            actionConfig.entity = this.config.entity
        }
        console.log('Action Config:', actionConfig)
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
        if (actionConfig) {}
        // handleAction(this, this.hass, actionConfig, 'tap')
    }

    private _handleHold(actionConfig: any): void {
        if (actionConfig) {}
        // handleAction(this, this.hass, actionConfig, 'hold')
    }

    private _handleDblTap(actionConfig: any): void {
        if (actionConfig) {}
        // handleAction(this, this.hass, actionConfig, 'double_tap')
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
        
        return css``;
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