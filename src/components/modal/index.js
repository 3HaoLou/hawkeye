import JModal from './src/modal.vue';

JModal.install = function(Vue) {
    Vue.component(JModal.name, JModal);
};

export default JModal;