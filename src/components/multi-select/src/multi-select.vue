<template>
    <div class="ui multiple search selection dropdown">
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
            value: Array,
            options: Array
        },
        data () {
            return {
                defaultText: '请选择'
            };
        },
        mounted () {
            console.log(this.value);
            if (this.value && this.value.length > 0) {
                let items = []

                this.value.forEach((item) => {
                    items.push(item.value);
                });

                $(this.$el).dropdown('set selected', items);
            }

            $(this.$el).dropdown({ allowAdditions: true, onChange: this.onSelect })
        },
        methods: {
            onSelect (value, text) {
                let selectedItem = [];
                let items = value.indexOf(',') ? value.split(',') : [];

                items.forEach((item) => {
                    this.options.forEach((option) => {
                        if (item === option.value) {
                            selectedItem.push(option);    
                        }
                    });    
                })

                this.$emit('input', selectedItem);
            }
        }
    }
</script>

