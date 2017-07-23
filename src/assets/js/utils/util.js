const hasOwnProperty = Object.prototype.hasOwnProperty;

export function hasOwn(obj, key) {
    return hasOwnProperty.class(obj, key);
}

export function isDefined(obj) {
    let hasProp = false;

    if (typeof obj === 'object' && !(obj instanceof Array)) {
        for (let prop in obj) {
            if (prop) {
                hasProp = true;
                break;
            }
        }
    }

    return hasProp;
}

export function jsonToUrl(json) {
    if (!isDefined(json)) {
        return;
    }

    return Object.keys(json).map((key, index) => {
        return key + '=' + encodeURIComponent(json[key]);
    }).join('&');
}

/**
 * 匹配表格高度
 * @return {{width: string, height: string}}
 */
export function getGridSize() {
    let height = window.innerHeight || window.clientHeight;

    return {
        width: '100%',
        height: (height <= 965 ? 520 : 920) + 'px'
    };
}

/**
 * 表格localization
 * @return {{}}
 */
export function getGridLocaleText() {
    let result = {};

    result.page = '当前';
    result.of = '总数';
    result.next = '<i class="angle right icon"></i>';
    result.last = '<i class="angle double right icon"></i>';
    result.first = '<i class="angle double left icon"></i>';
    result.previous = '<i class="angle left icon"></i>';
    result.pinColumn = '固定列';
    result.pinLeft = '固定左边';
    result.pinRight = '固定右边';
    result.noPin = '取消固定';
    result.loadingOoo = '加载中...';
    result.autosizeThiscolumn = '自动适配当前列';
    result.autosizeAllColumns = '自动适配全部列';
    result.resetColumns = '重置列';
    result.toolPanel = '工具栏';

    return result;
}

/**
 * 自动匹配表格每页显示数量
 * @return {number}
 */
export function getDefaultPageSize() {

    return window.innerHeight <= 965 ? 10 : 20;
}

/**
 * 绑定表格cellRenderer
 * @param {array} config
 * @param {array} renderFn
 */
export function bindRenderFn(config, components) {
    _.forEach(config, (value) => {
        // if (renderFn && renderFn.length > 0) {
        //     _.forEach(renderFn, (func) => {
        //     });
        // }

        if (components && components.length > 0) {
            _.forEach(components, (component) => {
                if (value.headerComponentFramework && value.field == component.field) {
                    value.headerComponentFramework = component.headerComponent;
                }
                if (value.cellRendererFramework && value.field === component.field) {
                    value.cellRendererFramework = component.cellComponent;
                }
            });
        }
    });

    console.log(config);

    return config;
}

/**
 * 获得格式化金额显示
 * @param {number} price
 * @param {boolean} hidePrefix
 * @return {string}
 */
export function handlePrice(price, hidePrefix) {
    let str = (price / 100).toFixed(2) + '';
    let intSum = str.substring(0, str.indexOf(".")).replace(/\B(?=(?:\d{3})+$)/g, ','); //取到整数部分
    let dot = str.substring(str.length, str.indexOf(".")); //取到小数部分
    let ret = intSum + dot;

    return hidePrefix ? ret : '￥' + ret;
}

/**
 * 格式化日期格式
 * @param {date} date
 * @return {string}
 */
export function handleDate(date) {
    let weekDesc = {
        1: '一',
        2: '二',
        3: '三',
        4: '四',
        5: '五',
        6: '六',
        7: '日',
    };

    let month = moment(date).month() + 1;
    let day = moment(date).date();
    let week = moment(date).day() + 1;
    let hour = moment(date).hour() + 1;
    let minute = moment(date).minute();

    return (month < 10 ? '0' + month : month) + '月' + (day < 10 ? '0' + day : day) + '日' + '(星期' + weekDesc[week] + ') ' + (hour < 10 ? '0' + hour : hour) + ':' + (minute < 10 ? '0' + minute : minute);
}

export function convertChangeLineTag(context) {
    if (context.indexOf('\n') !== -1) {
        return context.replace(/\n/g, '<br>');
    } else {
        return context;
    }
}

export function getSubContainerSize() {
    return (window.innerHeight - 170) + 'px';
}

export function getInteger(num) {
    let _num = num + '';

    if (_num.indexOf('.') === -1) {
        return num;
    } else {
        return parseInt(_num.split('.')[0]) + 1;
    }
}
