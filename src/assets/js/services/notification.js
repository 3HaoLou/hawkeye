import Notification from '../../../components/notification/src/notification';

const TYPE_TITLE = {
    'success': '成功',
    'info': '信息',
    'warning': '提醒',
    'negative': '错误',
};

export default {
    open: open
}

function open(type, message, duration) {
    if (!Notification) return;

    let options = {
        type: type,
        title: TYPE_TITLE[type],
        message: message,
        duration: duration ? duration : 2000
    };

    Notification(options);
}