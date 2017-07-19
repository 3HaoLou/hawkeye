// import JAccordion from './components/accordion/index.js';
// import JButton from './components/button/index.js';
// import JCheckbox from './components/checkbox/index.js';
// import JDropdown from './components/dropdown/index.js';
// import JDropdownItem from './components/dropdown-item/index.js';
// import JDropdownMenu from './components/dropdown-menu/index.js';
// import JHeader from './components/header/index.js';
// import JModal from './components/modal/index.js';
// import JMultiSelect from './components/multi-select/index.js';
// import JNotification from './components/notification/index.js';
// import JSelect from './components/select/index.js';
// import JSidebar from './components/sidebar/index.js';
// import JTab from './components/tab/index.js';
// import JTabs from './components/tabs/index.js';
// // import JTooltip from './components/JTooltip/index.js';

// import './assets/css/style.css';

// const components = [
//     JAccordion,
//     JButton,
//     JCheckbox,
//     JDropdown,
//     JDropdownItem,
//     JDropdownMenu,
//     JHeader,
//     JModal,
//     JMultiSelect,
//     JSelect,
//     JSidebar,
//     JTab,
//     JTabs,
//     // JTooltip
// ];

// const install = function(Vue, opts = {}) {
//     if (install.installed) return;

//     components.map(component => {
//         Vue.component(component.name, component);
//     });

//     Vue.prototype.$notification = JNotification;
// }

// if (typeof window !== 'undefined' && window.Vue) {
//     install(window.Vue);
// }

// module.exports = {
//     version: '1.0.0',
//     JAccordion,
//     JButton,
//     JCheckbox,
//     JDropdown,
//     JDropdownItem,
//     JDropdownMenu,
//     JHeader,
//     JModal,
//     JMultiSelect,
//     JNotification,
//     JSelect,
//     JSidebar,
//     JTab,
//     JTabs,
//     // JTooltip
// };