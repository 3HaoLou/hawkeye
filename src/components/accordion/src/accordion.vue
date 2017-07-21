<template>
    <div class="ui styled accordion" :class="{'fluid': isFull}">
        <div class="active title" :style="titleStyle">
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
            },
            value: Boolean
        },
        data () {
            return {
                titleStyle: {
                    color: '#333'
                },
                status: false
            }
        },
        watch: {
            'value' (status) {

                if (status) {
                    $(this.$el).accordion('open', 0);
                } else {
                    $(this.$el).accordion('close', 0);
                }
            }
        },
        mounted () {
            this.init();

            $(this.$el).accordion({ onChange: this.onChange });
        },
        methods: {
            init () {
                if (this.isOpen) {
                    this.status = true;
                    $(this.$el).accordion('open', 0);
                } else {
                    this.status = false;
                    $(this.$el).accordion('close', 0);
                }
            },
            onChange () {
                this.status = !this.status;

                this.$emit('input', this.status);
            },
        }
    }
</script>
