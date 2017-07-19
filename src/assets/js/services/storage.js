export default {
    setLocalStorage: setLocalStorage,
    getLocalStorage: getLocalStorage,
    removeLocalStorage: removeLocalStorage,
    setSessionStorage: setSessionStorage,
    getSessionStorage: getSessionStorage,
    removeSessionStorage: removeSessionStorage,
}

/**
 * 保存到localStroage
 * @param {string} key
 * @param {any} value
 * @param {boolean} isStringify
 */
function setLocalStorage(key, value, isStringify) {
    //	判断浏览器是否支持localStorage
    if (!storageAvailable('localStorage')) {
        return;
    }

    //	key不能为null, undefined, 0, false
    if (!key) {
        return;
    }

    window.localStorage.setItem(key, isStringify ? JSON.stringify(value) : value);
}

/**
 * 从localStorage获取
 * @param {string}  key
 * @param {boolean} isParse
 * @return {object}
 */
function getLocalStorage(key, isParse) {
    //	判断浏览器是否支持localStorage
    if (!storageAvailable('localStorage')) {
        return;
    }

    //	key不能为null, undefined, 0, false
    if (!key) {
        return;
    }

    return isParse ? JSON.parse(window.localStorage.getItem(key)) : window.localStorage.getItem(key);
}

/**
 * 删除某一项localStorage
 * @param {string} key
 */
function removeLocalStorage(key) {
    //	判断浏览器是否支持localStorage
    if (!storageAvailable('localStorage')) {
        return;
    }

    //	key不能为null, undefined, 0, false
    if (!key) {
        return;
    }

    window.localStorage.removeItem(key);
}

/**
 * 保存到sessionStorage
 * @param {string} key
 * @param {any} value
 * @param {boolean} isStringify
 */
function setSessionStorage(key, value, isStringify) {
    //	判断浏览器是否支持sessionStorage
    if (!storageAvailable('sessionStorage')) {
        return;
    }

    //	key不能为null, undefined, 0, false
    if (!key) {
        return;
    }

    window.sessionStorage.setItem(key, isStringify ? JSON.stringify(value) : value);
}

/**
 * 从sessionStorage获取
 * @param {string} key
 * @param {boolean} isParse
 * @return {object}
 */
function getSessionStorage(key, isParse) {
    //	判断浏览器是否支持sessionStorage
    if (!storageAvailable('sessionStorage')) {
        return;
    }

    //	key不能为null, undefined, 0, false
    if (!key) {
        return;
    }

    return isParse ? JSON.parse(window.sessionStorage.getItem(key)) : window.sessionStorage.getItem(key);
}

/**
 * 删除某一项sessionStorage
 * @param  {string} key
 */
function removeSessionStorage(key) {
    //	判断浏览器是否支持sessionStorage
    if (!storageAvailable('sessionStorage')) {
        return;
    }

    //	key不能为null, undefined, 0, false
    if (!key) {
        return;
    }

    window.sessionStorage.removeItem(key);
}

/**
 * 测试浏览器是否支持localStorage和sessionStorage
 * @param {string} type
 */
function storageAvailable(type) {
    try {

        let storage = window[type],
            x = '__storage_test_';

        storage.setItem(x, x);
        storage.removeItem(x);
        return true;

    } catch (error) {
        console.error('不支持localStorage和sessionStorage');

        return false;
    }
}
