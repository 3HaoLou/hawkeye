import Vue from 'vue';
import Vuex from 'vuex';
import base from './modules/base';
import order from './modules/order';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    modules: {
        base,
        order,
        // plan
    },
    strict: debug
});