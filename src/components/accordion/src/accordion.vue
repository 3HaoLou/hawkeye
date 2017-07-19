<template>
    <div class="ui styled accordion" :class="{'fluid': isFull}">
        <div class="active title">
            <i class="dropdown icon"></i>
            {{title}}
        </div>
        <div class="active content">
            <slot></slot>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'j-accordion',
        props: {
            title: String|Number,
            isOpen: {
                type: Boolean,
                default: false
            },
            isFull: {
                type: Boolean,
                default: false
            }
        },
        mounted () {
            if (this.isOpen) {
                $(this.$el).accordion('open', 0);
            } else {
                $(this.$el).accordion('close', 0);
            }
        }
    }
</script>
