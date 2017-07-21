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
            <div class="right menu">
                <div class="p-l-s p-r-s" layout="row" layout-align="center center">
                    <i class="user-img m-r-m"></i>
                    <div class="ui dropdown">
                        <div class="text" v-if="userInfo">{{userInfo.name}}</div>
                        <i class="dropdown icon"></i>
                        <div class="menu">
                            <!-- <a class="item">上班</a>
                            <a class="item">下班</a>
                            <a class="item">修改密码</a> -->
                            <a class="item" @click="logout">退出登录</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="pusher">
            <slot name="content"></slot>
        </div>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex';
    import { Logout } from '../../../assets/js/api/base';
    import NotificationService from '../../../assets/js/services/notification';
    import AccountService from '../../../assets/js/services/account';
    import CONFIG from '../../../assets/js/constants/config';
    import NOTE from '../../../assets/js/constants/note';

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
        computed: {
            ...mapGetters([
                'userInfo'
            ])
        },
        mounted () {
            $('.ui.sidebar')
                .sidebar('setting', 'transition', 'overlay')
                .sidebar('hide')
                .sidebar('attach events', '.item', 'show')
                .sidebar('attach events', '.sub-content', 'hide');

            $('.ui.dropdown').dropdown();

            this.$store.dispatch('userInfo');
        },
        methods: {
            logout () {
                Logout().then((data) => {
                    $('.ui.sidebar').sidebar('hide');
                    
                    if (data.result && data.result.toLowerCase() === 'success') {
                        NotificationService.open('success', NOTE.LOGOUT_SUCCESS);
                    }

                    this.$router.push({
                        name: 'login'
                    })
                });
            }
        }
    }
</script>
