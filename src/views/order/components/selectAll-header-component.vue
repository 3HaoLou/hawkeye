<template>
    <div :style="gridHeaderStyle" layout="row" layout-align="center center" @click="onSortRequested($event)">
        <j-checkbox v-model="selectAll" :label="''"></j-checkbox>
    </div>
</template>
<script>
    import Vue from 'vue';
    import Vuex from 'vuex';
    import store from '../../../store';
    import JCheckbox from '../../../components/checkbox/index';

    // console.log(store);

    // Vue.prototype.$store = store;

    export default Vue.extend({
        components: {
            JCheckbox
        },
        data () {
            return {
                gridHeaderStyle: {
                    lineHeight: '40px',
                    height: '40px'
                },
                menuIcon: '',
                sort: '',
                sortDesc: '',
                selectAll: false,
            }
        },
        watch: {
            'params' (value) {
                console.log(value);
            }
        },
        mounted () {
            // console.log(this.params);  

            console.log(store);
        },
        methods: {
            onSortRequested ($event) {
                console.log(this.selectAll, this.params);

                store.dispatch('selectAllOrderList', this.selectAll);

                this.params.api.refreshView();


            }
        }
    })
</script>