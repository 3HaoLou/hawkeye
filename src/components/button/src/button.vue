<template>
    <button 
        class="ui button" 
        :class="[
            typeDefine[type],
            sizeDefine[size],
            isFull ? 'fluid' : '',
            disabled ? 'disabled' : '',
        ]" 
        :disabled="disabled" 
        @click="clickNative($event)">
        <slot></slot>
    </button>
</template>
<script>
    export default {
        name: 'j-button',
        props: {
            type: {
                type: String,
                default: 'default'
            },
            size: {
                type: String,
                default: 'md'
            },
            disabled: {
                type: Boolean,
                default: false
            },
            isFull: {
                type: Boolean,
                default: false
            },
        },
        data () {
            return {
                typeDefine: {
                    'default': 'basic',
                    'primary': 'purple',
                    'info': 'blue',
                    'success': 'green',
                    'warning': 'yellow',
                    'danger': 'red',
                    'dark': 'black',
                },
                sizeDefine: {
                    'xs': 'tiny',
                    'sm': 'small',
                    'md': 'medium',
                    'lg': 'large',
                    'xl': 'big'
                }
            }
        },
        methods: {
            clickNative (event) {
                this.$emit('click', event);
            }
        }
    }
</script>