import JAutocomplete from './src/autocomplete.vue';

JAutocomplete.install = function(Vue) {
    Vue.component(JAutocomplete.name, JAutocomplete);
};

export default JAutocomplete;