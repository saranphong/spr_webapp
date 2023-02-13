<template>
    <font-awesome-icon icon="fa-solid fa-pen" />
    บริษัท สมปอง รับเบอร์ รีเทรดดิ้ง จำกัด<br>
    <div class="row">
        <div class="col-2">
            <label>วันที่</label>
            <datepicker @getDate="getDate" class="text form-control shadow mb-3" style="color:red; text-align:center" />
        </div>
    </div>
    <div class="row">
        <div class="col-2">
            <a-space direction="vertical" :size="15">
                <a-config-provider :locale="locale">
                    <a-date-picker v-model:value="value2" :format="dateFormatList" class="rounded-3 shadow-lg" />
                </a-config-provider>
            </a-space>
        </div>
    </div>
    Select Date From MyDatepicker = {{ this.isDate }} <br />
    Select Date From AntD datePicker = {{ this.value2 }}
</template>
<script>
import datepicker from "@/Mycomponents/Mydatepicker.vue";
import dayjs from 'dayjs';
import 'dayjs/locale/th';
import locale from 'ant-design-vue/es/date-picker/locale/th_TH';
// import { ref } from 'vue';
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
let d = new Date();
let day = dayjs(d);
dayjs.locale('th')

// const myDate = new Date();
// const myMonth = myDate.getMonth() + 1;
// const newDate = myDate.getDate() + "/" + myMonth + "/" + myDate.getFullYear();


export default {
    components: {
        datepicker,
    },
    data() {
        return {
            isDate: "",
            dateFormatList,
            value2: dayjs(day, "DD/MM/YYYY"),
            locale,
        }
    },
    methods: {
        getDate(val) {
            this.isDate = val;
        }
    },
}
</script>