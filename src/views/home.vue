<template>
    <div>
        <!-- <j-header :theme="'dark'">
            <a slot="left">
                <i class="list layout icon"></i>
            </a>
        </j-header> -->
        <div class="row">
            <div class="col-xs-12 col-md-2 m-m">
                <j-button :type="'primary'" @click="notify2"><i class="user icon"></i>按钮</j-button>
            </div>
            <div class="col-xs-12 col-md-2 m-m">
                <j-button :type="'info'" @click="notify2"><i class="user icon"></i>按钮</j-button>
            </div>
            <div class="col-xs-12 col-md-2 m-m">
                <j-button :type="'warning'" @click="notify3"><i class="user icon"></i>按钮</j-button>
            </div>
            <div class="col-xs-12 col-md-2 m-m">
                <j-button :type="'success'" @click="notify1"><i class="user icon"></i>按钮</j-button>
            </div>
            <div class="col-xs-12 col-md-2 m-m">
                <j-button :type="'danger'" @click="notify4"><i class="user icon"></i>按钮</j-button>
            </div>
            <div class="col-xs-12 col-md-2 m-m">
                <j-button :type="'dark'" @click="notify2"><i class="user icon"></i>按钮</j-button>
            </div>
            <div class="col-xs-12 col-md-2 m-m">
                <j-button :type="'default'" @click="notify2"><i class="user icon"></i>按钮</j-button>
            </div>
        </div>
        <!--<div class="row m-b-m">
            <div class="col-xs-24 col-md-6">
                <j-dropdown :items="dropdownList">
                    <j-button :type="'default'" slot="dropdown-item">File</j-button>
                    <j-dropdown-menu slot="dropdown-menu">
                        <j-dropdown-item v-for="(item, index) in dropdownList" :key="index">{{item.name}}</j-dropdown-item>
                    </j-dropdown-menu>
                </j-dropdown>
            </div>
        </div>
        <div class="row m-b-m">
            <j-tabs :tabs="tabs" :active-tab="selectedTab" @on-tab-clicked="onTabClicked">
                <j-tab :is-active="selectedTab === tabs[0]" :index="0">
                    <div>First</div>
                </j-tab>
                <j-tab :is-active="selectedTab === tabs[1]" :index="1">
                    <div>Second</div>
                </j-tab>
                <j-tab :is-active="selectedTab === tabs[2]" :index="2">
                    <div>Third</div>
                </j-tab>
            </j-tabs>
        </div>
        <div class="row m-b-m">
            <j-accordion v-for="(item, index) in [1,2,3]" :title="index" :is-full="true" :is-open="index === 0" :key="index">
                {{item}}
            </j-accordion>
        </div>
        <div class="row m-b-m">
            <div class="col-xs-24 col-md-12">
                <j-select v-model="selectedOption" :options="options"></j-select>
            </div>
            <div class="col-xs-24 col-md-12">
                <j-multi-select v-model="selectedOption1" :options="options1"></j-multi-select>
            </div>
        </div>
        <div class="row m-b-m">
            <div class="col-xs-12 col-md-2">
                <j-button :type="'default'" @click="openModal">default</j-button>
            </div>
            <div class="col-xs-12 col-md-2">
                <j-checkbox v-model="checkbox1" :label="'checkbox1'"></j-checkbox>
            </div>
            <div class="col-xs-12 col-md-2">
                <j-checkbox v-model="checkbox2" :label="'checkbox2'"></j-checkbox>
            </div>
            <j-modal :toggle="toggleModal" @resolve="modalResolve">
                <div>This is a modal!</div>
            </j-modal>
        </div>-->
    </div>
</template>
<script>
    import JHeader from '../components/header/index';
    import JButton from '../components/button/index';
    import JDropdown from '../components/dropdown/index';
    import JDropdownMenu from '../components/dropdown-menu/index';
    import JDropdownItem from '../components/dropdown-item/index';
    import JTabs from '../components/tabs/index';
    import JTab from '../components/tab/index';
    import JAccordion from '../components/accordion/index';
    import JSelect from '../components/select/index';
    import JMultiSelect from '../components/multi-select/index';
    import JModal from '../components/modal/index';
    import JCheckbox from '../components/checkbox/index';
    import JNotification from '../assets/js/services/notification';

    export default {
        components: {
            JHeader,
            JButton,
            JDropdown,
            JDropdownMenu,
            JDropdownItem,
            JTabs,
            JTab,
            JAccordion,
            JSelect,
            JMultiSelect,
            JModal,
            JCheckbox
        },
        data() {
            return {
                title: 'Home Page',
                dropdownList: [
                    { id: 1, name: 'Open...' },
                    { id: 2, name: 'Save as...' },
                    { id: 3, name: 'Rename...' },
                    { id: 4, name: 'Move to folder...' },
                    { id: 5, name: 'Move to trash...' },
                    { id: 6, name: 'Download As...' },
                ],
                tabs: ['tab1', 'tab2', 'tab3'],
                selectedTab: 'tab1',
                // selectedOption: { id: 2, name: 'VueJs', value: 'vue' },
                selectedOption: null,
                options: [
                    { id: 1, name: 'Angular', value: 'angular' },
                    { id: 2, name: 'Vue', value: 'vue' },
                    { id: 3, name: 'Rect', value: 'react' },
                ],
                selectedOption1: [
                    { id: 2, name: 'Vue', value: 'vue' },
                    { id: 3, name: 'Rect', value: 'react' },
                ],
                options1: [
                    { id: 1, name: 'Angular', value: 'angular' },
                    { id: 2, name: 'Vue', value: 'vue' },
                    { id: 3, name: 'Rect', value: 'react' },
                    { id: 4, name: 'Backbone', value: 'backbone' },
                    { id: 5, name: 'Ember', value: 'ember' },
                ],
                toggleModal: false,
                checkbox1: true,
                checkbox2: false
            }
        },
        watch: {
            'selectedOption' (value) {
                console.log(value);
            },
            'selectedOption1' (value) {
                console.log(value);
            },
            'checkbox1' (value) {
                console.log(value);
            },
            'checkbox2' (value) {
                console.log(value);
            }
        },
        methods: {
            onTabClicked(params) {
                this.selectedTab = params;
            },
            openModal() {
                this.toggleModal = true;
            },
            modalResolve(result) {
                this.toggleModal = false;
            },
            notify1 () {
                JNotification.open('success', 'This is a success message!', 2000);
            },
            notify2 () {
                JNotification.open('info', 'This is a primary message!', 2000);
            },
            notify3 () {
                JNotification.open('warning', 'This is a warning message!', 2000);
            },
            notify4 () {
                JNotification.open('negative', 'This is a negative message!', 2000);
            }
        }
    }
</script>