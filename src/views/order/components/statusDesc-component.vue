<template>
    <div :style="gridHeaderStyle" layout="row" layout-align="center center">
        <div class="customHeaderLabel" :style="[ statusStyle, bgColor ]">{{params.data.statusDesc}}</div>
    </div>
</template>
<script>
    import Vue from 'vue';
    import CONFIG from '../../../assets/js/constants/config';

    export default Vue.extend({
        data () {
            return {
                gridHeaderStyle: {
                    lineHeight: '40px',
                    height: '40px'
                },
                statusStyle: {
                    height: '24px',
                    lineHeight: '24px',
                    padding: '0 8px',
                    borderRadius: '6px',
                    color: '#fff'
                },
                bgColor: {},
                menuIcon: '',
                sort: '',
                sortDesc: '',
            }
        },
        mounted () {
            this.bgColor = { backgroundColor: CONFIG.ORDER_STATUS_COLOR[this.params.data.statusDesc] };
        },
        methods: {
            onSortRequested () {

            }
        }
    })
</script>