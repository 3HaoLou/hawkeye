<template>
    <div>
        <j-module-header>
            <div slot="left">模块头-左</div>
            <div slot="center">模块头-中</div>
            <div slot="right">模块头-右</div>
        </j-module-header>
         <j-module-content v-if="orderList">
            <div class="w-full h-full" layout="column" layout-align="space-between">
                <div class="module-content-heahder w-full p-m" layout="row" layout-align="space-between center">
                    <div>当前显示1-{{orderList.pageNum}}, 共{{orderList.total}}</div>
                    <div class="ui left icon input">
                        <input type="text" placeholder="搜索...">
                        <i class="search icon"></i>
                    </div>
                </div> 
                <j-table :grid-options="gridOptions" :column-defs="columnDefs" :grid-data="orderList.result" @on-cell-clicked="onCellClicked"></j-table> 
                <j-pagination></j-pagination>
            </div> 
            <j-module-filter>
                <div v-show="!onCustomFilterToggle">
                    <j-accordion :title="'我的筛选'"></j-accordion>
                    <j-accordion :title="'公共筛选'">
                        <div class="ui small aligned selection list">
                            <div class="item filter-item" :class="{'filter-item-selected': selectedPublickFilter === item.name}" @click="selectPublic(item)" v-for="(item, index) in publicFilters" :key="index">
                                <div class="right floated content" v-if="selectedPublickFilter === item.name">
                                    <i class="checkmark icon"></i>
                                </div>
                                <div class="content">
                                    {{item.name}}
                                </div>
                            </div>
                        </div>
                    </j-accordion>
                    <j-accordion :title="'自定义筛选'" v-model="onCustomFilterToggle">

                    </j-accordion>
                    <j-accordion :title="'显示数据字段'">
                        <div class="ui small aligned selection list">
                            <div class="item filter-item" :class="{'filter-item-selected': item.checked}" @click="toggleColumnItem(item)" v-for="(item, index) in columnLists" :key="index">
                                <div class="right floated content" v-if="item.checked">
                                    <i class="checkmark icon"></i>
                                </div>
                                <div class="content">
                                    {{item.name}}
                                </div>
                            </div>
                        </div>
                    </j-accordion>
                </div>
                <div v-show="onCustomFilterToggle">
                    <div class="p-s" layout="row" layout-align="space-between center">
                        <j-button :type="'danger'" @click="onCustomFilterToggle = !onCustomFilterToggle">返回</j-button>
                        <j-button :type="'success'">保存</j-button>
                        <j-button :type="'info'">清空</j-button>
                    </div>
                    <div class="ui success message">
                        <div class="header">
                            将筛选添加和显示字段保存到我的筛选
                        </div>
                    </div>
                    <j-accordion :title="'渠道'">
                        <div class="ui small aligned selection list">
                            <div class="item filter-item" :class="{'filter-item-selected': item.checked}" @click="selectChannel(item)" v-for="(item, index) in channelList" :key="index">
                                <div class="right floated content" v-if="item.checked">
                                    <i class="checkmark icon"></i>
                                </div>
                                <div class="content">
                                    {{item.name}}
                                </div>
                            </div>
                        </div>
                    </j-accordion>
                    <j-accordion :title="'订单状态'">
                        <div class="ui small aligned selection list">
                            <div class="item filter-item" :class="{'filter-item-selected': item.checked}" @click="selectStatus(item)" v-for="(item, index) in statusList" :key="index">
                                <div class="right floated content" v-if="item.checked">
                                    <i class="checkmark icon"></i>
                                </div>
                                <div class="content">
                                    {{item.name}}
                                </div>
                            </div>
                        </div>
                    </j-accordion>
                    <j-accordion :title="'创建时间'"></j-accordion>
                    <j-accordion :title="'区域'"></j-accordion>
                    <j-accordion :title="'客服'"></j-accordion>
                    <j-accordion :title="'关闭类型'"></j-accordion>
                    <j-accordion :title="'AM'"></j-accordion>
                    <j-accordion :title="'AM战队'"></j-accordion>
                    <j-accordion :title="'施工队长'"></j-accordion>
                    <j-accordion :title="'管家'"></j-accordion>
                    <j-accordion :title="'量房时间'"></j-accordion>
                    <j-accordion :title="'制作报价时间'"></j-accordion>
                    <j-accordion :title="'签约时间'"></j-accordion>
                    <j-accordion :title="'开工时间'"></j-accordion>
                    <j-accordion :title="'时间开工时间'"></j-accordion>
                    <j-accordion :title="'完工时间'"></j-accordion>
                    <j-accordion :title="'时间完工时间'"></j-accordion>
                    <j-accordion :title="'验收时间'"></j-accordion>
                    <!-- <div layout="row" layout-align="center center">
                        <j-button :type="'primary'">保存</j-button>
                    </div> -->
                </div>
            </j-module-filter> 
         </j-module-content> 
    </div>
