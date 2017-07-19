import moment from 'moment';
import HttpService from '../services/http';
import { handlePrice, handleDate, convertChangeLineTag } from '../utils/util';
import URL from '../constants/url';
import FLAG from '../constants/flag';

export function OrderList(params) {
    return HttpService.get(URL.ORDER_LIST, params).then(
        (data) => {
            return convertOrderList(data);
        }
    );
}

export function ConstructOrderList(params) {
    return HttpService.get(URL.CONSTRUCT_ORDER_LIST, params).then(
        (data) => {
            return convertConstructOrderList(data);
        }
    );
}

export function ConstructInspectionList(params) {
    return HttpService.get(URL.CONSTRUCT_INSPECTION_LIST, params).then(
        (data) => {
            return convertConstructInspectionList(data);
        }
    );
}

export function ConstructProblemList(params) {
    return HttpService.get(URL.CONSTRUCT_PROBLEM_LIST, params).then(
        (data) => {
            return convertConstructProblemList(data);
        }
    );
}

export function ConstructOrderInfo(orderId) {
    return HttpService.get(URL.CONSTRUCT_ORDER_INFO + '/' + orderId).then(
        (data) => {
            return convertConstructOrderInfo(data);
        }
    );
}

function convertOrderList(data) {
    console.log(data);

    return data;
}

function convertConstructOrderList(data) {
    if (data.page.result && data.page.result.length > 0) {
        _.forEach(data.page.result, (value, key) => {
            value.index = ++key;
            value.orderId = value.id;
            value.statusDesc = FLAG.ORDER_STATUS_DESC[value.status];
            value.channelDesc = value.channel ? value.channel.name : '';
            value.createTime = moment(value.createTime).format('YYYY-MM-DD HH:mm:ss');
            value.beginConstructionTime = value.beginConstructionTime ? moment(value.beginConstructionTime).format('YYYY-MM-DD HH:mm:ss') : '--';
            value.clientName = value.contact;
            value.clientMobile = value.mobile;
            value.clientAddress = value.community ? (value.community.districtName + '-' + value.community.address) : '--';
            value.clientRequest = value.description;
            value.pmDesc = value.pm ? value.pm.name : '--';
            value.customDesc = value.cs ? value.cs.name : '--';
            value.foremanDesc = value.foreman ? value.foreman.name : '--';
            value.stewardDesc = value.steward ? value.steward.name : '--';
        })
    }

    return data;
}

function convertConstructInspectionList(data) {
    if (data.allOrderInspection && data.allOrderInspection.length > 0) {
        _.forEach(data.allOrderInspection, (value, key) => {
            value.index = ++key;
            value.orderId = value.order.id;
            value.orderNo = value.order.orderNo;
            value.clientName = value.order.contact;
            value.clientMobile = value.order.mobile;
            value.clientAddress = value.order.community ? (value.order.community.districtName + '-' + value.order.community.address) : '--';
            value.clientRequest = value.order.description;
            value.pmDesc = value.order.pm ? value.order.pm.name : '--';
            value.customDesc = value.order.cs ? value.order.cs.name : '--';
            value.foremanDesc = value.order.foreman ? value.order.foreman.name : '--';
            value.stewardDesc = value.order.steward ? value.order.steward.name : '--';
            value.checkInTime = moment(value.checkInTime).format('YYYY-MM-DD HH:mm:ss');
            value.distanceDesc = value.distance !== 0 ? value.distance + '米' : '--';
            value.pointDesc = FLAG.INSPECTION_POINT_TYPE_DESC[value.point];
            value.typeDesc = FLAG.INSPECTION_TYPE_DESC[value.inspectionType];
            value.qualityDesc = FLAG.INSPECTION_QUALITY_DESC[value.quality];
            value.protectDesc = FLAG.INSPECTION_PROTECT_DESC[value.protect];
            value.healthDesc = FLAG.INSPECTION_HEALTH_DESC[value.health];
            value.progressDesc = FLAG.INSPECTION_PROGRESS_DESC[value.progress];
            value.imgUrlList = value.imgUrls.split(',');
        })
    }

    return data;
}

