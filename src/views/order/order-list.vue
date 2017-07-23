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
                    <div>当前显示&nbsp;&nbsp;{{orderListPage === 1 ? 1 : ((orderListPage - 1) * pageSize) + 1}}&nbsp;&nbsp;-&nbsp;&nbsp;{{orderListPage === 1 ? pageSize : (orderListPage * pageSize > orderList.total ? orderList.total : orderListPage * pageSize)}}, 共&nbsp;&nbsp;{{orderList.total}}</div>
                    <div class="ui left icon input">
                        <input type="text" placeholder="搜索...">
                        <i class="search icon"></i>
                    </div>
                </div> 
                <j-table :grid-options="gridOptions" :column-defs="columnDefs" :grid-data="orderList.result" @on-cell-clicked="onCellClicked"></j-table> 
                <j-pagination 
                    :current-page="orderListPage" 
                    :total="orderList.total"
                    @first="first"
                    @previous="previous"
                    @next="next"
                    @last="last"
                    @page-size-changed="onPageSizeChanged"></j-pagination>
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
                        <!-- <j-button :type="'success'">保存</j-button> -->
                        <j-button :type="'info'">清空</j-button>
                    </div>
                    <div class="p-l-s p-r-s p-b-s">
                        <j-button :type="'success'" :is-full="true">将筛选添加和显示字段保存到我的筛选</j-button>
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
                            <div class="item status-item" :style="item.bgColor" :class="{'status-item-selected': item.checked}" @click="selectStatus(item)" v-for="(item, index) in statusList" :key="index">
                                <div class="right floated content" v-if="item.checked">
                                    <i class="checkmark icon"></i>
                                </div>
                                <div class="content">
                                    {{item.name}}
                                </div>
                            </div>
                        </div>
                    </j-accordion>
                    <j-accordion :title="'创建时间'">
                        <div class="ui small aligned selection list">
                            <div class="item filter-item" :class="{'filter-item-selected': selectedCreateDate === item.name}" @click="selectCreateDate(item)" v-for="(item, index) in timeDuration" :key="index">
                                <div class="right floated content" v-if="selectedCreateDate === item.name">
                                    <i class="checkmark icon"></i>
                                </div>
                                <div class="content">
                                    {{item.name}}
                                </div>
                            </div>
                            <div class="item">
                                <j-datepicker :day-of-start="true" :placeholder="'开始时间'" v-model="createStartTime"></j-datepicker>
                            </div>
                            <div class="item">
                                <j-datepicker :day-of-end="true" :placeholder="'结束时间'" v-model="createEndTime"></j-datepicker>
                            </div>
                        </div>
                    </j-accordion>
                    <j-accordion :title="'区域'">
                        <div class="ui small aligned selection list">
                            <div class="item filter-item" :class="{'filter-item-selected': item.checked}" @click="selectDistrict(item)" v-for="(item, index) in districtList" :key="index">
                                <div class="right floated content" v-if="item.checked">
                                    <i class="checkmark icon"></i>
                                </div>
                                <div class="content">
                                    {{item.name}}
                                </div>
                            </div>
                        </div>
                    </j-accordion>
                    <j-accordion :title="'客服'">
                         <div class="ui small aligned selection list">
                            <div class="item">
                                <j-autocomplete v-model="searchCustomContext" :options="customList"></j-autocomplete>
                            </div>
                        </div> 
                    </j-accordion>
                    <j-accordion :title="'关闭类型'">
                        <div class="ui small aligned selection list">
                            <div class="item filter-item" :class="{'filter-item-selected': item.checked}" @click="selectCloseReason(item)" v-for="(item, index) in closeReasonList" :key="index">
                                <div class="right floated content" v-if="item.checked">
                                    <i class="checkmark icon"></i>
                                </div>
                                <div class="content">
                                    {{item.name}}
                                </div>
                            </div>
                        </div>
                    </j-accordion>
                    <j-accordion :title="'AM'"></j-accordion>
                    <j-accordion :title="'AM战队'">
                        <div class="ui small aligned selection list">
                            <div class="item filter-item" :class="{'filter-item-selected': selectedAmTeam === item.name}" @click="selectAmTeam(item)" v-for="(item, index) in amTeamList" :key="index">
                                <div class="right floated content" v-if="selectedAmTeam === item.name">
                                    <i class="checkmark icon"></i>
                                </div>
                                <div class="content">
                                    {{item.name}}
                                </div>
                            </div>
                        </div>
                    </j-accordion>
                    <j-accordion :title="'施工队长'"></j-accordion>
                    <j-accordion :title="'管家'"></j-accordion>
                    <j-accordion :title="'量房时间'">
                        <div class="ui small aligned selection list">
                            <div class="item filter-item" :class="{'filter-item-selected': selectedMeasureDate === item.name}" @click="selectMeasureDate(item)" v-for="(item, index) in timeDuration" :key="index">
                                <div class="right floated content" v-if="selectedMeasureDate === item.name">
                                    <i class="checkmark icon"></i>
                                </div>
                                <div class="content">
                                    {{item.name}}
                                </div>
                            </div>
                            <div class="item">
                                <j-datepicker :day-of-start="true" :placeholder="'开始时间'" v-model="measureStartTime"></j-datepicker>
                            </div>
                            <div class="item">
                                <j-datepicker :day-of-end="true" :placeholder="'结束时间'" v-model="measureEndTime"></j-datepicker>
                            </div>
                        </div>
                    </j-accordion>
                    <j-accordion :title="'制作报价时间'">
                        <div class="ui small aligned selection list">
                            <div class="item filter-item" :class="{'filter-item-selected': selectedQuoteDate === item.name}" @click="selectQuoteDate(item)" v-for="(item, index) in timeDuration" :key="index">
                                <div class="right floated content" v-if="selectedQuoteDate === item.name">
                                    <i class="checkmark icon"></i>
                                </div>
                                <div class="content">
                                    {{item.name}}
                                </div>
                            </div>
                            <div class="item">
                                <j-datepicker :day-of-start="true" :placeholder="'开始时间'" v-model="quoteStartTime"></j-datepicker>
                            </div>
                            <div class="item">
                                <j-datepicker :day-of-end="true" :placeholder="'结束时间'" v-model="quoteEndTime"></j-datepicker>
                            </div>
                        </div>
                    </j-accordion>
                    <j-accordion :title="'签约时间'">
                        <div class="ui small aligned selection list">
                            <div class="item filter-item" :class="{'filter-item-selected': selectedSignDate === item.name}" @click="selectSignDate(item)" v-for="(item, index) in timeDuration" :key="index">
                                <div class="right floated content" v-if="selectedSignDate === item.name">
                                    <i class="checkmark icon"></i>
                                </div>
                                <div class="content">
                                    {{item.name}}
                                </div>
                            </div>
                            <div class="item">
                                <j-datepicker :day-of-start="true" :placeholder="'开始时间'" v-model="signStartTime"></j-datepicker>
                            </div>
                            <div class="item">
                                <j-datepicker :day-of-end="true" :placeholder="'结束时间'" v-model="signEndTime"></j-datepicker>
                            </div>
                        </div>
                    </j-accordion>
                    <j-accordion :title="'开工时间'">
                        <div class="ui small aligned selection list">
                            <div class="item filter-item" :class="{'filter-item-selected': selectedBeginConstructDate === item.name}" @click="selectBeginConstructDate(item)" v-for="(item, index) in timeDuration" :key="index">
                                <div class="right floated content" v-if="selectedBeginConstructDate === item.name">
                                    <i class="checkmark icon"></i>
                                </div>
                                <div class="content">
                                    {{item.name}}
                                </div>
                            </div>
                            <div class="item">
                                <j-datepicker :day-of-start="true" :placeholder="'开始时间'" v-model="beginConstructStartTime"></j-datepicker>
                            </div>
                            <div class="item">
                                <j-datepicker :day-of-end="true" :placeholder="'结束时间'" v-model="beginConstructEndTime"></j-datepicker>
                            </div>
                        </div>
                    </j-accordion>
                    <j-accordion :title="'实际开工时间'">
                        <div class="ui small aligned selection list">
                            <div class="item filter-item" :class="{'filter-item-selected': selectedActualBeginDate === item.name}" @click="selectActualBeginDate(item)" v-for="(item, index) in timeDuration" :key="index">
                                <div class="right floated content" v-if="selectedActualBeginDate === item.name">
                                    <i class="checkmark icon"></i>
                                </div>
                                <div class="content">
                                    {{item.name}}
                                </div>
                            </div>
                            <div class="item">
                                <j-datepicker :day-of-start="true" :placeholder="'开始时间'" v-model="actualBeginStartTime"></j-datepicker>
                            </div>
                            <div class="item">
                                <j-datepicker :day-of-end="true" :placeholder="'结束时间'" v-model="actualBeginEndTime"></j-datepicker>
                            </div>
                        </div>
                    </j-accordion>
                    <j-accordion :title="'完工时间'">
                        <div class="ui small aligned selection list">
                            <div class="item filter-item" :class="{'filter-item-selected': selectedCompleteConstructDate === item.name}" @click="selectCompleteConstructDate(item)" v-for="(item, index) in timeDuration" :key="index">
                                <div class="right floated content" v-if="selectedCompleteConstructDate === item.name">
                                    <i class="checkmark icon"></i>
                                </div>
                                <div class="content">
                                    {{item.name}}
                                </div>
                            </div>
                            <div class="item">
                                <j-datepicker :day-of-start="true" :placeholder="'开始时间'" v-model="completeConstructStartTime"></j-datepicker>
                            </div>
                            <div class="item">
                                <j-datepicker :day-of-end="true" :placeholder="'结束时间'" v-model="completeConstructEndTime"></j-datepicker>
                            </div>
                        </div>
                    </j-accordion>
                    <j-accordion :title="'实际完工时间'">
                        <div class="ui small aligned selection list">
                            <div class="item filter-item" :class="{'filter-item-selected': selectedActualCompleteDate === item.name}" @click="selectActualCompleteDate(item)" v-for="(item, index) in timeDuration" :key="index">
                                <div class="right floated content" v-if="selectedActualCompleteDate === item.name">
                                    <i class="checkmark icon"></i>
                                </div>
                                <div class="content">
                                    {{item.name}}
                                </div>
                            </div>
                            <div class="item">
                                <j-datepicker :day-of-start="true" :placeholder="'开始时间'" v-model="actualCompleteStartTime"></j-datepicker>
                            </div>
                            <div class="item">
                                <j-datepicker :day-of-end="true" :placeholder="'结束时间'" v-model="actualCompleteEndTime"></j-datepicker>
                            </div>
                        </div>
                    </j-accordion>
                    <j-accordion :title="'验收时间'">
                        <div class="ui small aligned selection list">
                            <div class="item filter-item" :class="{'filter-item-selected': selectedAcceptanceDate === item.name}" @click="selectAcceptanceDate(item)" v-for="(item, index) in timeDuration" :key="index">
                                <div class="right floated content" v-if="selectedAcceptanceDate === item.name">
                                    <i class="checkmark icon"></i>
                                </div>
                                <div class="content">
                                    {{item.name}}
                                </div>
                            </div>
                            <div class="item">
                                <j-datepicker :day-of-start="true" :placeholder="'开始时间'" v-model="acceptanceStartTime"></j-datepicker>
                            </div>
                            <div class="item">
                                <j-datepicker :day-of-end="true" :placeholder="'结束时间'" v-model="acceptanceEndTime"></j-datepicker>
                            </div>
                        </div>
                    </j-accordion>
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
    import JDatepicker from '../../components/datepicker/index';
    import JSelect from '../../components/select/index';
    import JAutocomplete from '../../components/autocomplete/index';
    // import selectAllHeaderComponent from './components/selectAll-header-component.vue';
    // import selectComponent from './components/select-component.vue';
    import orderNoHeaderComponent from './components/orderNo-header-component.vue';
    import statusDescHeaderComponent from './components/statusDesc-header-component.vue';
    import statusDescComponent from './components/statusDesc-component.vue';
    import clientNameHeaderComponent from './components/clientName-header-component.vue';
    import clientMobileHeaderComponent from './components/clientMobile-header-component.vue';
    import { bindRenderFn, getGridLocaleText, getGridSize, getInteger } from '../../assets/js/utils/util';
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
            JDatepicker,
            JSelect,
            JAutocomplete,
            JTable
        },
        data () {
            return {
                title: 'Order List',
                pageSize: 20,
                // selectedPageSize: { name: '每页显示20条', value: 20 },
                // pageSizeOptions: [
                //     { name: '每页显示20条', value: 20 },
                //     { name: '每页显示30条', value: 30 },
                //     { name: '每页显示50条', value: 50 },
                //     { name: '每页显示100条', value: 100 },
                // ],
                columnDefs: ORDER_LIST,
                selectedPublickFilter: null,
                onCustomFilterToggle: false,
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
                    { name: '订单号', value: 'orderNo', checked: true },
                    { name: '状态', value: 'statusDesc', checked: true },
                    { name: '联系人', value: 'clientName', checked: true },
                    { name: '手机号', value: 'clientMobile', checked: true },
                    { name: '区域', value: 'clinetDistrict', checked: true },
                    { name: '地址', value: 'clientAddress', checked: true },
                    { name: '量房时间', value: 'measureTimeFormat', checked: true },
                    { name: 'AM', value: 'pmDesc', checked: true },
                    { name: 'AM战队', value: '', checked: true },
                    { name: '管家', value: 'stewardDesc', checked: true },
                    { name: '施工队长', value: 'foremanDesc', checked: true },
                    { name: '造价师', value: '', checked: true },
                    { name: '方案金额', value: '', checked: true },
                    { name: '合同金额', value: 'ContractAmount', checked: true },
                    { name: '业主服务费', value: '', checked: true },
                    { name: '签约时间', value: '', checked: true },
                    { name: '开工时间', value: 'beginConstructionTimeFormat', checked: true },
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
                statusList: [
                    { name: '未预约', value: '', checked: false, bgColor: {backgroundColor: '#EBAEBE', color: '#fff'} },
                    { name: '已预约', value: '', checked: false, bgColor: {backgroundColor: '#F0C651', color: '#fff'} },
                    { name: '已签到', value: '', checked: false, bgColor: {backgroundColor: '#C7AD36', color: '#fff'} },
                    { name: '正在量房', value: '', checked: false, bgColor: {backgroundColor: '#708B2D', color: '#fff'} },
                    { name: '量房完成', value: '', checked: false, bgColor: {backgroundColor: '#95D458', color: '#fff'} },
                    { name: '已上传需求清单', value: '', checked: false, bgColor: {backgroundColor: '#4A82BE', color: '#fff'} },
                    { name: '已报价', value: '', checked: false, bgColor: {backgroundColor: '#E16B19', color: '#fff'} },
                    { name: '已签约', value: '', checked: false, bgColor: {backgroundColor: '#5DA4B4', color: '#fff'} },
                    { name: '已开工', value: '', checked: false, bgColor: {backgroundColor: '#5EA689', color: '#fff'} },
                    { name: '已完工', value: '', checked: false, bgColor: {backgroundColor: '#79BFDF', color: '#fff'} },
                    { name: '已验收', value: '', checked: false, bgColor: {backgroundColor: '#9C51C0', color: '#fff'} },
                    { name: '已完成', value: '', checked: false, bgColor: {backgroundColor: '#305488', color: '#fff'} },
                    { name: '已关闭', value: '', checked: false, bgColor: {backgroundColor: '#C90446', color: '#fff'} },
                ],
                timeDuration: [
                    { name: '今天', value: '' },
                    { name: '过去7天', value: '' },
                    { name: '本月', value: '' },
                ],
                selectedCreateDate: null,
                createStartTime: null,
                createEndTime: null,
                districtList: [
                    { name: '普陀区', value: '', checked: false },
                    { name: '嘉定区', value: '', checked: false },
                    { name: '宝山区', value: '', checked: false },
                    { name: '长宁区', value: '', checked: false },
                    { name: '静安区', value: '', checked: false },
                    { name: '闸北区', value: '', checked: false },
                    { name: '徐汇区', value: '', checked: false },
                    { name: '闵行区', value: '', checked: false },
                    { name: '黄浦区', value: '', checked: false },
                    { name: '松江区', value: '', checked: false },
                    { name: '浦东新区', value: '', checked: false },
                    { name: '杨浦区', value: '', checked: false },
                    { name: '虹口区', value: '', checked: false },
                ],
                searchCustomContext: null,
                customList: [
                    { name: 'Angular', value: 'angular' },
                    { name: 'Vue', value: 'vue' },
                    { name: 'React', value: 'react' },
                ],
                closeReasonList: [
                    { name: '预约联系不上业主', value: '', checked: false },
                    { name: '施工项目无法满足', value: '', checked: false },
                    { name: '报价有漏项', value: '', checked: false },
                    { name: 'AM沟通不及时', value: '', checked: false },
                    { name: '渠道重复订单', value: '', checked: false },
                    { name: '报价后业主失联', value: '', checked: false },
                    { name: '报价太简单', value: '', checked: false },
                    { name: '纯定制需求', value: '', checked: false },
                    { name: '业主不装修了', value: '', checked: false },
                    { name: '整体超出预算', value: '', checked: false },
                    { name: '工长专业技能不足', value: '', checked: false },
                    { name: 'AM不专业', value: '', checked: false },
                    { name: '主动放弃', value: '', checked: false },
                    { name: '整体价格高', value: '', checked: false },
                    { name: '报价看不懂', value: '', checked: false },
                    { name: '偏远地区', value: '', checked: false },
                    { name: '设计要求无法满足', value: '', checked: false },
                    { name: '单项价格高', value: '', checked: false },
                    { name: '工长态度/形象不好', value: '', checked: false },
                    { name: 'AM态度/形象不好', value: '', checked: false },
                    { name: '选择其他公司', value: '', checked: false },
                    { name: '业主需求过小', value: '', checked: false },
                    { name: '其他', value: '', checked: false },
                ],
                selectedAmTeam: null,
                amTeamList: [
                    { name: '飞虎队（A组）', value: '' },
                    { name: '超能队（B组）', value: '' },
                    { name: '逆天队（C组）', value: '' },
                ],
                selectedMeasureDate: null,
                measureStartTime: null,
                measureEndTime: null,
                selectedQuoteDate: null,
                quoteStartTime: null,
                quoteEndTime: null,
                selectedSignDate: null,
                signStartTime: null,
                signEndTime: null,
                selectedBeginConstructDate: null,
                beginConstructStartTime: null,
                beginConstructEndTime: null,
                selectedActualBeginDate: null,
                actualBeginStartTime: null,
                actualBeginEndTime: null,
                selectedCompleteConstructDate: null,
                completeConstructStartTime: null,
                completeConstructEndTime: null,
                selectedActualCompleteDate: null,
                actualCompleteStartTime: null,
                actualCompleteEndTime: null,
                selectedAcceptanceDate: null,
                acceptanceStartTime: null,
                acceptanceEndTime: null,
            }
        },
        computed: {
            ...mapGetters([
                'orderList',
                'orderListPage',
            ])
        },
        watch: {
            'orderListPage' (value) {
                let params = {
                    pageNo: value
                };

                this.$store.dispatch('orderList', params);
            }
            // 'onCustomFilterToggle' (value) {
            //     console.log(value);
            // },
            // 'createStartTime' (value) {
            //     console.log(value);
            // },
            // 'createEndTime' (value) {
            //     console.log(value);
            // }
        },
        beforeMount () {
            let _columnDefs = bindRenderFn(
                ORDER_LIST,
                [
                    // { field: 'index', headerComponent: selectAllHeaderComponent, cellComponent: selectComponent },
                    { field: 'orderNo', headerComponent: orderNoHeaderComponent },
                    { field: 'statusDesc', headerComponent: statusDescHeaderComponent, cellComponent: statusDescComponent },
                    { field: 'clientName', headerComponent: clientNameHeaderComponent },
                    { field: 'clientMobile', headerComponent: clientMobileHeaderComponent },
                ],
            );

            this.gridOptions = {
                columnDefs: _columnDefs,
                showToolPanel: false,
                rowSelection: 'multiple',
                pivotMode: false,
                enableSorting: true,
                suppressTouch: true,
                suppressMenu: true,
                suppressMenuHide: true,
                localeText: getGridLocaleText(),
                onRowSelected: this.onRowSelect,
                onSelectionChanged: this.onSelectionChanged,
                floatingBottomRowData: [{orderNo: 1, clientMobile: 13641703354}]
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
            onRowSelect (event) {
                console.log(event);
            },
            onSelectionChanged() {

            },
            onPageSizeChanged (pageSize) {
                console.log(pageSize);

                this.pageSize = pageSize.value;
            },
            first () {
                this.$store.dispatch('orderListPage', 1);
            },
            previous () {
                this.$store.dispatch('orderListPage', --this.orderListPage);
            },
            next () {
                this.$store.dispatch('orderListPage', ++this.orderListPage);
            },
            last () {
                this.$store.dispatch('orderListPage', getInteger(this.orderList.total / this.pageSize));
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

                console.log(item.value);
                this.gridOptions.columnApi.setColumnVisible(item.value, item.checked);
            },
            selectChannel (item) {
                item.checked = !item.checked;
            },
            selectStatus (item) {
                item.checked = !item.checked;
            },
            selectCreateDate (item) {
                if (item.name === this.selectedCreateDate) {
                    this.selectedCreateDate = null;
                } else {
                    this.selectedCreateDate = item.name;
                }
            },
            selectDistrict (item) {
                item.checked = !item.checked;
            },
            selectCloseReason (item) {
                item.checked = !item.checked;
            },
            selectAmTeam (item) {
                if (item.name === this.selectedAmTeam) {
                    this.selectedAmTeam = null;
                } else {
                    this.selectedAmTeam = item.name;
                }
            },
            selectMeasureDate (item) {
                if (item.name === this.selectedMeasureDate) {
                    this.selectedMeasureDate = null;
                } else {
                    this.selectedMeasureDate = item.name;
                }
            },
            selectQuoteDate (item) {
                if (item.name === this.selectedQuoteDate) {
                    this.selectedQuoteDate = null;
                } else {
                    this.selectedQuoteDate = item.name;
                }
            },
            selectSignDate (item) {
                if (item.name === this.selectedSignDate) {
                    this.selectedSignDate = null;
                } else {
                    this.selectedSignDate = item.name;
                }
            },
            selectBeginConstructDate (item) {
                if (item.name === this.selectedBeginConstructDate) {
                    this.selectedBeginConstructDate = null;
                } else {
                    this.selectedBeginConstructDate = item.name;
                }
            },
            selectActualBeginDate (item) {
                if (item.name === this.selectedActualBeginDate) {
                    this.selectedActualBeginDate = null;
                } else {
                    this.selectedActualBeginDate = item.name;
                }
            },
            selectCompleteConstructDate (item) {
                if (item.name === this.selectedCompleteConstructDate) {
                    this.selectedCompleteConstructDate = null;
                } else {
                    this.selectedCompleteConstructDate = item.name;
                }
            },
            selectActualCompleteDate (item) {
                if (item.name === this.selectedActualCompleteDate) {
                    this.selectedActualCompleteDate = null;
                } else {
                    this.selectedActualCompleteDate = item.name;
                }
            },
            selectAcceptanceDate (item) {
                if (item.name === this.selectedAcceptanceDate) {
                    this.selectedAcceptanceDate = null;
                } else {
                    this.selectedAcceptanceDate = item.name;
                }
            }
        }
    }
</script>
