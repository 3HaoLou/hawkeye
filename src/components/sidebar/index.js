import JSidebar from './src/sidebar.vue';

JSidebar.install = function(Vue) {
    Vue.component(JSidebar.name, JSidebar);
};

export default JSidebar;