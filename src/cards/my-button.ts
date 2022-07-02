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
    handleClick,
    LovelaceCard
} from 'custom-card-helpers'; // This is a community maintained npm module with common helper functions/types
import { actionHandler } from '../scripts/action-handler-directive';

import type { MyButtonLightCardConfig } from './extras/types';
import { BUTTON_LIGHT_VERSION } from './extras/const';
import { localize } from '../localize/localize';
import { getStyle } from './styles/my-button-light.styles'
import { deflate } from '../scripts/deflate'

/* eslint no-console: 0 */
console.info(
    `%c  ---- MY-BUTTON ---- \n%c  ${localize('common.version')} ${BUTTON_LIGHT_VERSION}    `,
    'color: orange; font-weight: bold; background: black',
    'color: white; font-weight: bold; background: green',
);

// This puts your card into the UI card picker dialog
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
    type: 'my-button',
    name: 'My Button Card',
    description: 'Custom Button Card for Lovelace.',
});

@customElement('my-button')
export class MyButton extends LitElement {
    @property() private _config?: MyButtonLightCardConfig
    private entity: HassEntity | undefined
    private lastAction: number = 0
    private iconConfig: any = {}
    private labelConfig: any = {}
    private sliderConfig: any = {}
    private _evaledVariables: any | undefined;

    // STYLES
    private cardStl: StyleInfo = {}
    private containerStl: StyleInfo = {}
    private iconStl: StyleInfo = {}
    private labelStl: StyleInfo = {}
    private row1Stl: StyleInfo = {}
    private row2Stl: StyleInfo = {}
    private row3Stl: StyleInfo = {}

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

        // if (!config.entity.includes("light.")) {
        //     throw new Error("Entity has to be a light.");
        // }

