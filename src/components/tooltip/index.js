import JTooltip from './src/tooltip.vue';

JTooltip.install = function(Vue) {
    Vue.component(JTooltip.name, JTooltip);
};

export default JTooltip;