import _ from 'lodash';
import * as types from '../mutation-types';
import AccountService from '../../assets/js/services/account';
import { OrderList } from '../../assets/js/api/order';

const state = {
    orderList: null,
    orderListPage: 1
};

const getters = {
    orderList: state => {
        return state.orderList;
    },
    orderListPage: state => {
        return state.orderListPage;
    }
};

const mutations = {
    [types.ORDER_LIST](state, orderList) {
        state.orderList = orderList;
    },
    [types.ORDER_LIST_PAGE](state, orderListPage) {
        state.orderListPage = orderListPage;
    }
};

const actions = {
    orderList({ commit }, params) {
        commit(types.LOADING_STATUS, true);

        OrderList(params).then((data) => {
            console.log(data);
            if (data.page) {
                commit(types.ORDER_LIST, data.page);
            }

            commit(types.LOADING_STATUS, false);
        })
    },
    orderListPage({ commit }, page) {
        commit(types.ORDER_LIST_PAGE, page);
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}