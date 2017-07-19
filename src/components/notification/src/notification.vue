<template>
    <transition name="j-notification">
        <div class="j-notification" :style="{ top: top ? top + 'px' : 'auto' }" v-show="visible" @mouseenter="clearTimer" @mouseleave="startTimer" @click="click">
            <div class="ui message icon" :class="type">
                <i class="icon" :class="{'checkmark': type === 'success', 'info': type === 'info', 'warning': type === 'warning', 'remove': type === 'negative'}"></i>
                <div class="content">
                    <div class="header">
                        {{title}}
                    </div>
                    <slot>{{message}}</slot>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
    /**
     * @type {string} success 
     * @type {string} info 
     * @type {string} warning 
     * @type {string} negative 
     */
    export default {
        name: 'j-notification',
        data () {
            return {
                visible: false,
                title: '',
                message: '',
                duration: 3000,
                type: '',
                customClass: '',
                onClose: null,
                onClick: null,
                closed: false,
                top: null,
                timer: null
            };
        },
        mounted () {
            if (this.duration > 0) {
                this.timer = setTimeout(() => {
                    if (!this.closed) {
                        this.close();
                    }
                }, this.duration);
            }
        },
        watch: {
            closed (value) {
                if (value) {
                    this.visible = false;
                    this.$el.addEventListener('transitionend', this.destroyElement);
                }
            }
        },
        methods: {
            destroyElement (event) {
                this.$el.removeEventListener('transitionend', this.destroyElement);
                this.$destroy(true);
                this.$el.parentNode.removeChild(this.$el);
            },
            click() {
                if (typeof this.onClick === 'function') {
                    this.onClick();
                }
            },
            close () {
                this.closed = true;

                if (typeof this.onClose === 'function') {
                    this.onClose();
                }
            },
            clearTimer() {
                clearTimeout(this.timer);
            },
            startTimer() {
                if (this.duration > 0) {
                    this.timer = setTimeout(() => {
                        if (!this.closed) {
                            this.close();
                        }
                    }, this.duration);
                }
            }
        }
    }
</script>