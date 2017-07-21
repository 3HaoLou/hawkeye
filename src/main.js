/* eslint-disable */
import Vue from 'vue';
import VueRouter from 'vue-router';
import $ from 'jquery';
import './assets/semantic-ui-css/semantic.min.js';
import './assets/semantic-ui-css/semantic.min.css';
import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/theme-material.css';
// import VuePreview from 'vue-preview';
import { LicenseManager } from 'ag-grid-enterprise/main';


import './assets/css/style.css';

import App from './App.vue';
import Routes from './route.js';
import store from './store';

LicenseManager.setLicenseKey('ag-Grid_Evaluation_License_Not_for_Production_100Devs15_August_2017__MTUwMjc1MTYwMDAwMA==bbecf011e81f3555180e8f75f2bdabb4');

Vue.use(VueRouter);

const router = new VueRouter(Routes);

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});