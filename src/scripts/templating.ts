import { HassEntity } from 'home-assistant-js-websocket'
import { html } from 'lit-element'

import type { MyCardConfig } from '../types/types'

export const evalActions = (that:any, config: MyCardConfig, action: string): MyCardConfig => {
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
                configEval[key] = getTemplateOrValue(that, that.entity, configEval[key]);
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


export const objectEvalTemplate = (that:any, state: HassEntity | undefined, obj: any | undefined): any => {
    const objClone = JSON.parse(JSON.stringify(obj))
    return getTemplateOrValue(that, state, objClone);
}

export const getTemplateOrValue = (that:any, state: HassEntity | undefined, value: any | undefined): any | undefined => {
    if (['number', 'boolean'].includes(typeof value)) return value;
    if (!value) return value;
    if (typeof value === 'object') {
        Object.keys(value).forEach((key) => {
            value[key] = getTemplateOrValue(that, state, value[key]);
        });
        return value;
    }
    const trimmed = value.trim();
    if (trimmed.substring(0, 3) === '[[[' && trimmed.slice(-3) === ']]]') {
        const tmp = evalTemplate(that ,state, trimmed.slice(3, -3))
        return tmp
    } else {
        return value
    }
}

export const evalTemplate = (that:any, state: HassEntity | undefined, func: any): any => {
    try {
        return new Function('states', 'entity', 'user', 'hass', 'html', `'use strict'; ${func}`).call(
            that,
            that.hass!.states,
            state,
            that.hass!.user,
            that.hass,
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