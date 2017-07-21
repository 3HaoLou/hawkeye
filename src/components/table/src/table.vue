<template>
    <!-- <div class="module-table"  v-bind:style="gridSize"> -->
    <div class="module-table">
        <ag-grid-vue
            v-show="rowData"
            class="ag-material"
            style="width: 100%;height: 100%;"
            :gridOptions="gridOptions"
            :rowData="rowData"

            :headerHeight="40"
            :rowHeight="40"
            :enableColResize="true"
            :enableSorting="true"
            :sizeColumnsToFit="true"

            :cellClicked="onCellClicked"
            
            :gridReady="onReady">

            <!-- :headerCellRenderer="headerCellRenderer" -->

            <!-- :toolPanelSuppressRowGroups="true"
            :toolPanelSuppressValues="true"
            :toolPanelSuppressPivots="true"
            :toolPanelSuppressPivotMode="true" -->
            <!-- :suppressRowClickSelection="true" -->
        </ag-grid-vue>
    </div>
</template>
<script>
    import { AgGridVue } from 'ag-grid-vue';
    import { getGridLocaleText, getGridSize } from '../../../assets/js/utils/util';

    export default {
        name: 'j-table',
        props: {
            gridOptions: {
                type: Object,
                required: true
            },
            columnDefs: {
                type: Array,
                required: true
            },
            gridData: {
                type: Array,
                required: true
            },
            autoPagination: {
                type: Boolean,
                default: false
            },
            toggleToolPanel: Boolean
        },
        components: {
            AgGridVue,
        },
        data () {
            return {
                rowData: null
            }
        },
        watch: {
            'gridData' (value) {
                console.log(value);

                if (value) {
                    this.rowData = value;
                }
            },
            'toggleToolPanel' (value) {
                console.log(value);
                this.gridOptions.api.showToolPanel(value);
            }
        },
        computed: {
            gridSize () {
                return getGridSize();
            }
        },
        beforeMount () {
            if (this.autoPagination) {
                this.gridOptions.pagination = true;
                this.gridOptions.paginationAutoPageSize = true;
            }
        },
        mounted () {
            this.rowData = this.gridData;
        },
        methods: {
            onReady () {
                console.info('shl-table is ready!');
            },
            // headerCellRenderer (params) {
            //     params.eHeaderCell.style.lineHeight = '40px';
            //     params.eHeaderCell.style.fontWeight = 'bold';
            //     return params.value;
            // },
            onCellClicked (params) {
                this.$emit('on-cell-clicked', params)
            },
        }
    }
</script>
