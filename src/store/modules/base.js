import _ from 'lodash';
import * as types from '../mutation-types';
import AccountService from '../../assets/js/services/account';
import { Init } from '../../assets/js/api/base';

const state = {
    loadingStatus: false,
    userInfo: null,
    sideMenu: null
};

const getters = {
    loadingStatus: state => {
        return state.loadingStatus;
    },
    userInfo: state => {
        return state.userInfo;
    },
    sideMenu: state => {
        return state.sideMenu;
    }
};

const mutations = {
    [types.LOADING_STATUS](state, flag) {
        state.loadingStatus = flag;
    },
    [types.USER_INFO](state, userInfo) {
        state.userInfo = userInfo;
    },
    [types.SIDE_MENU](state, sideMenu) {
        state.sideMenu = sideMenu;
    }
};

const actions = {
    showLoading({ commit }) {
        commit(types.LOADING_STATUS, true);
    },
    hideLoading({ commit }) {
        commit(types.LOADING_STATUS, false);
    },
    userInfo({ commit }, userInfo) {
        if (userInfo) {
            AccountService.setUserInfo(userInfo);

            commit(types.USER_INFO, userInfo);
        } else {
            let _userInfo = AccountService.getUserInfo();

            if (_userInfo) {
                commit(types.USER_INFO, _userInfo);
            } else {
                commit(types.USER_INFO, null);
            }
        }
    },
    sideMenu({ commit }) {
        let userInfo = AccountService.getUserInfo();

        if (!userInfo) {
            commit(types.SIDE_MENU, null);
        } else {
            let sideMenu = AccountService.getNavMenu() || null;

            if (!sideMenu) {
                Init().then((data) => {
                    _.forEach(data.parentMenus, (value) => {
                        // value.checked = false;

                        _.forEach(data.childMenus, (child, key) => {
                            if (value.moduleCode === key) {
                                value.childMenus = child;
                            }
                        })
                    })

                    sideMenu = data.parentMenus;

                    AccountService.setNavMenu(sideMenu);

                    commit(types.SIDE_MENU, sideMenu);
                })
            } else {
                commit(types.SIDE_MENU, sideMenu);
            }
        }
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};