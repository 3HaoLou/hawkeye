import JHeader from './src/header.vue';

JHeader.install = function(Vue) {
    Vue.component(JHeader.name, JHeader);
};

export default JHeader;