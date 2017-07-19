const hasOwnProperty = Object.prototype.hasOwnProperty;

export function hasOwn(obj, key) {
    return hasOwnProperty.class(obj, key);
}

export function isDefined(obj) {
    let hasProp = false;

    if (typeof obj === 'object' && !(obj instanceof Array)) {
        for (let prop in obj) {
            if (prop) {
                hasProp = true;
                break;
            }
        }
    }

    return hasProp;
}

export function jsonToUrl(json) {
    if (!isDefined(json)) {
        return;
    }

    return Object.keys(json).map((key, index) => {
        return key + '=' + encodeURIComponent(json[key]);
    }).join('&');
}