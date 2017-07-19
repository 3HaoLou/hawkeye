<template>
    <div class="ui vertical fluid inverted accordion">
         <div class="item" v-for="(item, index) in sideMenu" :key="index">
            <a class="title w-full" style="display: block;">
                <i class="dropdown icon"></i>
                {{item.moduleName}}
            </a>
            <div class="content">
                <div class="ui inverted middle aligned selection list" v-if="item.childMenus">
                    <div class="item" v-for="(subItem, index) in item.childMenus" :key="index">
                        <div class="content">
                            <div class="header p-s txt-align-center" @click="toView(subItem.uri)">
                                {{subItem.moduleName}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    </div>
</template>
<script>
    import { mapGetters } from 'vuex';

    export default {
        name: 'j-menu',
        data () {
            return {}
        },
        computed: {
            ...mapGetters([
                'sideMenu'
            ])
        },
        mounted () {
            $('.ui.accordion')
                .accordion();

            this.$store.dispatch('sideMenu');
        },
        methods: {
            toView(uri) {
                this.$router.push({
                    name: uri
                });
            }
        }
    }
</script>
