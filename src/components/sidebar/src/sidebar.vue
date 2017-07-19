<template>
    <div>
        <div class="ui sidebar inverted vertical menu" :class="[ direction ]">
            <slot name="sidebar"></slot>
        </div>
        <div class="ui top fixed menu">
            <a class="launch icon item">
                <i class="content icon"></i>
            </a>
            <div class="item">{{AppName}}</div>
            <div class="right menu"></div>
        </div>
        <div class="pusher">
            <slot name="content"></slot>
        </div>
    </div>
</template>
<script>
    import CONFIG from '../../../assets/js/constants/config';

    export default {
        name: 'j-sidebar',
        props: {
            direction: {
                type: String,
                required: true
            }
        },
        data () {
            return {
                AppName: CONFIG.APP_NAME
            }
        },
        mounted () {
            $('.ui.sidebar')
                .sidebar('setting', 'transition', 'overlay')
                .sidebar('hide')
                .sidebar('attach events', '.item', 'show')
                .sidebar('attach events', '.sub-content', 'hide');
        }
    }
</script>
