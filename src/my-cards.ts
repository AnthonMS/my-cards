// ---- This file is just to collect all future button & slider card in one file import and build. ---- //
// ---- This way, people also only need to install 1 custom card, but can use all of them. ---- //
// ---- It will be like a bundle of all my cards. I know this is not ideal for some people ---- //
// ---- But then they can manually install each indivdual card from dist directory ---//

import { CARD_VERSION } from './const';
import { localize } from './localize/localize';

console.info(
	`%c  ---- MY-CARDS ---- \n%c  ${localize('common.version')} ${CARD_VERSION}    `,
	'color: orange; font-weight: bold; background: black',
	'color: white; font-weight: bold; background: green',
);


export { MySlider } from './my-slider'

export { MyFooter } from './my-footer'

// export { MyDashboard } from './my-dashboard'

