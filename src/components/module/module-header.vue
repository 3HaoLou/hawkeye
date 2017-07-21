<template>
    <div class="module-header ui segment" layout="row" layout-align="space-between center">
        <div class="">
            <slot name="left"></slot>
        </div>
        <div class="">
            <slot name="center"></slot>
        </div>
        <div class="">
            <slot name="right"></slot>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'j-module-header',
        data () {
            return {}
        },
    }
</script>
