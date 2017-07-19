<template>
    <div class="ui buttom attached tab segment" :class="{'active': isActive}" :data-tab="'tab-' + index">
        <slot></slot>
    </div>
</template>
<script>
    export default {
        name: 'j-tab',
        props: {
            isActive: {
                type: Boolean,
                default: false,
            },
            index: {
                type: Number,
                required: true
            }
        }
    }
</script>
