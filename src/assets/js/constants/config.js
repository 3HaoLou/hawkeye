export default {
    // TERMINAL: 'H5',
    TERMINAL: 'Zeus',
    VERSION: '0.7.0',
    APP_NAME: 'Hawkeye System',
    BASE_HOST: '/v1',

    DEBUG_HOST: 'http://api-zeus.dev.geehao.cn',
    RELEASE_HOST: 'http://zeus.api.sanhaolou.cn',

    DEBUG_DOMAIN: 'http://hawkeye.dev.geehao.cn',
    RELEASE_DOMAIN: 'http://hawkeye.sanhaolou.cn',

    COMPANY_NAME: '上海即好信息科技有限公司',


    DELTA_OF_DAY: (24 * 60 * 60 * 1000) - 1,

    STORAGE_KEY: {
        USER_INFO: 'user_info',
        LOGIN_MOBILE: 'login_mobile',
        NAV_LIST: 'nav_list',
        LAYOUT_STATUS: 'toggle_status',
        CONSTRUCT_ORDER_LIST: 'construct_order_list',
        CONSTRUCT_INSPECTION_LIST: 'construct_inspection_list',
        CONSTRUCT_PROBLEM_LIST: 'construct_problem_list',
    },

    ROUTE_MATCH: {
        'app': '首页',
        'task': '任务中心',
        'todos': '任务列表',
        'ps': '工地管理',
        'order': '订单列表',
        'inspection': '巡检列表',
        'problem': '问题列表'
    },

    SELECTION: {
        CONSTRUCT_ORDER_STATUS: [
            // { id: -1, value: '所有状态', name: '所有状态' },
            { id: 1, value: '已签约', name: '已签约' },
            { id: 2, value: '已开工', name: '已开工' },
            { id: 3, value: '已完工', name: '已完工' },
            { id: 4, value: '已验收', name: '已验收' },
            { id: 5, value: '已完成', name: '已完成' },
        ]
    }
}