</template>
<script>
    import { mapGetters } from 'vuex';
    import JModuleHeader from '../../components/module/module-header.vue';
    import JModuleContent from '../../components/module/module-content.vue';
    import JModuleFilter from '../../components/module/module-filter.vue';
    import JTable from '../../components/table/index';
    import JPagination from '../../components/pagination/index';
    import JAccordion from '../../components/accordion/index';
    import JButton from '../../components/button/index';
    import selectAllComponent from './components/selectAll-component.vue';
    import selectComponent from './components/select-component.vue';
    import orderNoComponent from './components/orderNo-component.vue';
    import statusDescComponent from './components/statusDesc-component.vue';
    import clientNameComponent from './components/clientName-component.vue';
    import clientMobileComponent from './components/clientMobile-component.vue';
    import { bindRenderFn, getGridLocaleText, getGridSize } from '../../assets/js/utils/util';
    import { ORDER_LIST } from '../../assets/js/constants/grid';
    import CONFIG from '../../assets/js/constants/config';

    export default {
        name: 'order-list',
        components: {
            JModuleHeader,
            JModuleContent,
            JModuleFilter,
            JPagination,
            JAccordion,
            JButton,
            JTable
        },
        data () {
            return {
                title: 'Order List',
                columnDefs: ORDER_LIST,
                selectedPublickFilter: null,
                publicFilters: [
                    { name: '今天新增订单', value: '' },
                    { name: '今天新增且预约成功订单', value: '' },
                    { name: '今天量房', value: '' },
                    { name: '明天量房', value: '' },
                    { name: '今天签约', value: '' },
                    { name: '明天签约', value: '' },
                    { name: '今天开工', value: '' },
                    { name: '明天开工', value: '' },
                    { name: '跟进中订单', value: '' },
                ],
                columnLists: [
                    { name: '订单号', value: '', checked: true },
                    { name: '状态', value: '', checked: true },
                    { name: '联系人', value: '', checked: true },
                    { name: '手机号', value: '', checked: true },
                    { name: '区域', value: '', checked: true },
                    { name: '地址', value: '', checked: true },
                    { name: '量房时间', value: '', checked: true },
                    { name: 'AM', value: '', checked: true },
                    { name: 'AM战队', value: '', checked: true },
                    { name: '管家', value: '', checked: true },
                    { name: '施工队长', value: '', checked: true },
                    { name: '造价师', value: '', checked: true },
                    { name: '方案金额', value: '', checked: true },
                    { name: '合同金额', value: '', checked: true },
                    { name: '业主服务费', value: '', checked: true },
                    { name: '签约时间', value: '', checked: true },
                    { name: '开工时间', value: '', checked: true },
                    { name: '完工时间', value: '', checked: true },
                    { name: '已付款金额', value: '', checked: true },
                    { name: '待付款金额', value: '', checked: true },
                    { name: '实际开工时间', value: '', checked: true },
                    { name: '工期', value: '', checked: true },
                    { name: '实际完工时间', value: '', checked: true },
                    { name: '验收时间', value: '', checked: true },
                    { name: '工程款（队长结算金额）', value: '', checked: true },
                    { name: '队长服务费', value: '', checked: true },
                    { name: '主材待付款', value: '', checked: true },
                    { name: '未结算金额', value: '', checked: true },
                    { name: '已结算金额', value: '', checked: true },
                ],
                channelList: [
                    { name: '齐家网', value: '', checked: false },
                    { name: '优居客', value: '', checked: false },
                    { name: '装修找我', value: '', checked: false },
                    { name: '大众点评', value: '', checked: false },
                    { name: '微信', value: '', checked: false },
                    { name: '微博', value: '', checked: false },
                    { name: '三号楼', value: '', checked: false },
                    { name: '官网', value: '', checked: false },
                    { name: '今日头条', value: '', checked: false },
                ],
                onCustomFilterToggle: false,
                statusList: [
                    { name: '未预约', value: '', checked: false },
                    { name: '已预约', value: '', checked: false },
                    { name: '已签到', value: '', checked: false },
                    { name: '正在量房', value: '', checked: false },
                    { name: '量房完成', value: '', checked: false },
                    { name: '已上传需求清单', value: '', checked: false },
                    { name: '已报价', value: '', checked: false },
                    { name: '已签约', value: '', checked: false },
                    { name: '已开工', value: '', checked: false },
                    { name: '已完工', value: '', checked: false },
                    { name: '已验收', value: '', checked: false },
                    { name: '已完成', value: '', checked: false },
                    { name: '已关闭', value: '', checked: false },
                ]
            }
        },
        computed: {
            ...mapGetters([
                'orderList'
            ])
        },
        watch: {
            'onCustomFilterToggle' (value) {
                console.log(value);

                
            }
        },
        beforeMount () {
            let _columnDefs = bindRenderFn(
                ORDER_LIST, 
                [renderOrderStatus], 
                [
                    { field: 'index', headerComponent: selectAllComponent, cellComponent: selectComponent },
                    { field: 'orderNo', headerComponent: orderNoComponent },
                    { field: 'statusDesc', headerComponent: statusDescComponent },
                    { field: 'clientName', headerComponent: clientNameComponent },
                    { field: 'clientMobile', headerComponent: clientMobileComponent },
                ]
            );

            this.gridOptions = {
                columnDefs: _columnDefs,
                showToolPanel: false,
                rowSelection: 'single',
                pivotMode: false,
                enableSorting: true,
                suppressTouch: true,
                suppressMenu: true,
                suppressMenuHide: true,
                localeText: getGridLocaleText()
            };
        },
        mounted () {
            this.$store.dispatch('orderList', { 
                pageNo: 1, 
                pageNum: 10 
            });
        },
        methods: {
            onCellClicked (params) {

            },
            selectPublic (item) {
                if (item.name === this.selectedPublickFilter) {
                    this.selectedPublickFilter = null;
                } else {
                    this.selectedPublickFilter = item.name;
                }
            },
            toggleColumnItem (item) {
                item.checked = !item.checked;
            },
            selectChannel (item) {
                item.checked = !item.checked;
            },
            selectStatus (item) {
                item.checked = !item.checked;
            }
        }
    }

    function renderOrderStatus(params) {
        // console.log(params.eGridCell.style);
        // params.eGridCell.style = 'margin-top: -18px';
        // params.eGridCell.style = 'background-color: ' +  CONFIG.ORDER_STATUS_COLOR[params.vlue];
        // params.eGridCell.style = 'border-radius: 4px';
        
        return params.value;
    }
</script>
