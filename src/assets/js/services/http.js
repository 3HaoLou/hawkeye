import Axios from 'axios';
import * as CryptoJS from 'crypto-js';
import _ from 'lodash';
import AccountService from './account';
import { isDefined } from '../utils/util';
import NotificationService from './notification';
import CONFIG from '../constants/config';

export default {
    request: request,
    response: response,
    get: get,
    post: post,
    put: put,
    remove: remove,
    other: other
}

/**
 * 判断请求必要参数
 * @param {string} method
 * @param {string} url
 * @param {object} params
 * @param {object} headers
 */
let option = function(method, url, params, headers) {
    if (!method || !url) {
        console.error('missing request method or url!');
        return;
    }

    return encrypt(method, url, params, headers);
}

/**
 * 发送异步请求
 * @param {option} option
 */
let defer = function(option) {
    return new Promise((resolve, reject) => {
        Axios(option).then((response) => {
                if (response.data.error) {
                    console.log('error');
                    reject(handleError(response.data));
                } else {
                    console.log('success');
                    resolve(response.data);
                }
            })
            .catch((error) => {
                reject(handleError(error.data));
            })
    })
};

function request() {
    Axios.interceptors.request.use((config) => {
        console.info('request config:');
        console.info(config);

        return config;
    }, (error) => {
        console.info('request error:');
        console.info(error);

        return Promise.reject(error);
    })
}

function response() {
    Axios.interceptors.response.use((response) => {
        console.info('response data:');
        console.info(response);

        return response;
    }, (error) => {
        console.info('response error:');
        console.info(error);

        return Promise.reject(error);
    })
}

/**
 * get请求
 * @param {string} url
 * @param {object} params
 * @param {object} headers
 */
function get(url, params, headers) {
    return defer(option('get', url, params, headers));
}

/**
 * post请求
 * @param {string} url
 * @param {object} params
 * @param {object} headers
 */
function post(url, params, headers) {
    return defer(option('post', url, params, headers));
}

/**
 * put请求
 * @param {string} url
 * @param {object} params
 * @param {object} headers
 */
function put(url, params, headers) {
    return defer(option('put', url, params, headers));
}

/**
 * remove请求
 * @param {string} url
 * @param {object} params
 * @param {object} headers
 */
function remove(url, params, headers) {
    return defer(option('delete', url, params, headers));
}

/**
 * 自定义请求
 * @param {string} url
 * @param {object} params
 * @param {object} headers
 */
function other(method, url, params, headers) {
    return defer(option(method, url, params, headers));
}

/**
 * 请求过程加密
 * @param {string} method
 * @param {string} url
 * @param {object} params
 * @param {object} headers
 */
function encrypt(method, url, params, headers) {
    let userInfo = AccountService.getUserInfo();
    let time = new Date().getTime();

    let option = {
        method: method,
        url: CONFIG.BASE_HOST + url,
        headers: headers ? headers : {}
    };

    if (params) {
        option.params = params;
    }

    if (userInfo) {
        let token = userInfo.token;
        let _params = [];

        let str = method.toUpperCase() + '\n' +
            option.url + '\n' +
            token + '\n' +
            'x-sanhaolou-uid:' + userInfo.uid + '\n' +
            'x-sanhaolou-time:' + time + '\n' +
            'x-sanhaolou-terminal:' + CONFIG.TERMINAL + '\n' +
            'x-sanhaolou-version:' + CONFIG.VERSION + '\n';

        if (isDefined(params)) {
            _.forEach(params, (value, key) => {
                if (value instanceof Array) {
                    _.forEach(value, (item) => {
                        _params.push(key + '=' + encodeURIComponent(item));
                    });
                } else if (value) {
                    _params.push(key + '=' + encodeURIComponent(value));
                }
            });

            console.info('request query:');
            console.info(_params);
        }

        if (_params.length > 0) {
            str += _params.sort().join('&');
        }

        str += '\n';
        str = str.replace(/[~!'()]/g, escape);

        console.info('request params:');
        console.info(str);

        let signature;

        try {
            signature = encodeURIComponent(CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1(str, userInfo.secret)));
        } catch (error) {
            console.error('signature fail:', error);
        }

        console.info('request signature:');
        console.info(signature);

        option.headers['Authorization'] = 'Basic ' + token + ':' + signature;
        option.headers['x-sanhaolou-uid'] = userInfo.uid;
        option.headers['x-sanhaolou-time'] = time;
    }

    option.headers['x-sanhaolou-terminal'] = CONFIG.TERMINAL;
    option.headers['x-sanhaolou-version'] = CONFIG.VERSION;

    console.info('request option:');
    console.info(option);

    let origin = window.location.origin;

    console.info('request origin:');
    console.info(window.location.origin);

    if (origin.indexOf(CONFIG.DEBUG_DOMAIN) > -1) {
        option.url = CONFIG.DEBUG_HOST + option.url;
    } else if (origin.indexOf(CONFIG.RELEASE_DOMAIN) > -1) {
        option.url = CONFIG.RELEASE_HOST + option.url;
    }

    console.info('request send url:');
    console.info(option.url);

    return option;
}

/**
 * 处理请求错误
 * @param {object} error
 */
function handleError(error) {
    if (error && error.error && error.error_text) {
        NotificationService.open('negative', error.error_text);

        if (error.error === 10103) {
            window.location.href = '/#/login';
        }
    }

    return error;
}
