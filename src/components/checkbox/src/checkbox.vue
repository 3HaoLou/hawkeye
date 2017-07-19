<template>
    <div class="ui checkbox">
        <input type="checkbox">
        <label>{{label}}</label>
    </div>
</template>
<script>
    export default {
        name: 'j-checkbox',
        props: {
            value: Boolean,
            label: String
        },
        mounted () {
            if (this.value) {
                $(this.$el).checkbox('set checked');
            } else {
                $(this.$el).checkbox('set unchecked');
            }

            $(this.$el).checkbox({ onChange: this.onCheck });
        },
        methods: {
            onCheck () {
                this.$emit('input', this.$el.children[0].checked);
            }
        }
    }
</script>
