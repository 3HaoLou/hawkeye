<template>
    <div>
        <div class="ui top attached tabular menu">
            <a 
                class="item" 
                :class="{'active': activeTab === item}" 
                v-for="(item, index) in tabs" 
                :key="index" 
                :data-tab="'tab-' + index" 
                @click="onTabClicked(item)">
                {{item}}
            </a>
        </div>
        <slot></slot>
    </div>
</template>
<script>
    export default {
        name: 'j-tabs',
        props: {
            tabs: {
                type: Array,
                required: true
            },
            activeTab: {
                type: String,
                required: true
            }
        },
        mounted () {
            $('.attached.tabular.menu .item').tab();
        },
        methods: {
            onTabClicked (params) {
                this.$emit('on-tab-clicked', params);
            }
        }
    }
</script>
