<template>
    <div class="pagination-content w-full p-m" layout="row" layout-align="space-between center">
        <!-- <slot name="pageSize"></slot> -->
        <j-select v-model="selectedPageSize" :options="pageSizeOptions"></j-select>
        <div class="ui pagination menu">
            <a class="item" :class="{'disabled': currentPage <= 1}" :disabled="currentPage <= 1" @click="first()">
                &#60;&#60;
            </a>
            <a class="item" :class="{'disabled': currentPage <= 1}" :disabled="currentPage <= 1" @click="previous()">
                &#60;
            </a>
            <a class="item active">
                当前页数：{{currentPage}}
            </a>
            <a class="item" :class="{'disabled': currentPage >= totalPage}" :disabled="currentPage >= totalPage" @click="next()">
                &#62;
            </a>
            <a class="item" :class="{'disabled': currentPage >= totalPage}" :disabled="currentPage >= totalPage" @click="last()">
                &#62;&#62;
            </a>
        </div>
    </div>
</template>
<script>
    import JSelect from '../../select/index';
    import { getInteger } from '../../../assets/js/utils/util';

    export default {
        name: 'j-pagination',
        components: {
            JSelect
        },
        props: {
            currentPage: Number,
            total: Number
        },
        data () {
            return {
                selectedPageSize: { name: '每页显示20条', value: 20 },
                pageSizeOptions: [
                    { name: '每页显示20条', value: 20 },
                    { name: '每页显示30条', value: 30 },
                    { name: '每页显示50条', value: 50 },
                    { name: '每页显示100条', value: 100 },
                ],
                // totalPage: 0
            }
        },
        watch: {
            'selectedPageSize' (value) {
                if (value) {
                    this.onChange(value);
                }
            }
        },
        computed: {
            totalPage () {
                return this.calculateTotalPage();
            }
        },
        mounted () {
            this.calculateTotalPage();
        },
        methods: {
            calculateTotalPage () {
                if (this.total) {
//                    return (this.total % this.selectedPageSize.value ) > 0 ? Math.round(this.total / this.selectedPageSize.value) + 1 : this.total / this.selectedPageSize.value;
                    console.log(getInteger(this.total / this.selectedPageSize.value));
                    return getInteger(this.total / this.selectedPageSize.value);
                } else {
                    return 0;
                }
            },
            onChange (value) {
                this.$emit('page-size-changed', value);
            },
            first () {
                if (this.currentPage > 1) {
                    this.$emit('first');
                }
            },
            previous () {
                if (this.currentPage > 1) {
                    this.$emit('previous');
                }
            },
            next () {
                if (this.currentPage < this.totalPage) {
                    this.$emit('next');
                }
            },
            last () {
                if (this.currentPage < this.totalPage) {
                    this.$emit('last');
                }
            },
        }
    }
</script>
