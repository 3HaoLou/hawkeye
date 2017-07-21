<template>
    <div class="pagination-content w-full p-m" layout="row" layout-align="space-between center">
        <!-- <slot name="pageSize"></slot> -->
        <j-select v-model="selectedPageSize" :options="pageSizeOptions"></j-select>
        <div class="ui pagination menu">
            <a class="item" :class="{'disabled': this.currentPage <= 1}" :disabled="this.currentPage <= 1" @click="previous()">
                &#60;
            </a>
            <a class="item" :class="{'active': currentPage === 1}" @click="setPage(1)">
                1
            </a>
            <a class="item" :class="{'active': currentPage === 2}" v-if="totalPage >= 2" @click="setPage(2)">
                2
            </a>
            <a class="item" :class="{'active': currentPage === 3}" v-if="totalPage >= 3" @click="setPage(3)">
                3
            </a>
            <a class="item">
                ...
            </a>
            <a class="item" :class="{'active': currentPage === totalPage - 2}" v-if="totalPage >= 6" @click="setPage(totalPage - 2)">
                {{totalPage - 2}}
            </a>
            <a class="item" :class="{'active': currentPage === totalPage - 1}" v-if="totalPage >= 5" @click="setPage(totalPage - 1)">
                {{totalPage - 1}}
            </a>
            <a class="item" :class="{'active': currentPage === totalPage}" v-if="totalPage >= 4" @click="setPage(totalPage)">
                {{totalPage}}
            </a>
            <a class="item" :class="{'disabled': this.currentPage >= this.totalPage}" :disabled="this.currentPage >= this.totalPage" @click="next()">
                &#62;
            </a>
        </div>
    </div>
</template>
<script>
    import JSelect from '../../select/index';

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
                    return (this.total % this.selectedPageSize.value ) > 0 ? Math.round(this.total / this.selectedPageSize.value) + 1 : this.total / this.selectedPageSize.value;
                } else {
                    return 0;
                }
            },
            onChange (value) {
                this.$emit('page-size-changed', value);
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
            setPage (index) {
                this.$emit('set-page', index);
            }
        }
    }
</script>
