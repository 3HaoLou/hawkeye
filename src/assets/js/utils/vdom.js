/**
 * Created by jason on 24/06/2017.
 */
import { hasOwn } from './util';

export function isVNode(node) {
    return typeof node === 'object' && hasOwn(node, 'componentOptions');
}

export function getFirstComponentChild(children) {
    return children && children.filter(c => c && c.tag)[0];
}
