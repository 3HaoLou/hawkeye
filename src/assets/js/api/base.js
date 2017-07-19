import HttpService from '../services/http';
import URL from '../constants/url';

/**
 * 请求验证码
 * @param {string} mobile 
 */
export function Vcode(mobile) {
    let params = {
        mobile: mobile
    };

    return HttpService.get(URL.VCODE, params);
}

/**
 * 请求登录
 * @param {string} mobile 
 * @param {string} vcode 
 */
export function Login(mobile, vcode) {
    let params = {
        mobile: mobile,
        vcode: vcode
    };

    return HttpService.post(URL.LOGIN, params);
}

/**
 * 初始化用户数据
 */
export function Init() {
    return HttpService.post(URL.INIT);
}

export function Logout() {
    return HttpService.post(URL.LOGOUT);
}