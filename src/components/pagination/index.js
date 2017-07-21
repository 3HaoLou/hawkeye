import JPagination from './src/pagination.vue';

JPagination.install = function(Vue) {
    Vue.component(JPagination.name, JPagination);
};

export default JPagination;