/* eslint-disable */
import Vue from 'vue';
import VueRouter from 'vue-router';
import $ from 'jquery';
import './assets/semantic-ui-css/semantic.min.js';
import './assets/semantic-ui-css/semantic.min.css';

import './assets/css/style.css';

import App from './App.vue';
import Routes from './route.js';
import store from './store';

Vue.use(VueRouter);

const router = new VueRouter(Routes);

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});