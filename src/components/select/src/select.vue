<template>
    <div class="ui selection dropdown">
        <input type="hidden">
        <i class="dropdown icon"></i>
        <div class="default text" v-text="defaultText"></div>
        <div class="menu">
            <div class="item" :data-value="item.value" v-for="(item, index) in options" :key="index">{{item.name}}</div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'j-select',
        props: {
            value: Object,
            options: Array
        },
        data () {
            return {
                defaultText: '请选择'
            };
        },
        mounted () {
            if (this.value) {
                $(this.$el).dropdown('set selected', this.value.value);
            }

            $(this.$el).dropdown({ onChange: this.onSelect })
        },
        methods: {
            onSelect (value, text) {
                let selectedItem;

                this.options.forEach((option) => {
                    if (value === option.value) {
                        selectedItem = option;    
                    }
                });

                this.$emit('input', selectedItem);
            }
        }
    }
</script>
