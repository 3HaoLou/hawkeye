<template>
    <div :style="gridHeaderStyle" layout="row" layout-align="center center" @click="onSortRequested($event)">
        <j-checkbox v-model="select" :label="''"></j-checkbox>
    </div>
</template>
<script>
    import Vue from 'vue';
    import JCheckbox from '../../../components/checkbox/index';

    export default Vue.extend({
        components: {
            JCheckbox
        },
        data () {
            return {
                gridHeaderStyle: {
                    lineHeight: '40px',
                    height: '40px',
                    marginTop: '-16px'
                },
                menuIcon: '',
                sort: '',
                sortDesc: '',
                select: false,
            }
        },
        mounted () {
            console.log(this.params);  
        },
        methods: {
            onSortRequested ($event) {
                console.log(this.select, this.params);
            }
        }
    })
</script>