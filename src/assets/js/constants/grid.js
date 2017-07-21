/**
 * Created by jason on 28/06/2017.
 */
export const ORDER_LIST = [
    { headerName: '#', field: 'index', pinned: 'left', suppressMenu: true, width: 60, headerComponentFramework: 'index', cellRendererFramework: 'index' },
    { headerName: '订单号', field: 'orderNo', width: 80, suppressMenu: true, headerComponentFramework: 'orderNo' },
    { headerName: '订单状态', field: 'statusDesc', width: 100, suppressMenu: true, headerComponentFramework: 'statusDesc', cellRendererFramework: 'statusDesc' },
    { headerName: '联系人', field: 'clientName', width: 100, suppressMenu: true, headerComponentFramework: 'clientName' },
    { headerName: '手机号', field: 'clientMobile', width: 120, suppressMenu: true, headerComponentFramework: 'clientMobile' },        
    { headerName: '区域', field: 'clinetDistrict', width: 120, suppressMenu: true },        
    { headerName: '地址', field: 'clientAddress', suppressMenu: true },
    { headerName: '量房时间', field: 'measureTimeFormat', width: 150, suppressMenu: true },
    { headerName: '开工时间', field: 'beginConstructionTimeFormat', width: 150, suppressMenu: true },
    { headerName: 'AM', field: 'pmDesc', width: 100, suppressMenu: true },
    { headerName: '管家', field: 'stewardDesc', width: 100, suppressMenu: true },
    { headerName: '施工队长', field: 'foremanDesc', width: 100, suppressMenu: true },
    // { headerName: '渠道', field: 'channelDesc', width: 120, suppressMenu: true },
    { headerName: '客服', field: 'customDesc', width: 100, suppressMenu: true },
    { headerName: '业主详细需求', field: 'clientRequest', width: 400, suppressMenu: true, hide: true },
    { headerName: '订单创建时间', field: 'createTime', width: 150, suppressMenu: true, hide: true },
    { headerName: '合同金额', field: 'ContractAmount', width: 100, suppressMenu: true, hide: true },
];

export const CONSTRUCT_ORDER_LIST = [
    { headerName: '#', field: 'index', pinned: 'left', width: 40, suppressSizeToFit: true, suppressMenu: true },
    { headerName: '订单号', field: 'orderNo', pinned: 'left', filter: 'text', width: 80 },
    { headerName: '状态', field: 'statusDesc', cellRenderer: 'renderOrderStatus', width: 100 },
    { headerName: '渠道', field: 'channelDesc', width: 120 },
    { headerName: '客服', field: 'customDesc', width: 100 },
    { headerName: 'PM', field: 'pmDesc', width: 100 },
    { headerName: '管家', field: 'stewardDesc', width: 100 },
    { headerName: '工长', field: 'foremanDesc', width: 100 },
    { headerName: '开工时间', field: 'beginConstructionTime', filter: 'text', width: 150 },
    {
        headerName: '业主信息',
        children: [
            { headerName: '业主姓名', field: 'clientName', filter: 'text', width: 100 },
            { headerName: '业主手机号', field: 'clientMobile', filter: 'text', width: 120 },
            { headerName: '业主地址', field: 'clientAddress', filter: 'text' },
            { headerName: '业主详细需求', field: 'clientRequest', filter: 'text', width: 400 }
        ]
    },
    { headerName: '合同金额', field: 'ContractAmount', filter: 'text', width: 100 },
    { headerName: '订单创建时间', field: 'createTime', filter: 'text', width: 150, hide: true }
];

export const CONSTRUCT_INSPECTION_LIST = [
    { headerName: '订单号', field: 'orderNo', width: 80, filter: 'text' },
    { headerName: '管家', field: 'stewardDesc', pinned: 'left', width: 100 },
    {
        headerName: '业主信息',
        children: [
            { headerName: '业主姓名', field: 'clientName', width: 100, filter: 'text' },
            { headerName: '业主手机号', field: 'clientMobile', width: 120, filter: 'text' },
            { headerName: '业主地址', field: 'clientAddress', filter: 'text' },
            { headerName: '业主详细需求', field: 'clientRequest', width: 400, filter: 'text' },
            ]
    },
    { headerName: '客服', field: 'customDesc', width: 100, hide: true },
    { headerName: 'PM', field: 'pmDesc', width: 100, hide: true },
    { headerName: '工长', field: 'foremanDesc', width: 100 },
    { headerName: '巡检时间', field: 'checkInTime', pinned: 'left', width: 120, filter: 'text' },
    { headerName: '巡检距离', field: 'distanceDesc', width: 100, filter: 'text' },
    { headerName: '巡检节点', field: 'pointDesc', width: 100 },
    { headerName: '类型', field: 'typeDesc', width: 100 },
    { headerName: '施工质量', field: 'qualityDesc', width: 100 },
    { headerName: '保护', field: 'protectDesc', width: 150 },
    { headerName: '卫生', field: 'healthDesc', width: 100 },
    { headerName: '进度', field: 'progressDesc', width: 100 },
    { headerName: '巡检内容', field: 'content', width: 150, filter: 'text' },
    { headerName: '巡检描述', field: 'inspectionDesc', width: 150, filter: 'text' },
    { headerName: '巡检备注', field: 'inspectionResult', width: 250, filter: 'text' },
    { headerName: '巡检图片', field: 'imgUrlList', pinned: 'right', width: 100, cellRenderer: 'renderImgList', suppressFilter: true }
];

export const CONSTRUCT_PROBLEM_LIST = [
    { headerName: '订单号', field: 'orderNo', pinned: 'left', width: 80 },
    { headerName: '管家', field: 'stewardDesc', pinned: 'left', width: 100 },
    {
        headerName: '业主信息',
        children: [
            { headerName: '业主姓名', field: 'clientName', width: 100, filter: 'text' },
            { headerName: '业主手机号', field: 'clientMobile', width: 120, filter: 'text' },
            { headerName: '业主地址', field: 'clientAddress', filter: 'text' },
            { headerName: '业主详细需求', field: 'clientRequest', width: 400, filter: 'text', hide: true },
            ]
    },
    { headerName: '客服', field: 'customDesc', width: 100, hide: true },
    { headerName: 'PM', field: 'pmDesc', width: 100, hide: true },
    { headerName: '工长', field: 'foremanDesc', width: 100 },
    { headerName: '问题发现时间', field: 'createTime', width: 150, filter: 'text' },
    { headerName: '问题等级', field: 'problemLevelDesc', width: 100 },
    { headerName: '问题状态', field: 'statusDesc', width: 100 },
    { headerName: '处理次数', field: 'handleTimes', width: 80, filter: 'text' },
    { headerName: '截止时间', field: 'deadlineTime', width: 150, filter: 'text' },
    { headerName: '问题解决时间', field: 'updateTime', width: 150, filter: 'text' },
    { headerName: '问题描述备注', field: 'remark', width: 250, filter: 'text' },
    { headerName: '问题图片', field: 'imgUrlList', pinned: 'right', width: 100, cellRenderer: 'renderImgList', suppressFilter: true }
];
