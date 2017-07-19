import Vue from 'vue';
import PopupManager from '../../../assets/js/utils/popup/popup-manager';
import { isVNode } from '../../../assets/js/utils/vdom';
import NotificationComponent from './notification.vue';

let NotificationView = Vue.component(NotificationComponent.name, NotificationComponent);
let instance;
let instances = [];
let seed = 1;

let Notification = function(options) {
    if (Vue.prototype.$isServer) return;

    options = options || {};

    let userOnClose = options.onClose;
    let id = 'notification_' + seed++;

    options.onClose = function() {
        Notification.close(id, userOnClose);
    };

    instance = new NotificationView({
        data: options
    });

    if (isVNode(options.message)) {
        instance.$slots.default = [options.message];
        options.message = '';
    }

    instance.id = id;
    instance.vm = instance.$mount();
    document.body.appendChild(instance.vm.$el);
    instance.vm.visible = true;
    instance.dom = instance.vm.$el;
    instance.dom.style.zIndex = PopupManager.nextZIndex();

    let topDistance = options.offset || 0;
    for (let i = 0, len = instances.length; i < len; i++) {
        topDistance += instances[i].$el.offsetHeight + 16;
    }

    topDistance += 16;
    instance.top = topDistance;
    instances.push(instance);

    return instance.vm;
};

['primary', 'success', 'warning', 'error'].forEach(type => {
    Notification[type] = options => {
        if (typeof options === 'string' || isVNode(options)) {
            options = {
                message: options
            };
        }

        options.type = type;
        return Notification(options);
    };
});

Notification.close = function(id, userOnClose) {
    let index;
    let removeHeight;
    for (var i = 0, len = instances.length; i < len; i++) {
        if (id === instances[i].id) {
            if (typeof userOnClose === 'function') {
                userOnClose(instances[i]);
            }

            index = i;
            removeHeight = instances[i].dom.offsetHeight;
            instances.splice(i, 1);
            break;
        }
    }

    if (len > 1) {
        for (i = index; i < len - 1; i++) {
            instances[i].dom.style.top = parseInt(instances[i].dom.style.top, 10) - removeHeight - 16 + 'px';
        }
    }
};

export default Notification;