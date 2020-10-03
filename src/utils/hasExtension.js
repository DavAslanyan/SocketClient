import {ACCEPT_TYPES} from "../constants/acceptedConsts";

export const hasExtension = fileName => {
    const pattern = '(' + ACCEPT_TYPES.join('|').replace(/\./g, '\\.') + ')$';
    return new RegExp(pattern, 'i').test(fileName);
};