import { LovelaceCard, LovelaceCardConfig, LovelaceCardEditor } from 'custom-card-helpers';

declare global {
  interface HTMLElementTagNameMap {
    'my-footer-card-editor': LovelaceCardEditor;
    'hui-error-card': LovelaceCard;
  }
}

export interface MySliderCardConfig extends LovelaceCardConfig {
  type: string;
  entity: string;
}

export interface MyButtonCardConfig extends LovelaceCardConfig {
    type: string;
    entity: string;
}
export interface MyButtonCoverCardConfig extends LovelaceCardConfig {
    type: string;
    entity: string;
}