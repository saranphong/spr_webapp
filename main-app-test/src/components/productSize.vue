<template>
    <div class="modal fade" id="editSizeM" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header bg-danger bg-opacity-50">
                    <h1 class="modal-title fs-5" id="exampleModalLabel" style="color:white">แก้ไขข้อมูลขนาดยาง</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-floating mb-2">
                            <input type="text" class="form-control text-uppercase" required placeholder="รหัสขนาด"
                                v-model.trim="this.editSize.rub_size_name"
                                @input="this.editSize.rub_size_name = this.editSize.rub_size_name.toUpperCase()">
                            <label for="floatingInput">รหัสขนาดยาง</label>
                        </div>
                        <div class="form-floating mb-2">
                            <input type="text" class="form-control text-uppercase" required placeholder="รายละเอียด"
                                v-model.trim="this.editSize.rub_size_detail"
                                @input="this.editSize.rub_size_detail = this.editSize.rub_size_detail.toUpperCase()">
                            <label for="floatingInput">รายละเอียด</label>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click.prevent="hideModal('editSizeM')">ปิด</button>
                    <button type="button" class="btn btn-primary" @click.prevent="editSize_save()">บันทึก</button>
                </div>
                <!-- {{ editSize }} -->
            </div>
        </div>
    </div>

    <div class="modal fade" id="newSizeM" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header bg-primary bg-opacity-50">
                    <h1 class="modal-title fs-5" id="exampleModalLabel" style="color:white">เพิ่มขนาดยางใหม่</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-floating mb-2">
                            <input type="text" class="form-control text-uppercase" required placeholder="รหัสขนาด"
                                v-model.trim="this.newSize.rub_size_name"
                                @input="this.newSize.rub_size_name = this.newSize.rub_size_name.toUpperCase()">
                            <label for="floatingInput">รหัสขนาดยาง</label>
                        </div>
                        <div class="form-floating mb-2">
                            <input type="text" class="form-control text-uppercase" required placeholder="รายละเอียด"
                                v-model.trim="this.newSize.rub_size_detail"
                                @input="this.newSize.rub_size_detail = this.newSize.rub_size_detail.toUpperCase()">
                            <label for="floatingInput">รายละเอียด</label>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click.prevent="hideModal('newSizeM')">ปิด</button>
                    <button type="button" class="btn btn-primary" @click.prevent="newSize_save()">บันทึก</button>
                </div>
            </div>
        </div>
    </div>

    <!-- ส่วนของ Datatable แสดงรายการข้อมูล -->
    <div class="card shadow-lg" style="width:100%;">
        <div class="card-header bg-primary" style="color:white;">
            ::: แสดงรายการ-ขนาดยาง :::
        </div>
        <div class="card-body">
            <table id="showrubbersize" class="table table-striped table-hover table-sm"
                style="width: 100%; align-items: center">
                <thead>
                    <tr>
                        <th>ลำดับ</th>
                        <th>ขนาดยาง</th>
                        <th>รายละเอียด</th>
                        <th>
                            <button class="btn btn-success btn-sm me-md-2" @click.prevent="showModal('newSizeM')">
                                <!-- ปุ่มเพิ่มข้อมูล -->
                                <font-awesome-icon icon="fa-solid fa-plus" />
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody class="table-group-divider">
                    <tr v-for="rec in data_row" :key="rec.id" @click.prevent="getSize(rec)">
                        <td>{{ rec.rub_size_id }}</td>
                        <td>{{ rec.rub_size_name }}</td>
                        <td>{{ rec.rub_size_detail }}</td>
                        <td style="text-align:left">
                            <button id="edit" type='button' class='btn btn-primary btn-sm me-md-2'
                                @click.prevent="getSize(rec)">
                                <!-- ปุ่มแก้ไขข้อมูล -->
                                <font-awesome-icon icon="fa-solid fa-pen" />
                            </button>
                        </td>
                        <!-- <td style="text-align:left">
                            <button class='btn btn-danger btn-sm me-md-1'>                             
                                <font-awesome-icon icon="fa-solid fa-trash-can" />
                            </button>
                        </td> -->
                    </tr>
                </tbody>
                <!-- <tfoot>
                    <tr>
                        <th>ลำดับ</th>
                        <th>ขนาดยาง</th>
                        <th>รายละเอียด</th>
                    </tr>
                </tfoot> -->
            </table>
        </div>
    </div>
</template>

<script>
// import axios from 'axios';
import $ from 'jquery';
import axios from "@/axios";
import { Modal } from "bootstrap"

export default {
    data() {
        return {
            data_row: [],
            newSize: {
                rub_size_id: "",
                rub_size_name: "",
                rub_size_detail: ""
            },
            editSize: {
                rub_size_id: "",
                rub_size_name: "",
                rub_size_detail: ""
            },
        }
    },
    mounted() {
        this.getRubberSize();
    },
    methods: {
        getSize(val) {
            this.editSize.rub_size_id = val.rub_size_id;
            this.editSize.rub_size_name = val.rub_size_name;
            this.editSize.rub_size_detail = val.rub_size_detail;
            this.showModal("editSizeM");
        },
        async newSize_save() {
            if (this.newSize.rub_size_name == '' || this.newSize.rub_size_detail == '') {
                alert("กรุณากรอกข้อมูลให้ครบก่อนการบันทึก !!!")
            } else {
                if (confirm("ยืนยันการบันทึกข้อมูล ?") == true) {
                    await axios.post(`rubbersize/new`, this.newSize).then(() => {
                        this.newSize = {
                            rub_size_id: "",
                            rub_size_name: "",
                            rub_size_detail: ""
                        }
                        this.hideModal("newSizeM")
                        $("#showrubbersize").DataTable().destroy();
                        this.getRubberSize();
                        console.log('Process success!');
                    }).catch(error => {
                        console.log(error)
                    })
                }
            }
        },
        async editSize_save() {
            if (this.editSize.rub_size_name == '' || this.editSize.rub_size_detail == '') {
                alert("กรุณากรอกข้อมูลให้ครบก่อนการบันทึก !!!")
            } else {
                if (confirm("ยืนยันการบันทึกข้อมูล ?") == true) {
                    await axios.post(`rubbersize/update`, this.editSize).then(() => {
                        this.editSize = {
                            rub_size_id: "",
                            rub_size_name: "",
                            rub_size_detail: ""
                        }
                        this.hideModal("editSizeM")
                        $("#showrubbersize").DataTable().destroy();
                        this.getRubberSize();
                        console.log('Process success!');
                    }).catch(error => {
                        console.log(error)
                    })
                }
            }
        },
        async getRubberSize() {
            await axios.get(`rubbersize/read`).then((response) => {
                this.data_row = response.data;
                $(document).ready(() => {
                    $('#showrubbersize').DataTable({
                        // initComplete: function () {
                        //     this.api()
                        //         .columns()
                        //         .every(function () {
                        //             var column = this;
                        //             var select = $('<select><option value=""></option></select>')
                        //                 .appendTo($(column.footer()).empty())
                        //                 .on('change', function () {
                        //                     var val = $.fn.dataTable.util.escapeRegex($(this).val());
                        //                     column.search(val ? '^' + val + '$' : '', true, false).draw();
                        //                 });

                        //             column
                        //                 .data()
                        //                 .unique()
                        //                 .sort()
                        //                 .each(function (d) {
                        //                     select.append('<option value="' + d + '">' + d + '</option>');
                        //                 });
                        //         });
                        // },

                        "scrollY": '300px',
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
<style>
.scroll {
    flex: 1;
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
}

.card {
    flex: auto;
    flex-shrink: 0;
    max-width: auto;
}
</style>