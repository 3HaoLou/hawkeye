import JLoading from './src/loading.vue';

JLoading.install = function(Vue) {
    Vue.component(JLoading.name, JLoading);
};

export default JLoading;