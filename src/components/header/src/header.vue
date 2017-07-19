<template>
    <div class="ui clearing segment" :class="[ theme + ' inverted' ]">
        <h5 class="ui right floated header">
            <slot name="right"></slot>
        </h5>
        <h5 class="ui left floated header">
            <slot name="left"></slot>
        </h5>
    </div>
</template>
<script>
    export default {
        name: 'j-header',
        props: {
            theme: {
                type: String,
                default: 'grey'
            }
        }
    }
</script>
