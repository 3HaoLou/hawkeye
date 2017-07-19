<template>
    <div class="loading-container" layout="row" layout-align="center center" v-show="loadingStatus">
        <div class="loading"></div>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex'

    export default {
        name: 'j-loading',
        computed: {
            ...mapGetters([
                'loadingStatus'
            ])
        }
    }
</script>
