<template>
    <!-- เพิ่มลายดอกยาง -->
    <div class="modal fade" id="newStyleM" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header bg-primary bg-opacity-75">
                    <h1 class="modal-title fs-5" id="exampleModalLabel" style="color:white">เพิ่มข้อมูลลายดอก</h1>
                    <button type="button" class="btn-close" aria-label="Close"
                        @click.prevent="this.func.hideModal('newStyleM')"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-floating mb-2">
                            <input type="text" class="form-control" id="inputStyle1"
                                @keypress="this.func.fixCharecter($event)"
                                @input="this.styleNew.rub_style_name = this.styleNew.rub_style_name.toUpperCase()"
                                @keyup.enter="this.func.setFocus('inputStyleDesc1')" required placeholder="ชื่อลายดอก"
                                v-model="this.styleNew.rub_style_name">
                            <label for="floatingInput">ชื่อลายดอก</label>
                        </div>
                        <div class="form-floating mb-2">
                            <input type="text" class="form-control" id="inputStyleDesc1"
                                @input="this.styleNew.rub_style_desc = this.styleNew.rub_style_desc.toUpperCase()"
                                @keyup.enter="saveNewStyle();" required placeholder="คำอธิบาย"
                                v-model="this.styleNew.rub_style_desc">
                            <label for="floatingInput">คำอธิบาย</label>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary"
                        @click.prevent="this.func.hideModal('newStyleM')">ปิด</button>
                    <button type="button" class="btn btn-primary" @click.prevent="saveNewStyle();">บันทึก</button>
                </div>
            </div>
        </div>
    </div>
    <!-- แก้ไขลายดอกยาง -->
    <div class="modal fade" id="editStyleM" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header bg-danger bg-opacity-75">
                    <h1 class="modal-title fs-5" id="exampleModalLabel" style="color:white">แก้ไขข้อมูลลายดอก</h1>
                    <button type="button" class="btn-close" aria-label="Close"
                        @click.prevent="this.func.hideModal('editStyleM')"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-floating mb-2">
                            <input type="text" class="form-control" id="inputStyle2"
                                @keypress="this.func.fixCharecter($event)"
                                @input="this.styleEdit.rub_style_name = this.styleEdit.rub_style_name.toUpperCase()"
                                @keyup.enter="this.func.setFocus('inputStyleDesc2')" required placeholder="ชื่อลายดอก"
                                v-model="this.styleEdit.rub_style_name">
                            <label for="floatingInput">ชื่อลายดอก</label>
                        </div>
                        <div class="form-floating mb-2">
                            <input type="text" class="form-control" id="inputStyleDesc2"
                                @input="this.styleEdit.rub_style_desc = this.styleEdit.rub_style_desc.toUpperCase()"
                                @keyup.enter="saveEditStyle();" required placeholder="คำอธิบาย"
                                v-model="this.styleEdit.rub_style_desc">
                            <label for="floatingInput">คำอธิบาย</label>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary"
                        @click.prevent="this.func.hideModal('editStyleM')">ปิด</button>
                    <button type="button" class="btn btn-primary" @click.prevent="saveEditStyle();">บันทึก</button>
                </div>
            </div>
        </div>
    </div>
    <!-- ตารางข้อมูล แสดงรายการดอกยาง -->
    <div class="card border-2 shadow" style="width:100% ;">
        <div class="card-header bg-primary" style="color:white;">
            ::: แสดงรายการ-ลายยาง :::
        </div>
        <table id="showrubberstyle" class="table table-striped table-hover table-sm"
            style="width: auto; align-items: center">
            <thead>
                <tr>
                    <th>ลำดับ</th>
                    <th>ชื่อลายดอก</th>
                    <th>คำอธิบาย</th>
                    <th style="text-align:right">
                        <button type="button" class="btn btn-success btn-sm me-md-2" @click.prevent="func.showModal('newStyleM');
                        func.setFocusInModal('newStyleM', 'inputStyle1');">
                            <!-- ปุ่มเพิ่มข้อมูล -->
                            <font-awesome-icon icon="fa-solid fa-plus" />
                        </button>
                    </th>
                </tr>
            </thead>
            <tbody class="table-group-divider">
                <tr v-for="rec in data_row" :key="rec.rub_style_id" @click.prevent="getStyle(rec)">
                    <td>{{ rec.rub_style_id }}</td>
                    <td>{{ rec.rub_style_name }}</td>
                    <td>{{ rec.rub_style_desc }}</td>
                    <td style="text-align:right">
                        <button id="edit" type='button' class='btn btn-primary btn-sm me-md-2'
                            @click.prevent="getStyle(rec)">
                            <!-- ปุ่มแก้ไขข้อมูล -->
                            <font-awesome-icon icon="fa-solid fa-pen" />
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import $ from 'jquery';
import axios from "@/axios";
import func from "../func.js"

