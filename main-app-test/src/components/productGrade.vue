<template>
    <div class="modal fade" id="editGradeM" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header bg-danger bg-opacity-75">
                    <h1 class="modal-title fs-5" id="exampleModalLabel" style="color:white">แก้ไขข้อมูลเกรดยาง</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-floating mb-2">
                            <input type="text" class="form-control text-uppercase" required placeholder="รหัสลายดอก"
                                v-model="this.editGrade.id" disabled>
                            <label for="floatingInput">ลำดับ</label>
                        </div>
                        <div class="form-floating mb-2">
                            <input type="text" class="form-control text-uppercase" required placeholder="รายละเอียด"
                                v-model="this.editGrade.rub_grade_name"
                                @input="this.editGrade.rub_grade_name = this.editGrade.rub_grade_name.toUpperCase()">
                            <label for="floatingInput">รายละเอียด</label>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary"
                        @click.prevent="hideModal('editGradeM')">ปิด</button>
                    <button type="button" class="btn btn-primary" @click.prevent="editGrade_save()">บันทึก</button>
                </div>
                <!-- {{ editGrade }} -->
            </div>
        </div>
    </div>

    <div class="modal fade" id="newGradeM" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header bg-primary bg-opacity-75">
                    <h1 class="modal-title fs-5" id="exampleModalLabel" style="color:white">แก้ไขข้อมูลเกรดยาง</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-floating mb-2">
                            <input type="text" class="form-control text-uppercase" required placeholder="รหัสลายดอก"
                                v-model="this.newGrade.id" disabled>
                            <label for="floatingInput">ลำดับ</label>
                        </div>
                        <div class="form-floating mb-2">
                            <input type="text" class="form-control text-uppercase" required placeholder="รายละเอียด"
                                v-model="this.newGrade.rub_grade_name"
                                @input="this.newGrade.rub_grade_name = this.newGrade.rub_grade_name.toUpperCase()">
                            <label for="floatingInput">รายละเอียด</label>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click.prevent="hideModal('newGradeM')">ปิด</button>
                    <button type="button" class="btn btn-primary" @click.prevent="newGrade_save()">บันทึก</button>
                </div>
                <!-- {{ newGrade }} -->
            </div>
        </div>
    </div>

    <div class="card border-2 shadow" style="width:100% ;">
        <div class="card-header bg-primary" style="color:white;">
            ::: แสดงรายการ-เกรดยาง :::
        </div>
        <table id="showrubbergrade" class="table table-striped table-hover table-sm"
            style="width: 100%; align-items: center">
            <thead>
                <tr>
                    <th>ลำดับ</th>
                    <th>รายละเอียด</th>
                    <th style="text-align:right">
                        <button class="btn btn-success btn-sm me-md-2" @click.prevent="showModal('newGradeM')">
                            <!-- ปุ่มเพิ่มข้อมูล -->
                            <font-awesome-icon icon="fa-solid fa-plus" />
                        </button>
                    </th>
                </tr>
            </thead>
            <tbody class="table-group-divider">
                <tr v-for="rec in data_row" :key="rec.id" @click.prevent="getGrade(rec)">
                    <td>{{ rec.id }}</td>
                    <td>{{ rec.rub_grade_name }}</td>
                    <td style="text-align:right">
                        <button id="edit" type='button' class='btn btn-primary btn-sm me-md-2'
                            @click.prevent="getGrade(rec)">
                            <!-- ปุ่มแก้ไขข้อมูล -->
                            <font-awesome-icon icon="fa-solid fa-pen" />
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script type="module">
import $ from 'jquery';
import axios from "@/axios";
import { Modal } from "bootstrap"

export default {
    data() {
        return {
            data_row: [],
            newGrade: {
                id: "",
                rub_grade_name: ""
            },
            editGrade: {
                id: "",
                rub_grade_name: ""
            },
        }
    },
    mounted() {
        this.getRubberGrade();
    },
    methods: {
        getGrade(val) {
            this.editGrade = {
                id: val.id,
                rub_grade_name: val.rub_grade_name
            }
            this.showModal('editGradeM')
        },
        async newGrade_save() {
            if (this.newGrade.rub_grade_name == '') {
                alert("กรุณากรอกข้อมูลให้ครบก่อนการบันทึก !!!")
            } else {
                if (confirm("ยืนยันการบันทึกข้อมูล ?") == true) {
                    await axios.post(`rubbergrade/new`, this.newGrade).then(() => {
                        this.newGrade = {
                            rub_grade_name: ""
                        }
                        this.hideModal("newGradeM")
                        $("#showrubbergrade").DataTable().destroy();
                        this.getRubberGrade();
                        console.log('Process success!');
                    }).catch(error => {
                        console.log(error)
                    })
                }
            }
        },
        async editGrade_save() {
            if (this.editGrade.rub_grade_name == '') {
                alert("กรุณากรอกข้อมูลให้ครบก่อนการบันทึก !!!")
            } else {
                if (confirm("ยืนยันการบันทึกข้อมูล ?") == true) {
                    await axios.post(`rubbergrade/update`, this.editGrade).then(() => {
                        this.editGrade = {
                            id: "",
                            rub_grade_name: ""
                        }
                        this.hideModal("editGradeM")
                        $("#showrubbergrade").DataTable().destroy();
                        this.getRubberGrade();
                        console.log('Process success!');
                    }).catch(error => {
                        console.log(error)
                    })
                }
            }
        },
        async getRubberGrade() {
            await axios.get(`rubbergrade/read`).then((response) => {
                this.data_row = response.data;
                $(document).ready(function () {
                    $('#showrubbergrade').DataTable({
                        scrollY: "320px",
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
        async showModal(e) {
            let myModal = await new Modal(document.getElementById(e))
            await myModal.show()
        },
        async hideModal(e) {
            const body = document.querySelector("body");
            await $(".modal-backdrop").remove();
            await $(`#${e}`).removeClass("in");
            await $(`#${e}`).hide();
            body.style.overflow = "auto";
        },
    },
}
</script>