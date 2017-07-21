import JTable from './src/table.vue';

JTable.install = function(Vue) {
    Vue.component(JTable.name, JTable);
};

export default JTable;