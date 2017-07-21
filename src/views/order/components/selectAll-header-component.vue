<template>
    <div :style="gridHeaderStyle" layout="row" layout-align="center center" @click="onSortRequested($event)">
        <j-checkbox v-model="selectAll" :label="''"></j-checkbox>
    </div>
</template>
<script>
    import Vue from 'vue';
    import Vuex from 'vuex';
    import { mapActions } from 'vuex';
    import JCheckbox from '../../../components/checkbox/index';

    Vue.use(Vuex);
    
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
        mounted () {
            // console.log(this.params);  
        },
        methods: {
            onSortRequested ($event) {
                console.log(this.selectAll, this.params);

                this.$store.dispatch('selectAllOrderList', this.selectAll);

                console.log(this.mapActions);
            }
        }
    })
</script>