import _ from 'lodash';
import * as types from '../mutation-types';
import AccountService from '../../assets/js/services/account';
import { OrderList } from '../../assets/js/api/order';

const state = {
    orderList: null
};

const getters = {
    orderList: state => {
        return state.orderList;
    }
};

const mutations = {
    [types.ORDER_LIST](state, orderList) {
        state.orderList = orderList;
    },
};

const actions = {
    orderList({ commit }, params) {
        OrderList(params).then((data) => {
            console.log(data);
            if (data.page) {
                commit(types.ORDER_LIST, data.page);
            }
        })
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}