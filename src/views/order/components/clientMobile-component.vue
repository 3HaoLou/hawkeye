<template>
    <div :style="gridHeaderStyle" layout="row" layout-align="center center" @click="onSortRequested($event)">
        <div class="customHeaderLabel">{{params.displayName}}</div>
        <div layout="column" layout-align="center center">
            <div v-if="params.enableSorting" class="customSortUpLabel"><i class="sort icon" :class="[ sortDesc ]"></i></div>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue';

    export default Vue.extend({
        data () {
            return {
                gridHeaderStyle: {
                    lineHeight: '40px',
                    height: '40px'
                },
                menuIcon: '',
                sort: '',
                sortDesc: '',
            }
        },
        mounted () {
            console.log(this.params);  

            this.params.column.addEventListener('sortChanged', this.onSortChanged);
        },
        methods: {
            onSortChanged () {

            },
            onSortRequested () {
                console.log(this.sortDesc);
                
                if (!this.sortDesc) {
                    this.sortDesc = 'ascending';
                } else if (this.sortDesc === 'ascending') {
                    this.sortDesc = 'descending';
                } else if (this.sortDesc === 'descending') {
                    this.sortDesc = '';
                }
            }
        }
    })
</script>