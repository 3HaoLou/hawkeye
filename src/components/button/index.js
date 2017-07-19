import JButton from './src/button.vue';

JButton.install = function(Vue) {
    Vue.component(JButton.name, JButton);
};

export default JButton;