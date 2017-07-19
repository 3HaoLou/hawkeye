/**
 * Created by jason on 24/06/2017.
 */
import Vue from 'vue';

const trim = function(str) {
    return (str || '').replace(/^[\s\uFEFF]+[\s\uFEFF]+$/g, '');
};

export function hasClass(el, cls) {
    if (!el || !cls) return false;

    if (cls.indexOf(' ') !== -1) throw new Error('className error');

    if (el.classList) {
        return el.classList.contains(cls);
    } else {
        return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
    }
}

export function addClass(el, cls) {
    if (!el) return;

    let currentCls = el.className;
    let classes = (cls || '').split( );

    for(let i = 0, j = classes.length; i < j; i++) {
        let clsName = classes[i];

        if (!clsName) continue;

        if (el.classList) {
            el.classList.add(clsName);
        } else {
            if (!hasClass(el, clsName)) {
                currentCls += ' ' + clsName;
            }
        }
    }

    if (!el.classList) {
        el.className = currentCls;
    }
}

export function removeClass(el, cls) {
    if (!el || !cls) return;

    let classes = cls.split(' ');
    let currentCls = ' ' + el.className + ' ';

    for(let i = 0, j = classes.length; i < j; i++) {
        let clsName = classes[i];

        if (!clsName) continue;

        if (el.classList) {
            el.classList.remove(clsName);
        } else {
            if (hasClass(el, clsName)) {
                currentCls = currentCls.replace(' ' + clsName + ' ', ' ');
            }
        }
    }

    if (!el.classList) {
        el.className = trim(currentCls);
    }
}