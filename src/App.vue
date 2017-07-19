<template>
    <div>
        <router-view></router-view>
        <j-loading></j-loading>
    </div>
</template>
<script>
    import JLoading from './components/loading/index.js';

    export default {
        components: {
            JLoading
        },
        data() {
            return {}
        },
        mounted() {
            console.info('app is running!');
        }
    }
</script>