        this.config = {
            name: 'MyButton',
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
        const initFailed = this.initializeConfig()
        if (initFailed !== null) return initFailed
        if (!this.entity) return html``

        const icon = () => {
            if (!this.iconConfig.show) return html``

            if (this.iconConfig.tap_action || this.iconConfig.double_tap_action || this.iconConfig.hold_action) {
                return html`
                    <ha-icon icon="${this.iconConfig.icon}" style="${styleMap(this.iconStl)}"
                        @action=${e => this._handleAction(e, this.iconConfig)}
                        .actionHandler=${actionHandler({
                    hasDoubleClick: this.iconConfig.double_tap_action?.action !== 'none',
                    hasHold: this.iconConfig.hold_action?.action !== 'none',
                })} />
                `
            }
            else {
                return html`
                    <ha-icon icon="${this.iconConfig.icon}" style="${styleMap(this.iconStl)}" />
                `
            }
        }

        const slider = () => {
            if (!this.sliderConfig.show) return html``

            // <div>Slider Goes here...</div>
            return html`
                <my-slider-v2 .hass="${this.hass}" .config="${this.sliderConfig}"></my-slider-v2>
            `
        }

        const label = () => {
            if (!this.labelConfig.show) return html``

            if (this.labelConfig.tap_action || this.labelConfig.double_tap_action || this.labelConfig.hold_action) {
                return html`
                    <label style="${styleMap(this.labelStl)}"
                        @action=${e => this._handleAction(e, this.labelConfig)}
                        .actionHandler=${actionHandler({
                    hasDoubleClick: this.labelConfig.double_tap_action?.action !== 'none',
                    hasHold: this.labelConfig.hold_action?.action !== 'none',
                })}
                    >${this.labelConfig.text}</label>
                `
            }
            else {
                return html`
                    <label style="${styleMap(this.labelStl)}">${this.labelConfig.text}</label>
                `
            }
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

    private initializeConfig(): any {
        this.entity = this.hass.states[`${this.config.entity}`]
        if (this.lastAction === 0) {
            this.lastAction = new Date().getTime()
        }
        
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

        // ---- Icon Config ---- //
        const defaultIconAttr = {
            show: true,
            icon: 'mdi:cog-outline'
        }
        // If icon is just a string, then save that under iconConfig. If it's an object, then combine default with custom configs. If nothing then just use default config
        this.iconConfig = typeof this._config!.icon === 'string' ? { ...defaultIconAttr, icon: this._config!.icon } : typeof this._config!.icon === 'object' ? { ...defaultIconAttr, ...this._config!.icon } : defaultIconAttr

        // ---- Label Config ---- //
        const defaultLabelAttr = {
            show: true,
            text: this.entity.attributes.friendly_name
        }
        // If label is just a string, then save that under labelConfig. If it's an object, then combine default with custom configs. If nothing then just use default config
        this.labelConfig = typeof this._config!.label === 'string' ? { ...defaultLabelAttr, text: this._config!.label } : typeof this._config!.label === 'object' ? { ...defaultLabelAttr, ...this._config!.label } : defaultLabelAttr

        // ---- Slider Config ---- //
        const defaultSliderConfig = {
            show: true,
            entity: this.entity.entity_id,
        }
        this.sliderConfig = this._config!.slider ? { ...defaultSliderConfig, ...this._config!.slider } : defaultSliderConfig


        const deflatedCardStl = deflate(this._config!.styles?.card) ? deflate(this._config!.styles?.card) : {}
        const deflatedContainerStl = deflate(this._config!.styles?.container) ? deflate(this._config!.styles?.container) : {}
        const deflatedIconStl = deflate(this._config!.styles?.icon) ? deflate(this._config!.styles?.icon) : {}
        const deflatedLabelStl = deflate(this._config!.styles?.label) ? deflate(this._config!.styles?.label) : {}
        const deflatedRow1Stl = deflate(this._config!.styles?.row1) ? deflate(this._config!.styles?.row1) : {}
        const deflatedRow2Stl = deflate(this._config!.styles?.row2) ? deflate(this._config!.styles?.row2) : {}
        const deflatedRow3Stl = deflate(this._config!.styles?.row3) ? deflate(this._config!.styles?.row3) : {}
        // ---------- Styles ---------- //
        this.cardStl = getStyle('card', deflatedCardStl)
        this.containerStl = getStyle('container', deflatedContainerStl)
        this.iconStl = getStyle('icon', deflatedIconStl)
        this.labelStl = getStyle('label', deflatedLabelStl)
        this.row1Stl = getStyle('row1', deflatedRow1Stl)
        this.row2Stl = getStyle('row2', deflatedRow2Stl)
        this.row3Stl = getStyle('row3', deflatedRow3Stl)

        return null // Success in this case
    }

    private _handleAction(ev: any, actionConfig: any): void {
        ev.stopPropagation()
        ev.stopImmediatePropagation()

        const now = new Date().getTime()

        // Check here if lastAction was performed longer than 100 ms
        // If not then we want to return and break out of the function
        if (now - this.lastAction < 100) {
            return
        }
        // We will only get here if enough time has passed
        // So safely set the new lastAction
        this.lastAction = new Date().getTime()

        if (!actionConfig.entity) {
            actionConfig.entity = this._config!.entity
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
        if (actionConfig) { }
        handleClick(this, this.hass!, this._evalActions(this._config!, 'tap_action'), false, false)
    }

    private _handleHold(actionConfig: any): void {
        if (actionConfig) { }
        handleClick(this, this.hass!, this._evalActions(this._config!, 'hold_action'), true, false)
    }

    private _handleDblTap(actionConfig: any): void {
        if (actionConfig) { }
        handleClick(this, this.hass!, this._evalActions(this._config!, 'double_tap_action'), false, true)
    }

    private _evalActions(config: MyButtonLightCardConfig, action: string): MyButtonLightCardConfig {
        // const configDuplicate = copy(config);
        const configDuplicate = JSON.parse(JSON.stringify(config));
        /* eslint no-param-reassign: 0 */
        const __evalObject = (configEval: any): any => {
            if (!configEval) {
                return configEval;
            }
            Object.keys(configEval).forEach((key) => {
                if (typeof configEval[key] === 'object') {
                    configEval[key] = __evalObject(configEval[key]);
                } else {
                    configEval[key] = this._getTemplateOrValue(this.entity, configEval[key]);
                }
            });
            return configEval;
        };
        configDuplicate[action] = __evalObject(configDuplicate[action]);
        if (!configDuplicate[action].confirmation && configDuplicate.confirmation) {
            configDuplicate[action].confirmation = __evalObject(configDuplicate.confirmation);
        }
        return configDuplicate;
    }

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