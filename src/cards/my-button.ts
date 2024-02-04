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
import { styleMap, StyleInfo } from 'lit-html/directives/style-map' // type StyleInfo
import { HassEntity } from 'home-assistant-js-websocket'
import { hasConfigOrEntityChanged, } from 'custom-card-helpers' // This is a community maintained npm module with common helper functions/types

import { BUTTON_VERSION } from './extras/const'
import type { LovelaceCard } from '../types/lovelace';
import type { HomeAssistant } from '../types/homeassistant';
import type { MyButtonConfig } from '../types/types'

import { actionHandler } from '../scripts/action-handler'
import { handleAction } from '../scripts/handle-action'

import { localize } from '../localize/localize'
import { getStyle } from './styles/my-button.styles'
import { deflate } from '../scripts/deflate'
import { deepMerge, percentage } from '../scripts/helpers'
import { evalActions, objectEvalTemplate } from '../scripts/templating'

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
})

@customElement('my-button')
export class MyButton extends LitElement {
    @property() private _hass?: HomeAssistant;
    @property() private _config?: MyButtonConfig
    private entity: HassEntity | undefined
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
    @state() private config!: MyButtonConfig;

    // https://lit-element.polymer-project.org/guide/properties#accessors-custom
    public setConfig(config: MyButtonConfig): void {
        const allowedEntities = [
            '',
            'light',
            'cover',
            'switch',
            'button',
            'lock',
            'media_player'
        ]

        // if (!config.entity) {
        //     throw new Error("You need to define entity")
        // }

        if (config.entity && !allowedEntities.includes(config.entity.split('.')[0])) {
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
        if (!this._config) return html``

        return this.dynamicCard()
    }
    // ------------------- CUSTOM CARDS ------------------- //
    private dynamicCard(): TemplateResult {
        return html`
            <ha-card style="${styleMap(this._config.styles.card)}">
                <div style="display: grid; grid-template-rows: 1fr auto auto; grid-template-columns: 1fr auto; height: 100%;">
                    <div style="grid-row: 1 / 2; grid-column: 1 / 2;" data-container="content"
                    @action=${e => this._handleAction(e, this._config)}
                    .actionHandler=${actionHandler({
            hasDoubleClick: this._config?.double_tap_action?.action !== 'none',
            hasHold: this._config?.hold_action?.action !== 'none',
            repeat: this._config?.hold_action?.repeat,
            repeatLimit: this._config?.hold_action?.repeat_limit,
        })}>
                        <div style="${styleMap(this._config.styles.row1)}" data-container="icon-stats-row">
                            ${this.iconElement()}
                            ${this.statsElement()}
                        </div>
                        <div style="${styleMap(this._config.styles.row2)}" data-container="label-row">
                            ${this.labelElement()}
                        </div>

                    </div>
                    <div style="grid-row: 2 / 3; grid-column: 1 / 2; display: flex;" data-container="buttons-row">
                        ${this._config.buttons.vertical === false ? this.buttonsElement() : ''}
                    </div>
                    <div style="grid-row: 3 / 4; grid-column: 1 / 3;" data-container="slider-row">
                        ${this._config.slider.vertical === false ? this.sliderElement() : ''}
                    </div>
                    <div style="grid-row: 1 / 3; grid-column: 2 / 3; display: flex;" data-container="buttons-column">
                        ${this._config.buttons.vertical === true ? this.buttonsElement() : ''}
                    </div>
                    <div style="grid-row: 1 / 4; grid-column: 3 / 3;" data-container="buttons-column">
                        ${this._config.slider.vertical === true ? this.sliderElement() : ''}
                    </div>
                </div>
            </ha-card>
        `;
    }

    private iconElement(): TemplateResult {
        if (!this._config.icon.show) return html``

        if (this._config.icon.tap_action || this._config.icon.double_tap_action || this._config.icon.hold_action) {
            return html`
                <ha-icon icon="${this._config.icon.icon}" style="${styleMap(this._config.styles.icon)}"
                    @action=${e => this._handleAction(e, this._config.icon)}
                    .actionHandler=${actionHandler({
                hasDoubleClick: this._config.icon.double_tap_action?.action !== 'none',
                hasHold: this._config.icon.hold_action?.action !== 'none',
                repeat: this._config.icon.hold_action?.repeat,
                repeatLimit: this._config.icon.hold_action?.repeat_limit,
            })} />
            `
        }
        else {
            return html`
                <ha-icon icon="${this._config.icon.icon}" style="${styleMap(this._config.styles.icon)}" />
            `
        }
    }
    private statsElement(): TemplateResult {
        if (!this._config.stats.show) return html``

        if (this._config.stats.tap_action || this._config.stats.double_tap_action || this._config.stats.hold_action) {
            if (this._config.camera) {
                return html`
                    <div data-container="stats"
                    @action=${e => this._handleAction(e, this._config.stats)}
                    .actionHandler=${actionHandler({
                    hasDoubleClick: this._config.stats.double_tap_action?.action !== 'none',
                    hasHold: this._config.stats.hold_action?.action !== 'none',
                    repeat: this._config.stats.hold_action?.repeat,
                    repeatLimit: this._config.stats.hold_action?.repeat_limit,
                })}>
                        <div style="${styleMap(deflate(this._config.stats.styles.container))}">
                            <ha-camera-stream style="${styleMap(deflate(this._config.stats.styles.camera))}" 
                                .hass="${this.hass}" .stateObj="${this._config.camera}"></ha-camera-stream>
                            ${this._config.stats.text}
                        </div>
                    </div>
                `
            }
            else {
                return html`
                    <div data-container="stats"
                        @action=${e => this._handleAction(e, this._config.stats)}
                        .actionHandler=${actionHandler({
                    hasDoubleClick: this._config.stats.double_tap_action?.action !== 'none',
                    hasHold: this._config.stats.hold_action?.action !== 'none',
                    repeat: this._config.stats.hold_action?.repeat,
                    repeatLimit: this._config.stats.hold_action?.repeat_limit,
                })}>
    
                        <div style="${styleMap(deflate(this._config.stats.styles.container))}">
                            ${this._config.stats.text}
                        </div>
                    
                    </div>
                `
            }
        }
        else {
            if (this._config.camera) {
                return html`
                    <div data-container="stats">
                        <div style="${styleMap(deflate(this._config.stats.styles.container))}">
                            <ha-camera-stream style="${styleMap(deflate(this._config.stats.styles.camera))}"
                                .hass="${this.hass}" .stateObj="${this._config.camera}"></ha-camera-stream>
                        </div>
                    </div>
                `
            }
            else {
                return html`
                    <div data-container="stats">
                        <div style="${styleMap(deflate(this._config.stats.styles.container))}">
                            ${this._config.stats.text}
                        </div>
                    </div>
                `
            }
        }
    }

    private labelElement(): TemplateResult {
        if (!this._config.label.show) return html``

        if (this._config.label.tap_action || this._config.label.double_tap_action || this._config.label.hold_action) {
            return html`
                <div style="${styleMap(deflate(this._config.label.styles.container))}">
                        <label style="${styleMap(deflate(this._config.label.styles.label))}"
                            @action=${e => this._handleAction(e, this._config.label)}
                            .actionHandler=${actionHandler({
                hasDoubleClick: this._config.label.double_tap_action?.action !== 'none',
                hasHold: this._config.label.hold_action?.action !== 'none',
                repeat: this._config.label.hold_action?.repeat,
                repeatLimit: this._config.label.hold_action?.repeat_limit,
            })}
                        >${this._config.label.text}</label>
                        ${this._config.label.extra ? html`<p style="${styleMap(deflate(this._config.label.styles.extraText))}">${this._config.label.extra}</p>` : ''}
                        
                </div>
            `
        }
        else {
            return html`
                <div style="${styleMap(deflate(this._config.label.styles.container))}">
                    <label style="${styleMap(deflate(this._config.label.styles.label))}">${this._config.label.text}</label>
                    ${this._config.label.extra ? html`<p style="${styleMap(deflate(this._config.label.styles.extraText))}">${this._config.label.extra}</p>` : ''}
                </div>
            `
        }
    }

    private sliderElement(): TemplateResult {
        if (!this._config.slider.show) return html``

        return html`
            <my-slider-v2 .hass="${this.hass}" .config="${this._config.slider}"></my-slider-v2>
        `
    }

    private buttonsElement(): TemplateResult {
        if (!this._config.buttons.show) return html`` // Dont render if not wanted

        let buttonsArray = Object.keys(this._config.buttons)
            .filter(key => key.startsWith('button'))
            .map(key => {
                if (!this._config.buttons[key].show) return html``
                if (this._config.buttons[key].tap_action || this._config.buttons[key].double_tap_action || this._config.buttons[key].hold_action) {
                    return html`
                    <div style="${styleMap(deflate(this._config.buttons[key].styles.container))}" data-container="button"
                    @action=${e => this._handleAction(e, this._config.buttons[key])}
                    .actionHandler=${actionHandler({
                        hasDoubleClick: this._config.buttons[key].double_tap_action?.action !== 'none',
                        hasHold: this._config.buttons[key].hold_action?.action !== 'none',
                        repeat: this._config.buttons[key].hold_action?.repeat,
                        repeatLimit: this._config.buttons[key].hold_action?.repeat_limit,
                    })}>
                        ${this._config.buttons[key].text ? html`<p style="${styleMap(deflate(this._config.buttons[key].styles.text))}">${this._config.buttons[key].text}</p>` : ''}
                        ${this._config.buttons[key].icon ? html`<ha-icon style="${styleMap(deflate(this._config.buttons[key].styles.icon))}" icon="${this._config.buttons[key].icon}"></ha-icon>` : ''}
                        </div>`
                }
                else {
                    return html`
                    <div style="${styleMap(deflate(this._config.buttons[key].styles.container))}" data-container="button">
                    ${this._config.buttons[key].text ? html`<p style="${styleMap(deflate(this._config.buttons[key].styles.text))}">${this._config.buttons[key].text}</p>` : ''}
                    ${this._config.buttons[key].icon ? html`<ha-icon style="${styleMap(deflate(this._config.buttons[key].styles.icon))}" icon="${this._config.buttons[key].icon}"></ha-icon>` : ''}
                    </div>`

                }
            });

        // return html``
        return html`
            <div style="${styleMap(deflate(this._config.buttons.styles.container))}" data-container="buttons">
                ${buttonsArray}
    
            </div>
        `
    }

    // ------------------- INITIALIZE CUSTOM CARD CONFIGURATION ------------------- //
    private initializeConfig(): any {
        this.entity = this.hass.states[`${this.config.entity}`]
        if (this.lastAction === 0) {
            this.lastAction = new Date().getTime()
        }

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
        if (!this._config) return html`Error with this._config...`
        const entityType = this._config.entity ? this._config.entity?.split('.')[0] : 'none'

        const defaultCardConfig: any = {}
        const defaultIconAttr = {
            show: true,
            icon: 'mdi:power'
        }
        const defaultLabelAttr: any = {
            show: true,
        }
        const defaultStatsAttr: any = {
            show: false,
        }
        const defaultButtonsAttr = {
            show: false,
            vertical: true,
            // button0: {
            //     show: true,
            //     text: 'B0',
            //     styles: {
            //         text: getStyle('buttonText', deflate(this._config.buttons?.button1?.styles?.text) ? deflate(this._config.buttons?.button1?.styles?.text) : {}),
            //         icon: getStyle('buttonIcon', deflate(this._config.buttons?.button1?.styles?.icon) ? deflate(this._config.buttons?.button1?.styles?.icon) : {}),
            //     }
            // }
        }

        // TODO: If slider is flipped, we need to position thumb correct
        const defaultSliderConfig: any = {
            show: true,
            vertical: false
        }


        if (entityType !== 'none') {
            const verticalSlider = entityType === 'cover' ? true : false
            const flippedSlider = entityType === 'cover' ? true : false
            const state: string = this.entity.state
            defaultLabelAttr.text = this.entity.attributes.friendly_name
            defaultStatsAttr.text = state.charAt(0).toUpperCase() + state.slice(1)


            defaultSliderConfig.entity = this.entity.entity_id
            defaultSliderConfig.vertical = verticalSlider
            defaultSliderConfig.flipped = flippedSlider

            if (entityType === 'light') {
                defaultCardConfig.tap_action = {
                    action: 'toggle'
                }
                defaultCardConfig.hold_action = {
                    action: 'more-info'
                }
                if (this.entity.attributes.brightness) {
                    defaultCardConfig.hold_action = {
                        action: 'more-info'
                    }
                    defaultStatsAttr.text = Math.ceil(percentage(this.entity.attributes.brightness, 256)) + '%'
                }
                defaultStatsAttr.show = true
            }
            else if (entityType === 'cover') {
                defaultCardConfig.hold_action = {
                    action: 'more-info'
                }
                defaultIconAttr.icon = this.entity.attributes?.current_position >= 50 ? 'mdi:blinds-open' : 'mdi:blinds'
            }
            else if (entityType === 'switch') {
                defaultCardConfig.tap_action = {
                    action: 'toggle'
                }
                defaultCardConfig.hold_action = {
                    action: 'more-info'
                }
                defaultStatsAttr.show = true
                defaultSliderConfig.show = false
                defaultIconAttr.icon = this.entity.state === 'on' ? 'mdi:power-plug' : 'mdi:power-plug-off'
            }
            else if (entityType === 'button') {
                defaultCardConfig.tap_action = {
                    action: 'call-service',
                    service: 'button.press',
                    service_data: {
                        entity_id: this.entity.entity_id
                    }
                }
                defaultCardConfig.hold_action = {
                    action: 'more-info'
                }

                defaultSliderConfig.show = false
            }
            else if (entityType === 'lock') {
                defaultCardConfig.hold_action = {
                    action: 'more-info'
                }
                defaultSliderConfig.show = false
                defaultStatsAttr.show = true

                if (this._config.camera && typeof this._config.camera === 'string') {
                    this._config.camera = this.hass.states[this._config.camera]
                    defaultStatsAttr.entity = this._config.camera.entity_id
                    defaultStatsAttr.tap_action = {
                        action: 'more-info'
                    }
                }

                if (this.entity.state === 'locked') {
                    defaultIconAttr.icon = 'mdi:lock-outline'
                    defaultCardConfig.tap_action = {
                        action: 'call-service',
                        service: 'lock.unlock',
                        service_data: {
                            entity_id: this.entity.entity_id
                        }
                    }
                }
                else if (this.entity.state === 'unlocked') {
                    defaultIconAttr.icon = 'mdi:lock-open-variant-outline'
                    defaultCardConfig.tap_action = {
                        action: 'call-service',
                        service: 'lock.lock',
                        service_data: {
                            entity_id: this.entity.entity_id
                        }
                    }
                }

            }
            else if (entityType === 'media_player') {
                defaultCardConfig.tap_action = {
                    action: 'more-info'
                }
                defaultIconAttr.icon = this.entity.state === 'playing' || this.entity.state === 'paused' || this.entity.state === 'idle' ? 'mdi:speaker' : 'mdi:speaker-off'
                defaultSliderConfig.vertical = true
            }
        }
        else {
            defaultSliderConfig.show = false
        }


        const merged = deepMerge(defaultCardConfig, this._config)
        this._config = merged !== undefined ? merged : this._config

        this._config.icon = typeof this._config.icon === 'string' ? { ...defaultIconAttr, icon: this._config.icon } : typeof this._config!.icon === 'object' ? deepMerge(defaultIconAttr, this._config.icon) : defaultIconAttr
        this._config.label = typeof this._config!.label === 'string' ? { ...defaultLabelAttr, text: this._config!.label } : typeof this._config!.label === 'object' ? deepMerge(defaultLabelAttr, this._config!.label) : defaultLabelAttr
        this._config.stats = typeof this._config!.stats === 'string' ? { ...defaultStatsAttr, text: this._config!.stats } : typeof this._config!.stats === 'object' ? deepMerge(defaultStatsAttr, this._config!.stats) : defaultStatsAttr
        this._config.buttons = typeof this._config!.buttons === 'object' ? deepMerge(defaultButtonsAttr, this._config!.buttons) : defaultButtonsAttr
        this._config.slider = this._config!.slider ? deepMerge(defaultSliderConfig, this._config!.slider) : defaultSliderConfig // deepMerge(this._config.slider, defaultSliderConfig)
        if (this._config.styles === undefined || this._config.styles === null) {
            this._config.styles = {}
        }
        this.initializeStyles()

        return null // Success in this case
    }

    private initializeStyles(): any {
        if (!this._config) return
        const entityType = this._config.entity ? this._config.entity?.split('.')[0] : 'none'
        const verticalSlider = entityType === 'cover' ? true : false
        const flippedSlider = entityType === 'cover' ? true : false

        const defaultCardStyle: any = {}
        const defaultButtonsContainerStyle: any = {}
        const defaultIconStyle: any = {
            filter: 'drop-shadow(3px 3px 2px rgba(0,0,0,0.3)'
        }

        // Here we merge default styles with styles given in root styles object
        const defaultSliderStyle: any = {
            card: getStyle('sliderCard', deflate(this._config.styles?.sliderCard) ? deflate(this._config.styles?.sliderCard) : {}),
            container: getStyle('sliderContainer', deflate(this._config.styles?.sliderContainer) ? deflate(this._config.styles?.sliderContainer) : {}),
            track: getStyle('sliderTrack', deflate(this._config.styles?.sliderTrack) ? deflate(this._config.styles?.sliderTrack) : {}),
            progress: verticalSlider ? getStyle('sliderProgressVer', deflate(this._config.styles?.sliderProgressVer) ? deflate(this._config.styles?.sliderProgressVer) : {}) :
                getStyle('sliderProgressHor', deflate(this._config.styles?.sliderProgressHor) ? deflate(this._config.styles?.sliderProgressHor) : {}),
            thumb: verticalSlider ? getStyle('sliderThumbVer', deflate(this._config.styles?.sliderThumbVer) ? deflate(this._config.styles?.sliderThumbVer) : {}) :
                getStyle('sliderThumbHor', deflate(this._config.styles?.sliderThumbHor) ? deflate(this._config.styles?.sliderThumbHor) : {}),
        }
        const defaultStatsStyle: any = {
            container: getStyle('stats', deflate(this._config.styles?.stats) ? deflate(this._config.styles?.stats) : {}),
            camera: getStyle('camera', deflate(this._config.styles?.camera) ? deflate(this._config.styles?.camera) : {}),
        }
        const defaultLabelStyle: any = {
            container: getStyle('labelContainer', deflate(this._config.styles?.labelContainer) ? deflate(this._config.styles?.labelContainer) : {}),
            label: getStyle('label', deflate(this._config.styles?.label) ? deflate(this._config.styles?.label) : {}),
            extraText: getStyle('extraText', deflate(this._config.styles?.extraText) ? deflate(this._config.styles?.extraText) : {}),
        }
        const defaultButtonsStyle: any = {
            container: getStyle('buttonsContainer', deflate(this._config.styles?.buttonsContainer) ? deflate(this._config.styles?.buttonsContainer) : {}),
            button: getStyle('button', deflate(this._config.styles?.button) ? deflate(this._config.styles?.button) : {}),
            text: getStyle('buttonText', deflate(this._config.styles?.buttonText) ? deflate(this._config.styles?.buttonText) : {}),
            icon: getStyle('buttonIcon', deflate(this._config.styles?.buttonIcon) ? deflate(this._config.styles?.buttonIcon) : {})
        }

        if (this._config.buttons.vertical) {
            defaultButtonsStyle.container['flex-direction'] = 'column'
            defaultButtonsContainerStyle['padding'] = '10px 5px 10px 0px'
        }

        Object.keys(this._config.buttons)
            .filter(key => key.startsWith('button'))
            .map(key => {
                if (this._config.buttons[key].styles) {
                    if (this._config.buttons[key].styles.container) {
                        this._config.buttons[key].styles.container = deepMerge(defaultButtonsStyle.button, this._config.buttons[key].styles.container ? deflate(this._config.buttons[key].styles.container) : {})
                    }
                    else {
                        this._config.buttons[key].styles.container = deepMerge(defaultButtonsStyle.button, this._config.buttons.styles.button ? deflate(this._config.buttons.styles.button) : {})
                    }
                    if (this._config.buttons[key].styles.text) {
                        this._config.buttons[key].styles.text = deepMerge(defaultButtonsStyle.text, this._config.buttons[key].styles.text ? deflate(this._config.buttons[key].styles.text) : {})
                    }
                    else {
                        this._config.buttons[key].styles.text = deepMerge(defaultButtonsStyle.text, this._config.buttons.styles.text ? deflate(this._config.buttons.styles.text) : {})
                    }
                    if (this._config.buttons[key].styles.icon) {
                        this._config.buttons[key].styles.icon = deepMerge(defaultButtonsStyle.text, this._config.buttons[key].styles.text ? deflate(this._config.buttons[key].styles.text) : {})
                    }
                    else {
                        this._config.buttons[key].styles.icon = deepMerge(defaultButtonsStyle.icon, this._config.buttons.styles.icon ? deflate(this._config.buttons.styles.icon) : {})
                    }
                }
                else {
                    this._config.buttons[key].styles = {
                        container: deepMerge(defaultButtonsStyle.button, this._config.buttons.styles.button ? deflate(this._config.buttons.styles.button) : {}),
                        text: deepMerge(defaultButtonsStyle.text, this._config.buttons.styles.text ? deflate(this._config.buttons.styles.text) : {}),
                        icon: deepMerge(defaultButtonsStyle.icon, this._config.buttons.styles.icon ? deflate(this._config.buttons.styles.icon) : {}),
                    }
                }
                return null
            })

        // Here we set the default styles for the card based on entity type and state
        if (entityType !== 'none') {
            if (this.entity.state === 'on') {
                defaultIconStyle.color = 'var(--paper-item-icon-active-color)'
                defaultIconStyle.filter = 'drop-shadow(2px 2px 2px rgba(0,0,0,0.75)'
            }

            if (entityType === 'light') {

                if (this.entity.attributes.brightness) {
                    let divisor = 1 + (this.entity.attributes.brightness / 256);
                    const cardBg = `radial-gradient(circle at top left, rgba(230, 230, 230, 0.7), var(--card-background-color) ${Math.ceil(percentage(this.entity.attributes.brightness, 256)) / divisor + '%'})`
                    defaultCardStyle['background'] = cardBg
                }
                else {
                    defaultCardStyle['background'] = `radial-gradient(circle at top left, rgba(230, 230, 230, 0.5), var(--card-background-color) 40%)`
                }
            }
            else if (entityType === 'switch') {
                const cardBg = this.entity.state === 'on' ?
                    `radial-gradient(circle at top left, rgba(230, 230, 230, 0.7), var(--card-background-color) 50%)` :
                    `radial-gradient(circle at top left, rgba(230, 230, 230, 0.5), var(--card-background-color) 40%)`
                defaultCardStyle['background'] = cardBg
            }
            else if (entityType === 'lock') {
                if (this.entity.state === 'locked') {
                    // defaultIconStyle.color = 'green'
                }
                else if (this.entity.state === 'unlocked') {
                    defaultIconStyle.color = 'var(--paper-item-icon-active-color)'
                }
            }

        }





        // Here we deep merge the default styles with the styles given in the specific element configs
        const sliderStyle = this._config.slider?.styles ? deepMerge(defaultSliderStyle, this._config.slider.styles) : defaultSliderStyle
        const statsStyle = this._config.stats?.styles ? deepMerge(defaultStatsStyle, this._config.stats.styles) : defaultStatsStyle
        const labelStyle = this._config.label?.styles ? deepMerge(defaultLabelStyle, this._config.label.styles) : defaultLabelStyle
        const buttonsStyle = this._config.buttons?.styles ? deepMerge(defaultButtonsStyle, this._config.buttons.styles) : defaultButtonsStyle

        const cardStyle = this._config.styles?.card ? { ...defaultCardStyle, ...this._config.styles.card } : defaultCardStyle
        const iconStyle = this._config.styles?.icon ? { ...defaultIconStyle, ...this._config.styles.icon } : defaultIconStyle
        this._config.styles.card = getStyle('card', deflate(cardStyle))
        this._config.styles.icon = getStyle('icon', deflate(iconStyle))
        this._config.styles.row1 = getStyle('row1', deflate(this._config.styles?.row1) ? deflate(this._config.styles?.row1) : {})
        this._config.styles.row2 = getStyle('row2', deflate(this._config.styles?.row2) ? deflate(this._config.styles?.row2) : {})
        this._config.styles.button = getStyle('button', deflate(this._config.styles?.button) ? deflate(this._config.styles?.button) : {})
        
        this._config.slider.styles = sliderStyle
        this._config.stats.styles = statsStyle
        this._config.label.styles = labelStyle
        this._config.buttons.styles = buttonsStyle
    }

    // ------------------- ACTION HANDLER FUNC ------------------- //
    private _handleAction(ev: any, actionConfig: any): void {
        
        if (!actionConfig.entity) {
            actionConfig.entity = this._config!.entity
        }
        if (ev.detail?.action) {
            switch (ev.detail.action) {
                case 'tap':
                case 'hold':
                case 'double_tap':
                    const config = this._config;
                    if (!config) return;
                    const action = ev.detail.action;
                    const localAction = evalActions(this, config, `${action}_action`);
                    // @ts-ignore
                    handleAction(this, this.hass!, localAction, action);
                    break;
                default:
                    break;
            }
        }
    }

    // https://lit-element.polymer-project.org/guide/styles
    static get styles(): CSSResult { return css``; }
}