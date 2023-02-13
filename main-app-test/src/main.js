import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/sidebars.css";
//import "bootstrap/dist/js/bootstrap.js";
//import "bootstrap/dist/js/bootstrap.min.js"
// import "bootstrap/dist/js/bootstrap.bundle.min.js"
import "bootstrap/dist/js/sidebars.js";
import Vue3Sidebar from 'vue-3-sidebar'

import "jszip"
import "pdfmake"
import "jquery"
import "datatables.net-bs5"

import "datatables.net-autofill-bs5";
import "datatables.net-buttons-bs5"
import "datatables.net-buttons/js/buttons.colVis.js"
import "datatables.net-buttons/js/buttons.html5.js"
import "datatables.net-buttons/js/buttons.print.js"
import "datatables.net-bs5/js/dataTables.select.min.js"
import "datatables.net-bs5/css/select.dataTables.min.css"

// seelect2
import "bootstrap/dist/js/select2/jquery.min.js"
import "bootstrap/dist/js/select2/select2.min.js"
import "bootstrap/dist/css/select2/select2.css"
import "bootstrap/dist/css/select2/select2.min.css"
import "bootstrap/dist/css/select2-bootstrap-5-theme.css"

// date picker
import "bootstrap/bootstrap-datepicker/js/bootstrap-datepicker.js"
import "bootstrap/bootstrap-datepicker/css/bootstrap-datepicker.css"

// import "bootstrap-datepicker/locales/bootstrap-datepicker.th.min.js"

// dashnav menu

// import "../lib/jquery/jquery.min.js";
// import "../lib/bootstrap/js/bootstrap.bundle.min.js";
// import "../lib/feathericons/feather.min.js";
// import "../lib/perfect-scrollbar/perfect-scrollbar.min.js";
// import "./assets/js/script.js";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';
/* import specific icons */
import { faPen } from '@fortawesome/free-solid-svg-icons/faPen';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons/faTrashCan';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faBan } from '@fortawesome/free-solid-svg-icons/faBan';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons/faCircleCheck';
import { faAddressBook } from '@fortawesome/free-solid-svg-icons/faAddressBook';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons/faUserPlus';
import { faUserPen } from '@fortawesome/free-solid-svg-icons/faUserPen';
import { faSignOut } from '@fortawesome/free-solid-svg-icons/faSignOut';
import { faFolderOpen } from "@fortawesome/free-regular-svg-icons/faFolderOpen";
import { faCheckToSlot } from "@fortawesome/free-solid-svg-icons/faCheckToSlot";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons/faCartPlus";
import { faFileCircleXmark } from "@fortawesome/free-solid-svg-icons/faFileCircleXmark";
import { faUserShield } from "@fortawesome/free-solid-svg-icons/faUserShield";
import { faFileCirclePlus } from "@fortawesome/free-solid-svg-icons/faFileCirclePlus";
import { faLightbulb } from "@fortawesome/free-regular-svg-icons/faLightbulb";
import { faFileLines } from "@fortawesome/free-solid-svg-icons/faFileLines";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { faGears } from "@fortawesome/free-solid-svg-icons/faGears";
import { faUsersGear } from "@fortawesome/free-solid-svg-icons/faUsersGear";
import { faCalendar } from "@fortawesome/free-regular-svg-icons/faCalendar";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons/faAngleUp";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons/faAngleDown";
import { faArrowDownShortWide } from "@fortawesome/free-solid-svg-icons/faArrowDownShortWide";
import { faArrowUpShortWide } from "@fortawesome/free-solid-svg-icons/faArrowUpShortWide";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";
import { faMagnifyingGlassPlus } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlassPlus";
import { faMagnifyingGlassMinus } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlassMinus";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons/faRotateRight";
import { faDownLong } from "@fortawesome/free-solid-svg-icons/faDownLong";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons/faFloppyDisk"; // <font-awesome-icon icon="fa-solid fa-floppy-disk" />
import { faDownload } from "@fortawesome/free-solid-svg-icons/faDownload";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars"; //<font-awesome-icon icon="fa-solid fa-bars" />

/* add icons to the library */
library.add(
    faPen, faTrashCan, faPlus, faCircleCheck, faBan,
    faAddressBook, faUserPlus, faUserPen, faSignOut,
    faFolderOpen, faCheckToSlot, faCartPlus, faFileCircleXmark, faUserShield,
    faFileCirclePlus, faLightbulb, faFileLines, faCheck, faGears, faCalendar, faUsersGear,
    faAngleUp, faAngleDown, faArrowDownShortWide, faArrowUpShortWide, faMagnifyingGlass,
    faMagnifyingGlassPlus, faMagnifyingGlassMinus, faRotateRight, faDownLong, faFloppyDisk,
    faDownload, faBars
)

// DatePicker
// import Datepicker from "@vuepic/vue-datepicker"
// import "@vuepic/vue-datepicker/dist/main.css"

import { createApp } from "vue";
import App from "./App.vue";
import './registerServiceWorker'
import router from "./router";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css"
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css"

createApp(App).
    use(router).
    use(Vue3Sidebar).
    use(Antd).
    component("font-awesome-icon", FontAwesomeIcon).
    component("Loading", Loading).
    mount("#app");
//createApp(App).use(router).use(Vue3Sidebar).use(VueTheMask).mount("#app");
