<template>
    <div class="ui dropdown">
        <slot name="dropdown-item"></slot>
        <slot name="dropdown-menu"></slot>
    </div>
</template>
<script>
    export default {
        name: 'j-dropdown',
        mounted () {
            $(this.$el).dropdown();
        }
    }
</script>