function convertConstructProblemList(data) {
    if (data.allOrderSiteProblem && data.allOrderSiteProblem.length > 0) {
        _.forEach(data.allOrderSiteProblem, (value, key) => {
            value.index = ++key;
            value.orderId = value.order.id;
            value.orderNo = value.order.orderNo;
            value.clientName = value.order.contact;
            value.clientMobile = value.order.mobile;
            value.clientAddress = value.order.community ? (value.order.community.districtName + '-' + value.order.community.address) : '--';
            value.clientRequest = value.order.description;
            value.handleTimes = value.handleTimes + '次';
            value.pmDesc = value.order.pm ? value.order.pm.name : '--';
            value.customDesc = value.order.cs ? value.order.cs.name : '--';
            value.foremanDesc = value.order.foreman ? value.order.foreman.name : '--';
            value.stewardDesc = value.order.steward ? value.order.steward.name : '--';
            value.createTime = moment(value.createTime).format('YYYY-MM-DD HH:mm:ss');
            value.updateTime = moment(value.updateTime).format('YYYY-MM-DD HH:mm:ss');
            value.deadlineTime = moment(value.deadlineTime).format('YYYY-MM-DD HH:mm:ss');
            value.problemLevelDesc = value.siteProblem ? value.siteProblem.level : '--';
            value.statusDesc = FLAG.PROBLEM_STATUS_DESC[value.status];
            value.imgUrlList = value.problemImgUrls.split(',');
        })
    }

    return data;
}

function convertConstructOrderInfo(data) {
    if (data.order) {
        data.imgTypeCont = {};

        data.order.contractAmount = handlePrice(data.order.contractAmount);

        _.forEach(FLAG.IMG_TYPE_DESC, (value, key) => {
            data.imgTypeCont[key] = [];
        });

        _.forEach(data.order.ordImgList, (value) => {
            _.forEach(data.imgTypeCont, (subValue, key) => {
                if (value.type.toString() === key) {
                    data.imgTypeCont[key].push(value.imgUrl);
                }
            });
        });

        _.forEach(data.constructionDeliverList, (value) => {
            value.task.result = value.task.result ? convertChangeLineTag(value.task.result) : '--';
            value.resultDetail = value.resultDetail ? convertChangeLineTag(value.resultDetail) : '--';

            if (value.imgUrls) {
                value.imgUrlList = value.imgUrls.indexOf(',') > -1 ? value.imgUrls.split(',') : [value.imgUrls];
                value.isShowDeliverImg = false;
            } else {
                value.imgUrlList = [];
            }
        });

        _.forEach(data.projectDailyList, (value, key) => {
            value.downtimeReason = value.downtimeReason ? convertChangeLineTag(value.downtimeReason) : '--';
            value.dailyFormat = value.dailyFormat ? convertChangeLineTag(value.dailyFormat) : '--';

            if (value.imgUrls) {
                value.imgUrlList = value.imgUrls.indexOf(',') > -1 ? value.imgUrls.split(',') : [value.imgUrls];
                value.isShowDailyImg = false;
            } else {
                value.imgUrlList = [];
            }
        });

        _.forEach(data.ordSiteProblemList, (value) => {
            value.deadlineTimeFormat = handleDate(value.deadlineTime);
            value.remark = value.remark ? convertChangeLineTag(value.remark) : '--';

            if (value.problemImgUrls) {
                value.imgUrlList = value.problemImgUrls.indexOf(',') > -1 ? value.problemImgUrls.split(',') : [value.problemImgUrls];
                value.isShowProblemImg = false;
            } else {
                value.imgUrlList = [];
            }
        });

        _.forEach(data.orderInspectionList, (value) => {
            if (value.imgUrls) {
                value.imgUrlList = value.imgUrls.indexOf(',') > -1 ? value.imgUrls.split(',') : [value.imgUrls];
                value.isShowInspectionImg = false;
            } else {
                value.imgUrlList = [];
            }

            value.checkInTimeFormat = handleDate(value.checkInTime);
        });

        console.log(data);
    }

    return data;
}
