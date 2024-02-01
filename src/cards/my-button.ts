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
    state,
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

import type { MyButtonCardConfig } from './extras/types';
import { BUTTON_VERSION } from './extras/const';
import { localize } from '../localize/localize';
import { getStyle } from './styles/my-button.styles'
import { deflate } from '../scripts/deflate'
import { deepMerge, percentage } from '../scripts/helpers'

/* eslint no-console: 0 */
console.info(
    `%c  ---- MY-BUTTON ---- \n%c  ${localize('common.version')} ${BUTTON_VERSION}    `,
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
    @property() private _config?: MyButtonCardConfig
    private entity: HassEntity | undefined
    private lastAction: number = 0
    private layout: string = 'vertical'
    private iconConfig: any = {}
    private labelConfig: any = {}
    private sliderConfig: any = {}
    private statsConfig: any = {}

    // STYLES
    private cardStl: StyleInfo = {}
    private containerStl: StyleInfo = {}
    private containerColumnStl: StyleInfo = {}
    private iconStl: StyleInfo = {}
    private statsStl: StyleInfo = {}
    private labelWrapperStl: StyleInfo = {}
    private labelStl: StyleInfo = {}
    private row1Stl: StyleInfo = {}
    private row2Stl: StyleInfo = {}
    private row3Stl: StyleInfo = {}
    private column1Stl: StyleInfo = {}
    private column2Stl: StyleInfo = {}

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
    @state() private config!: MyButtonCardConfig;

    // https://lit-element.polymer-project.org/guide/properties#accessors-custom
    public setConfig(config: MyButtonCardConfig): void {
        const allowedEntities = [
            'light',
            'cover',
            'switch'
        ]

        if (!config.entity) {
            throw new Error("You need to define entity")
        }

        if (!allowedEntities.includes(config.entity.split('.')[0])) {
            throw new Error(`Entity has to be one of the following: ${allowedEntities.map(e => ' ' + e)}`)
        }

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
        if (!this.entity || !this._config) return html``


        if (this.layout === 'vertical') {
            return this.verticalLayoutCard()
        }
        else {
            return this.horizontalLayoutCard()
        }
    }
    // ------------------- CUSTOM CARDS ------------------- //
    private verticalLayoutCard(): TemplateResult {
        return html`
            <ha-card style="${styleMap(this.cardStl)}">
                <div style="${styleMap(this.containerStl)}">
                    <div style="${styleMap(this.row1Stl)}"
                        @action=${e => this._handleAction(e, this.config)}
                        .actionHandler=${actionHandler({
            hasDoubleClick: this.config?.double_tap_action?.action !== 'none',
            hasHold: this.config?.hold_action?.action !== 'none',
        })}>
                        ${this.iconElement()}

                        ${this.statsElement()}
                    </div>
                    <div style="${styleMap(this.row2Stl)}"
                        @action=${e => this._handleAction(e, this.config)}
                        .actionHandler=${actionHandler({
            hasDoubleClick: this.config?.double_tap_action?.action !== 'none',
            hasHold: this.config?.hold_action?.action !== 'none',
        })}>
                        ${this.labelElement()}
                    </div>
                    <div style="${styleMap(this.row3Stl)}">
                        ${this.sliderElement()}
                    </div>
                </div>
            </ha-card>
        `;
    }
    private horizontalLayoutCard(): TemplateResult {
        return html`
            <ha-card style="${styleMap(this.cardStl)}">
                <div style="${styleMap(this.containerColumnStl)}">
                    <div style="${styleMap(this.column1Stl)}">
                        <div style="${styleMap(this.containerStl)}">
                            <div style="${styleMap(this.row1Stl)}"
                                @action=${e => this._handleAction(e, this.config)}
                                .actionHandler=${actionHandler({
            hasDoubleClick: this.config?.double_tap_action?.action !== 'none',
            hasHold: this.config?.hold_action?.action !== 'none',
        })}>
                                ${this.iconElement()}
                            </div>
                            <div style="${styleMap(this.row2Stl)}"
                                @action=${e => this._handleAction(e, this.config)}
                                .actionHandler=${actionHandler({
            hasDoubleClick: this.config?.double_tap_action?.action !== 'none',
            hasHold: this.config?.hold_action?.action !== 'none',
        })}>
                                ${this.labelElement()}
                            </div>
                            <div style="${styleMap(this.row3Stl)}">
                            </div>
                        </div>
                    </div>
                    <div style="${styleMap(this.column2Stl)}">
                        ${this.sliderElement()}
                    </div>
                </div>
            </ha-card>
        `;
    }

    private iconElement(): TemplateResult {
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
    private statsElement(): TemplateResult {
        if (!this.statsConfig.show) return html``

        if (this.statsConfig.tap_action || this.statsConfig.double_tap_action || this.statsConfig.hold_action) {
            return html`
                <div style="${styleMap(this.statsStl)}"
                    @action=${e => this._handleAction(e, this.statsConfig)}
                    .actionHandler=${actionHandler({
                hasDoubleClick: this.statsConfig.double_tap_action?.action !== 'none',
                hasHold: this.statsConfig.hold_action?.action !== 'none',
            })}>

                ${this.statsConfig.text}

                </div>
            `
        }
        else {
            return html`
                <div style="${styleMap(this.statsStl)}">
                ${this.statsConfig.text}
                </div>
            `
        }
    }

    private labelElement(): TemplateResult {
        if (!this.labelConfig.show) return html``


        if (this.labelConfig.tap_action || this.labelConfig.double_tap_action || this.labelConfig.hold_action) {
            return html`
                <div style="${styleMap(this.labelWrapperStl)}">
                        <label style="${styleMap(this.labelStl)}"
                            @action=${e => this._handleAction(e, this.labelConfig)}
                            .actionHandler=${actionHandler({
                hasDoubleClick: this.labelConfig.double_tap_action?.action !== 'none',
                hasHold: this.labelConfig.hold_action?.action !== 'none',
            })}
                        >${this.labelConfig.text}</label>
                </div>
            `
        }
        else {
            return html`
                <div style="${styleMap(this.labelWrapperStl)}">
                    <label style="${styleMap(this.labelStl)}">${this.labelConfig.text}</label>
                </div>
            `
        }
    }

    private sliderElement(): TemplateResult {
        if (!this.sliderConfig.show) return html``

        if (this.layout === 'horizontal') {
            this.sliderConfig.vertical = this.sliderConfig.vertical !== undefined ? this.sliderConfig.vertical : true
            this.sliderConfig.styles = this.sliderConfig.styles ? this.sliderConfig.styles : {}
            this.sliderConfig.styles.card = this.sliderConfig.styles.card ? this.sliderConfig.styles.card : {}
            this.sliderConfig.styles.card.width = this.sliderConfig.styles.card.width ? this.sliderConfig.styles.card.width : '35px'
        }

        return html`
            <my-slider-v2 .hass="${this.hass}" .config="${this.sliderConfig}"></my-slider-v2>
        `
    }

    // ------------------- INITIALIZE CUSTOM CARD CONFIGURATION ------------------- //
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
        if (!this._config) return html`Error with this._config...`
        const entityType = this._config.entity.split('.')[0]
        // ---- Default Icon Config ---- //
        const defaultIconAttr = {
            show: true,
            icon: 'mdi:lightbulb-outline'
        }
        if (entityType === 'cover') {
            defaultIconAttr.icon = this.entity.attributes?.current_position >= 50 ? 'mdi:blinds-open' : 'mdi:blinds'
        }
        else if (entityType === 'switch') {
            defaultIconAttr.icon = this.entity.state === 'on' ? 'mdi:power-plug' : 'mdi:power-plug-off'
        }

        // ---- Default Label Config ---- //
        const defaultLabelAttr = {
            show: true,
            text: this.entity.attributes.friendly_name
        }

        this.layout = this._config.layout ? this._config.layout : 'vertical'
        if (this._config.entity.split('.')[0] === 'cover') {
            this.layout = this._config.layout ? this._config.layout : 'horizontal'
        }
        // If icon is just a string, then save that under iconConfig. If it's an object, then combine default with custom configs. If nothing then just use default config
        this.iconConfig = typeof this._config.icon === 'string' ? { ...defaultIconAttr, icon: this._config.icon } : typeof this._config.icon === 'object' ? deepMerge(defaultIconAttr, this._config.icon) : defaultIconAttr
        this.labelConfig = typeof this._config.label === 'string' ? { ...defaultLabelAttr, text: this._config.label } : typeof this._config.label === 'object' ? deepMerge(defaultLabelAttr, this._config.label) : defaultLabelAttr

        const defaultStatsAttr = {
            show: this.entity.attributes.brightness ? true : false,
            text: this.entity.attributes.brightness && Math.ceil(percentage(this.entity.attributes.brightness, 256))
        }
        this.statsConfig = typeof this._config.stats === 'string' ? { ...defaultStatsAttr, text: this._config.stats } : typeof this._config.stats === 'object' ? deepMerge(defaultStatsAttr, this._config.stats) : defaultStatsAttr



        const defaultSliderConfig = {
            show: true,
            entity: this.entity.entity_id,
            styles: {
                card: [{
                    'border-radius': '0px',
                    background: 'transparent',
                    'box-shadow': 'none',
                    cursor: 'default',
                }],
                container: [{
                    'border-radius': '0px',
                    // 'box-shadow': this.entity.state === 'on' ? '0 0 3px rgba(0,0,0,0.6)' : '0 0 3px rgba(0,0,0,0.3)'
                }],
                thumb: this.layout === 'vertical' ? [{
                    'height': '20px',
                    'width': '3px',
                    'top': '6px',
                    'right': '2px',
                    'border-radius': '50px',
                    // 'cursor': 'ew-resize'
                }] : [{
                    'width': '20px',
                    'height': '3px',
                    'bottom': '2px',
                    'left': '7px',
                    'border-radius': '50px',
                    // 'cursor': 'ns-resize'
                }],
                track: [{
                    background: 'transparent',
                }],
                progress: this.layout === 'vertical' ? [{
                    'background': 'linear-gradient(to top, var(--paper-item-icon-active-color), transparent)',
                }] : [{
                    'background': 'linear-gradient(to left, var(--paper-item-icon-active-color), transparent)',
                }]
            },
        }
        if (entityType === 'switch') {
            defaultSliderConfig.show = false
        }
        this.sliderConfig = this._config.slider ? deepMerge(defaultSliderConfig, this._config.slider) : defaultSliderConfig

        let defaultCardStyle: any[] = []
        if (entityType === 'light') {
            if (this.entity.attributes.brightness) {
                let divisor = 1 + (this.entity.attributes.brightness / 256);
                const cardBg = `radial-gradient(circle at top left, rgba(230, 230, 230, 0.7), var(--card-background-color) ${Math.ceil(percentage(this.entity.attributes.brightness, 256)) / divisor + '%'})`
                defaultCardStyle = [
                    { 'background': cardBg },
                ]
            }
            else {
                defaultCardStyle = [
                    { 'background': `radial-gradient(circle at top left, rgba(230, 230, 230, 0.5), var(--card-background-color) 40%)` },
                ]
            }
        }
        else if (entityType === 'switch') {
            const cardBg = this.entity.state === 'on' ?
                `radial-gradient(circle at top left, rgba(230, 230, 230, 0.7), var(--card-background-color) 50%)` :
                `radial-gradient(circle at top left, rgba(230, 230, 230, 0.5), var(--card-background-color) 40%)`
            defaultCardStyle = [
                { 'background': cardBg },
            ]
        }
        const cardStyle = this._config.styles?.card ? { ...defaultCardStyle, ...this._config.styles.card } : defaultCardStyle;

        const defaultIconStyle = [
            { 'color': this.entity.state === 'on' ? 'var(--paper-item-icon-active-color)' : 'var(--paper-item-icon-color)' },
            { 'filter': this.entity.state === 'on' ? 'drop-shadow(2px 2px 2px rgba(0,0,0,0.6)' : 'drop-shadow(3px 3px 2px rgba(0,0,0,0.3)' },
        ]
        const iconStyle = this._config.styles?.icon ? { ...defaultIconStyle, ...this._config.styles.icon } : defaultIconStyle;

        // ---------- Styles ---------- // deflate the array of objects to a single object
        this.cardStl = getStyle('card', deflate(cardStyle) ? deflate(cardStyle) : {})
        this.containerStl = getStyle('container', deflate(this._config.styles?.container) ? deflate(this._config.styles?.container) : {})
        this.containerColumnStl = getStyle('container-column', deflate(this._config.styles?.containerColumn) ? deflate(this._config.styles?.containerColumn) : {})
        this.iconStl = getStyle('icon', deflate(iconStyle) ? deflate(iconStyle) : {})
        this.statsStl = getStyle('stats', deflate(this._config.styles?.stats) ? deflate(this._config.styles?.stats) : {})
        this.labelWrapperStl = getStyle('label-wrapper', deflate(this._config.styles?.labelWrapper) ? deflate(this._config.styles?.labelWrapper) : {})
        this.labelStl = getStyle('label', deflate(this._config.styles?.label) ? deflate(this._config.styles?.label) : {})
        this.row1Stl = getStyle('row1', deflate(this._config.styles?.row1) ? deflate(this._config.styles?.row1) : {})
        this.row2Stl = getStyle('row2', deflate(this._config.styles?.row2) ? deflate(this._config.styles?.row2) : {})
        this.row3Stl = getStyle('row3', deflate(this._config.styles?.row3) ? deflate(this._config.styles?.row3) : {})
        this.column1Stl = getStyle('column1', deflate(this._config.styles?.column1) ? deflate(this._config.styles?.column1) : {})
        this.column2Stl = getStyle('column2', deflate(this._config.styles?.column2) ? deflate(this._config.styles?.column2) : {})
        return null // Success in this case
    }

    // ------------------- ACTION HANDLER FUNC ------------------- //
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

    private _evalActions(config: MyButtonCardConfig, action: string): MyButtonCardConfig {
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


    // ------------------- TEMPLATING FUNC ------------------- //
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