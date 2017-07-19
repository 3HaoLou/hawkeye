<template>
    <div class="full-screen bg-effect-1" layout="row" layout-align="center center">
        <div class="ui middle aligned center aligned grid">
            <div class="column">
                <div class="ui blue header" layout="row" layout-align="center center">
                    <i class="logo-img"></i>
                    <div class="system-name">{{AppName}}</div>
                </div>
                <div class="ui large form">
                    <div class="ui stacked segment">
                        <div class="field">
                            <div class="ui left icon input">
                                <i class="user icon"></i>
                                <input type="text" v-model="mobile">
                            </div>
                        </div>
                        <div class="field">
                            <div class="ui left icon input">
                                <i class="lock icon"></i>
                                <input type="text" v-model="vcode">
                                <j-button class="w-m" :type="'info'" :disabled="disableVcodeBtn" @click="send">
                                    {{vcodeBtnDesc}}
                                </j-button>
                            </div>
                        </div>
                        <j-button :type="'info'" :is-full="true" :disabled="disableLogin" @click="login">
                            登录
                        </j-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import JButton from '../components/button/index';
    import { ValidateMobile, ValidateVcode } from '../assets/js/services/validate';
    import { Vcode, Login } from '../assets/js/api/base';
    import NotificationService from '../assets/js/services/notification';
    import AccountService from '../assets/js/services/account';
    import NOTE from '../assets/js/constants/note';
    import CONFIG from '../assets/js/constants/config';

    export default {
        name: 'login-page',
        components: {
            JButton
        },
        data () {
            return {
                AppName: CONFIG.APP_NAME,
                mobile: AccountService.getLoginMobile() || '',
                vcode: '',
                vcodeBtnDesc: NOTE.VCODE_DESC,
                disableVcodeBtn: false,
                disableLogin: true,
                timer: null
            }
        },
        watch: {
            'mobile' (value) {
                this.checkMobile(value);
            },
            'vcode' (value) {
                this.checkVcode(value);
            }
        },
        mounted () {
            this.resetUserInfo();
        },
        beforeDestroy () {
            this.stopCountDown();
        },
        methods: {
            checkMobile (mobile) {
                this.disableVcodeBtn = !mobile;
            },
            checkVcode (vcode) {
                this.disableLogin = !(this.mobile && vcode);
            },
            send () {
                let mobile = this.mobile;
                let mobileResult = ValidateMobile(mobile);

                if (mobileResult === -1) {
                    NotificationService.open('warning', NOTE.MOBILE_EMPTY);
                    return;
                } else if (mobileResult === -2) {
                    NotificationService.open('warning', NOTE.MOBILE_ERROR);
                    return;
                }

                console.info('login mobile:', mobile);

                Vcode(mobile).then(
                    (data) => {
                        if (data.result && data.result.toLowerCase() === 'success') {
                            NotificationService.open('success', NOTE.SEND_VCODE_SUCCESS);

                            this.startCountDown();
                        }
                    }
                )
            },
            login () {
                let mobile = this.mobile;
                let mobileResult = ValidateMobile(mobile);
                let vcode = this.vcode;
                let vcodeResult = ValidateVcode(vcode);

                if (mobileResult === -1) {
                    NotificationService.open('warning', NOTE.MOBILE_EMPTY);
                    return;
                } else if (mobileResult === -2) {
                    NotificationService.open('warning', NOTE.MOBILE_ERROR);
                    return;
                }

                if (vcodeResult === -1) {
                    NotificationService.open('warning', NOTE.VCODE_EMPTY);
                    return;
                } else if (vcodeResult === -2) {
                    NotificationService.open('warning', NOTE.VCODE_ERROR);
                    return;
                }

                console.info('login mobile and vcode:', mobile, vcode);

                AccountService.setLoginMobile(mobile);

                Login(mobile, vcode).then(
                    (data) => {
                        console.log(data);
                        if (data.user) {
                            NotificationService.open('success', NOTE.LOGIN_SUCCESS);

                            this.$store.dispatch('userInfo', data.user);

                            this.$store.dispatch('sideMenu');

                            this.stopCountDown();

                            setTimeout(() => {
                                this.$router.push({
                                    name: 'app.home'
                                });
                            }, 1000);
                        }
                    }
                )
            },
            resetUserInfo () {
                AccountService.removeUserInfo();
                AccountService.removeNavMenu();
            },
            startCountDown () {
                let count = 60;

                this.disableVcodeBtn = true;

                this.vcodeBtnDesc = count;

                this.timer = setInterval(() => {
                    if (this.vcodeBtnDesc > 0) {
                        --this.vcodeBtnDesc;
                    } else {
                        this.stopCountDown();
                    }
                }, 1000);
            },
            stopCountDown () {
                clearInterval(this.timer);

                this.vcodeBtnDesc = NOTE.VCODE_DESC;

                this.checkMobile(this.mobile);
            }
        }
    }
</script>
