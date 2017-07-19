<template>
    <j-sidebar :direction="'left'">
        <j-menu slot="sidebar"></j-menu>
        <div class="sub-content" slot="content">
            <router-view></router-view>
        </div>
    </j-sidebar>
</template>
<script>
    import JSidebar from '../components/sidebar/index';
    import JMenu from '../components/menu/index';

    export default {
        name: 'j-layout',
        components: {
            JSidebar,
            JMenu
        }
    }
</script>
