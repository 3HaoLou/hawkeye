import JMenu from './src/menu.vue';

JMenu.install = function(Vue) {
    Vue.component(JMenu.name, JMenu);
};

export default JMenu;