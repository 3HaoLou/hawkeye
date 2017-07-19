import JAccordion from './src/accordion.vue';

JAccordion.install = function(Vue) {
    Vue.component(JAccordion.name, JAccordion);
};

export default JAccordion;