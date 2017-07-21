<template>
    <div class="ui search selection dropdown">
        <input type="hidden" name="country" value="kp">
        <i class="dropdown icon"></i>
        <input class="search">
        <div class="default text" v-text="defaultText"></div>
        <div class="menu">
            <div class="item">Choice 1</div>
            <div class="item">Choice 2</div>
            <div class="item">Choice 3</div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'j-autocomplete',
        props: {
            // asyncRequest: Function,
            // defaultText: String,
            value: String,
            options: Array
        },
        data () {
            return {
                defaultText: '请选择'
                // options: []
            }
        },
        watch: {
            'value' (value) {
                console.log(value);
            },
            'defaultText' (value) {
                console.log(value);
            },
            'options' (value) {
                console.log(value);
            }
        },
        mounted () {
            $(this.$el).dropdown({ onChange: this.onChange });
        },
        methods: {
            onChange (value, text) {
                console.log(value);

                this.$emit('input', value);

                this.$emit('onInput');
            }
        }
    }
</script>
