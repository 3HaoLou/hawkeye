import StorageService from './storage';
import CONFIG from '../constants/config';

export default {
    setUserInfo: setUserInfo,
    getUserInfo: getUserInfo,
    removeUserInfo: removeUserInfo,
    setNavMenu: setNavMenu,
    getNavMenu: getNavMenu,
    removeNavMenu: removeNavMenu,
    setLoginMobile: setLoginMobile,
    getLoginMobile: getLoginMobile,
    removeLoginMobile: removeLoginMobile,
    setConstructionOrderList: setConstructionOrderList,
    getConstructionOrderList: getConstructionOrderList,
    removeConstructionOrderList: removeConstructionOrderList,
    setConstructionInspectionList: setConstructionInspectionList,
    getConstructionInspectionList: getConstructionInspectionList,
    removeConstructionInspectionList: removeConstructionInspectionList,
    setConstructionProblemList: setConstructionProblemList,
    getConstructionProblemList: getConstructionProblemList,
    removeConstructionProblemList: removeConstructionProblemList,
}

function setUserInfo(value) {
    StorageService.setLocalStorage(CONFIG.STORAGE_KEY.USER_INFO, value, true);
}

function getUserInfo() {
    return StorageService.getLocalStorage(CONFIG.STORAGE_KEY.USER_INFO, true);
}

function removeUserInfo() {
    StorageService.removeLocalStorage(CONFIG.STORAGE_KEY.USER_INFO);
}

function setNavMenu(value) {
    StorageService.setSessionStorage(CONFIG.STORAGE_KEY.NAV_LIST, value, true);
}

function getNavMenu() {
    return StorageService.getSessionStorage(CONFIG.STORAGE_KEY.NAV_LIST, true);
}

function removeNavMenu() {
    StorageService.removeSessionStorage(CONFIG.STORAGE_KEY.NAV_LIST);
}

function setLoginMobile(value) {
    StorageService.setLocalStorage(CONFIG.STORAGE_KEY.LOGIN_MOBILE, value);
}

function getLoginMobile() {
    return StorageService.getLocalStorage(CONFIG.STORAGE_KEY.LOGIN_MOBILE);
}

function removeLoginMobile() {
    StorageService.removeLocalStorage(CONFIG.STORAGE_KEY.LOGIN_MOBILE);
}

function setConstructionOrderList(value) {
    StorageService.setSessionStorage(CONFIG.STORAGE_KEY.CONSTRUCT_ORDER_LIST, value, true);
}

function getConstructionOrderList() {
    return StorageService.getSessionStorage(CONFIG.STORAGE_KEY.CONSTRUCT_ORDER_LIST, true);
}

function removeConstructionOrderList() {
    StorageService.removeSessionStorage(CONFIG.STORAGE_KEY.CONSTRUCT_ORDER_LIST);
}

function setConstructionInspectionList(value) {
    console.log(value);
    StorageService.setSessionStorage(CONFIG.STORAGE_KEY.CONSTRUCT_INSPECTION_LIST, value, true);
}

function getConstructionInspectionList() {
    return StorageService.getSessionStorage(CONFIG.STORAGE_KEY.CONSTRUCT_INSPECTION_LIST, true);
}

function removeConstructionInspectionList() {
    StorageService.removeSessionStorage(CONFIG.STORAGE_KEY.CONSTRUCT_INSPECTION_LIST);
}

function setConstructionProblemList(value) {
    StorageService.setSessionStorage(CONFIG.STORAGE_KEY.CONSTRUCT_PROBLEM_LIST, value, true);
}

function getConstructionProblemList() {
    return StorageService.getSessionStorage(CONFIG.STORAGE_KEY.CONSTRUCT_PROBLEM_LIST, true);
}

function removeConstructionProblemList() {
    StorageService.removeSessionStorage(CONFIG.STORAGE_KEY.CONSTRUCT_PROBLEM_LIST);
}
