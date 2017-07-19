import JDropdownItem from './src/dropdown-item.vue';

JDropdownItem.install = function(Vue) {
    Vue.component(JDropdownItem.name, JDropdownItem);
};

export default JDropdownItem;