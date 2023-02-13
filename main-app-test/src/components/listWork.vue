// แสดงรายการใบรับยาง
<template>
    <div class="card card-primary shadow-lg" style="width:100%;">
        <div class="card-header bg-primary" style="color:white;">
            ::: แสดงรายการ-ใบรับยาง :::
        </div>
        <div class="card-body">
            <table id="showbillimport" class="table table-striped table-hover table-sm"
                style="width: 100%; align-items: center">
                <thead>
                    <tr style="color:darkblue">
                        <th>เล่มที่</th>
                        <th>เลขที่</th>
                        <th>ลูกค้า</th>
                        <th>ประเภทงาน</th>
                        <th>วันที่ออกใบรับ</th>
                        <th>สถานะ</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody class="table-group-divider">
                    <tr v-for="rec in get_import_header" :key="rec.import_id" @click.prevent="addImportDetail(rec);">
                        <td>{{ rec.import_book_id }}</td>
                        <td>{{ rec.import_book_no }}</td>
                        <td>{{ rec.customerName }}</td>
                        <td>{{ rec.job_type_name }}</td>
                        <td>{{ rec.new_import_date }}</td>
                        <!-- <td style="color:red" v-if="rec.import_status == 'รอดำเนินการ'">{{ rec.import_status }}</td>
                        <td style="color:green" v-else>{{ rec.import_status }}</td> -->
                        <td v-if="rec.import_status == 'รอดำเนินการ'">
                            <font-awesome-icon icon="fa-solid fa-gears" style="color:blue" />
                        </td>
                        <td v-else>
                            <font-awesome-icon icon="fa-solid fa-check" style="color:greenyellow" />
                        </td>
                        <td style="text-align: left">
                            <button id="edit" type="button" class="btn btn-dark btn-sm me-md-2" disabled
                                v-if="rec.import_status == 'เสร็จสิ้น'">
                                <font-awesome-icon icon="fa-solid fa-pen" />
                            </button>
                            <!-- <button id="edit" type="button" class="btn btn-primary btn-sm me-md-2" v-else>
                                <font-awesome-icon icon="fa-solid fa-pen" />
                            </button> -->
                            <button id="addbill" type="button" class="btn btn-success btn-sm me-md-2"
                                @click.prevent="addImportDetail(rec);">
                                <font-awesome-icon icon="fa-solid fa-file-circle-plus" />
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from "@/axios";
import $ from "jquery";
import func from "../func.js";
export default {
    data() {
        return {
            func: func,
            get_import_header: [],
            import_header: {
                import_book_id: "",
                import_book_no: "",
                cust_auto_id: "",
                import_user: "",
                import_type_id: "",
                import_date: "",
                import_status: "",
            },
        }
    },
    mounted() {
        this.getImportHeader();
    },
    methods: {
        getImportHeader() {
            axios.get(`billimport/read`).then((response) => {
                this.get_import_header = response.data;
                this.setDatatables();
            });
        },
        setDatatables() {
            $(document).ready(() => {
                $("#showbillimport").DataTable({
                    "scrollY": '350px',
                    bJQueryUI: true,
                    sPaginationType: "full_numbers",
                    language: {
                        decimal: "",
                        emptyTable: "ไม่พบการข้อมูลจากฐานข้อมูล",
                        info: "พบข้อมูล _TOTAL_ เรคอร์ด",
                        // "info": "แสดง _START_ - _END_ แถว จากทั้งหมด _TOTAL_ แถว",
                        infoEmpty: "ไม่พบข้อมูลที่ค้นหา",
                        infoFiltered: "(จากข้อมูลทั้งหมด _MAX_ เรคอร์ด)",
                        infoPostFix: "",
                        thousands: ",",
                        lengthMenu: "แสดงครั้งละ _MENU_ เรคอร์ด",
                        loadingRecords: "Loading...",
                        processing: "",
                        search: "ค้นหาข้อมูล:",
                        zeroRecords: "ไม่พบข้อมูลที่ค้นหา",
                        paginate: {
                            first: "หน้าแรก",
                            last: "หน้าสุดท้าย",
                            next: "ต่อไป",
                            previous: "ย้อนกลับ",
                        },
                        aria: {
                            sortAscending: ": activate to sort column ascending",
                            sortDescending: ": activate to sort column descending",
                        },
                    },
                });
            });
        },
        async addImportDetail(rec) {
            sessionStorage.setItem("import_id", rec.import_id);
            this.$router.push("/importWork");
        },
    },
}
</script>

<style scoped>
table .collapse.in {
    display: table-row;
}
</style>