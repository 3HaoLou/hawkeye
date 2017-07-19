<template>
    <div class="ui modal">
        <div class="header">Modal Header</div>
        <div class="content h-m scroll-content-y">
            <slot></slot>
        </div>
        <div class="actions">
            <div class="ui blue approve button">确认</div>
            <div class="ui red cancel button">返回</div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'j-modal',
        props: {
            toggle: {
                type: Boolean,
                default: false
            }
        },
        watch: {
            'toggle' (value) {
                if (value) {
                    this.openModal();
                } else {
                    this.closeModal();
                }
            }
        },
        mounted () {
            $(this.$el).modal({
                onApprove: this.approve,
                onHide: this.hide,
                onDeny: this.cancel
            });
        },
        methods: {
            openModal () {
                $(this.$el).modal('show');
            },
            closeModal () {
                $(this.$el).modal('hide');
            },
            approve (element) {
                let params = {
                    status: 'confirm',
                    result: null
                };

                this.$emit('resolve', params);
            },
            hide (element) {
                let params = {
                    status: 'hide',
                    result: null
                };

                this.$emit('resolve', params);
            },
            cancel (element) {
                let params = {
                    status: 'cancel',
                    result: null
                };

                this.$emit('resolve', params);
            }
        }
    }
</script>
