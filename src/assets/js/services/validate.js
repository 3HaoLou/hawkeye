import REGEX from '../constants/regex';

export function ValidateMobile(mobile) {
    let result = 0;

    if (!mobile) {
        result = -1;
    } else if (!REGEX.MOBILE.test(mobile)) {
        result = -2;
    } else {
        result = 1;
    }

    return result;
}

export function ValidateVcode(vcode) {
    let result = 0;

    if (!vcode) {
        result = -1;
    } else if (!REGEX.VCODE.test(vcode)) {
        result = -2;
    } else {
        result = 1;
    }

    return result;
}