export default {
    data() {
        return {
            func: func,
            data_row: [],
            styleNew: {
                rub_style_name: "",
                rub_style_desc: "",
            },
            styleEdit: {
                rub_style_id: "",
                rub_style_name: "",
                rub_style_desc: "",
            },
        }
    },
    mounted() {
        this.getRubberStyle();
    },
    methods: {
        async getStyle(val) {
            this.styleEdit.rub_style_id = val.rub_style_id;
            this.styleEdit.rub_style_name = val.rub_style_name;
            this.styleEdit.rub_style_desc = val.rub_style_desc;
            func.showModal("editStyleM");
        },
        async getRubberStyle() {
            await axios.get(`rubberstyle/read`).then((response) => {
                this.data_row = response.data;
                $(document).ready(function () {
                    $('#showrubberstyle').DataTable({
                        scrollY: "320px",
                        "destroy": true,
                        "language": {
                            "decimal": "",
                            "emptyTable": "ไม่พบการข้อมูลจากฐานข้อมูล",
                            "info": "จำนวน _END_ เรคอร์ด / _TOTAL_ เรคอร์ด",
                            // "info": "แสดง _START_ - _END_ แถว จากทั้งหมด _TOTAL_ แถว",
                            "infoEmpty": "Showing 0 to 0 of 0 entries",
                            "infoFiltered": "(ค้นหาจากข้อมูลทั้งหมด _MAX_ เรคอร์ด)",
                            "infoPostFix": "",
                            "thousands": ",",
                            "lengthMenu": "แสดงครั้งละ _MENU_ เรคอร์ด",
                            "loadingRecords": "Loading...",
                            "processing": "",
                            "search": "ค้นหาข้อมูล:",
                            "zeroRecords": "ไม่พบข้อมูลที่ค้นหา",
                            "paginate": {
                                "first": "First",
                                "last": "Last",
                                "next": "ต่อไป",
                                "previous": "ย้อนกลับ"
                            },
                            "aria": {
                                "sortAscending": ": activate to sort column ascending",
                                "sortDescending": ": activate to sort column descending"
                            }
                        }
                    });
                });
            });
        },
        saveNewStyle() {
            if (confirm("ยืนยันการบันทึกข้อมูล?") == true) {
                axios.post(`rubberstyle/new`, this.styleNew).then(() => {
                    this.styleNew = {
                        rub_style_name: "",
                        rub_style_desc: "",
                    };
                    func.hideModal("newStyleM");
                    $("#showrubberstyle").DataTable().destroy();
                    this.getRubberStyle();
                    console.log("Save new style successfull...");
                }).catch(error => {
                    console.log("พบปัญหา..." + error);
                });
            }
        },
        saveEditStyle() {
            if (confirm("ยืนยันการแก้ไขข้อมูล?") == true) {
                axios.post(`rubberstyle/update`, this.styleEdit).then(() => {
                    this.styleEdit = {
                        rub_style_name: "",
                        rub_style_desc: "",
                    };
                    func.hideModal("editStyleM");
                    $("#showrubberstyle").DataTable().destroy();
                    this.getRubberStyle();
                    console.log("Edit new style successfull...");
                }).catch(error => {
                    console.log("พบปัญหา..." + error);
                });
            }
        },
    },
}
</script>