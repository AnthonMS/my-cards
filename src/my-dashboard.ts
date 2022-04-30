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
import {
    HomeAssistant,
    hasConfigOrEntityChanged,
} from 'custom-card-helpers' // This is a community maintained npm module with common helper functions/types
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'

import type { MyDashboardCardConfig } from './types'
import { DASHBOARD_VERSION } from './const'
import { localize } from './localize/localize'

/* eslint no-console: 0 */
console.info(
    `%c  ---- MY-DASHBOARD ---- \n%c  ${localize('common.version')} ${DASHBOARD_VERSION}    `,
    'color: orange; font-weight: bold; background: black',
    'color: white; font-weight: bold; background: green',
);

// This puts your card into the UI card picker dialog
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
    type: 'my-dashboard',
    name: 'Dashboard Card',
    description: 'Custom Dashboard Card for Lovelace.',
})

// TODONE Name your custom element
@customElement('my-dashboard')
export class MyDashboard extends LitElement {

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

    @property({ attribute: false }) public hass!: HomeAssistant
    @internalProperty() private config!: MyDashboardCardConfig

    // https://lit-element.polymer-project.org/guide/properties#accessors-custom
    public setConfig(config: MyDashboardCardConfig): void {

        if (!config.entity) {
            // throw new Error("You need to define entity")
        }

        this.config = {
            name: 'MyDashboard',
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
        // -- Make copy of the config, this way we can add empty objects -- //
        var conf = JSON.parse(JSON.stringify(this.config))
		const styles = conf.styles ? conf.styles : {}
        // console.log('Styles:', styles)
        // const entityId = this.config.entity ? this.config.entity : "ERROR: NO ENTITY ID"
        // const entityName = this.config.entity?.split(".")[1]
        // const entity = this.hass.states[`${entityId}`]

        // console.log('Generate:', this._generateStyles(styles))
        let stylesCard = this._generateStyles(styles).card
        

        const toggleScroll = () => {
            this.config.disabled_scroll = !this.config.disabled_scroll
            if (this.config.disabled_scroll) {
                disableBodyScroll(window)
            } else {
                enableBodyScroll(window)
            }
        }

        return html`
            <ha-card class="my-dashboard-card" style=${stylesCard}>
                My Dashboard
            </ha-card>
        `
    }

    // private _handleAction(ev: ActionHandlerEvent): void {
    // 	if (this.hass && this.config && ev.detail.action) {
    // 		handleAction(this, this.hass, this.config, ev.detail.action)
    // 	}
    // }

    // private _setBrightness(_entity, _target, _minSet, _maxSet): void {

    //     this.hass.callService("homeassistant", "turn_on", {
    //         entity_id: _entity.entity_id,
    //         brightness: value * 2.56
    //     })

    //     _target.value = value
    // }

    
    private _generateStyles(styles: any): any {
		let stylesCard = styles.card ? { ...this.defaultCardStyles.card, ...styles.card } : this.defaultCardStyles

		// Function to convert Styling Object to Styling String
		const styleToString = (style: Object): String => {
            // console.log('Style to string:', style)
			return Object.keys(style).reduce((acc, key) => (
				acc + key.split(/(?=[A-Z])/).join('-').toLowerCase() + ':' + style[key] + ';'
			), '')
		}

        return {
            card: styleToString(stylesCard)
        }
    }

    private get defaultCardStyles(): any {
        return {
            card: {
                height: '100%',
                width: '100%',
                background: 'transparent',
                borderRadius: '0px',
                boxShadow: 'none',
                color: 'var(--primary-text-color)',
                display: 'block',
                transition: 'all 0.3s ease-out 0s',
                position: 'relative'
            }
        }
    }


    // https://lit-element.polymer-project.org/guide/styles
    static get styles(): CSSResult {
        return css`
            .my-dashboard-card {
            }
		`
    }
}
