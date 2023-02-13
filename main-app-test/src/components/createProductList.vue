<template>
    <div class=" container-fluid">
        <div class="row-12">
            <div class="col-12" style="text-align:center">
                <!-- สลับปุ่มสลับการเปิด-ปิด หน้าการเพิ่มข้อมูล -->
                <button class="btn btn-success rounded-3 shadow col-12" type="button" data-bs-toggle="collapse"
                    data-bs-target="#newProductList" aria-expanded="false" aria-controls="newProductList"
                    @click.prevent="switchpage();">
                    เพิ่มรายการสินค้า&nbsp;
                    <!-- <font-awesome-icon icon="fa-solid fa-arrow-up-short-wide" style="color:yellow;" /> -->
                    <font-awesome-icon icon="fa-solid fa-angle-down" style="color:yellow;"
                        v-if="this.chk_newProduct_page == false" />
                    <font-awesome-icon icon="fa-solid fa-angle-up" style="color:yellow;" v-else />
                </button>
                <!-- //////////////////////////////// -->
            </div>
            <div class="row-12">
                <div class="col-12">
                    <div class="collapse mt-1" id="newProductList">
                        <div class="card rounded-3 shadow" style="width:100%">
                            <!-- <div class="card-header bg-success bg-opacity-50" style="color:white; text-align:center">
                                ::: เพิ่มรายการสินค้า:::
                            </div> -->
                            <div class="card-body">
                                <div class="row">
                                    <!-- <div class="col">
                                        <label>ประเภทงาน</label>
                                        <select id="jobtype" class="form-select">
                                            <option selected>::: เลือกประเภทงาน :::</option>
                                            <option value="1">ค่าจ้าง</option>
                                            <option value="2">ยางพร้อมโครง</option>
                                        </select>
                                    </div> -->
                                    <div class="col">
                                        <label>ประเภทการผลิต</label>
                                        <select id="production_type" class="form-select"
                                            v-model="new_product_list.production_type_id">
                                            <option v-for="production_type in productiontype_data"
                                                :key="production_type.production_type_id"
                                                :value="production_type.production_type_id">
                                                {{ production_type.production_type_name }}
                                            </option>
                                        </select>
                                    </div>
                                    <div class="col">
                                        <label>ลายดอก</label>
                                        <select class="form-select" id="rubber_style"
                                            v-model="this.new_product_list.rub_style_id">
                                            <option v-for="rubberStyle in rubstyle_data" :key="rubberStyle.rub_style_id"
                                                :value="rubberStyle.rub_style_id">
                                                {{ rubberStyle.rub_style_name }}
                                            </option>
                                        </select>
                                    </div>
                                    <div class="col">
                                        <label>ขนาดยาง</label>
                                        <select class="form-select" id="rubber_size"
                                            v-model="this.new_product_list.rub_size_id">
                                            <option v-for="rubberSize in rubsize_data" :key="rubberSize.rub_size_id"
                                                :value="rubberSize.rub_size_id">
                                                {{ rubberSize.rub_size_name }} > {{ rubberSize.rub_size_detail }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <!-- ทดสอบทำ autocomplete เอง รอศึกษาเพิ่มเติม -->
                                <!-- <div class="row mt-2">
                                    <div class="input-group">
                                        <input type="text" name="search" id="search" class="form-control"
                                            placeholder="Search something..." autocomplete="off" @input="findSizeAll()"
                                            v-model="this.search_text" />
                                    </div>
                                    <div class="col-md-5"> -->
                                <!-- <div class="list-group" id="show-list"></div> -->
                                <!-- <label v-if="this.x == true">test</label>
                                    </div>
                                </div> -->
                            </div>
                            <div class="card-footer" style="text-align:center">
                                <button class="btn btn-success rounded-5 shadow"
                                    @click.prevent="saveNewProduct();">บันทึกลงรายการสินค้า
                                    <font-awesome-icon icon="fa-solid fa-download" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="card rounded-3 shadow mt-1" style="width:100%">
                        <div class="card-header bg-primary" style="color:white; text-align:center;width:auto">
                            ::: แสดงรายการ-สินค้า :::
                        </div>
                        <div class="card-body">
                            <table id="listproduct" class="table table-striped table-hover table-sm"
                                style="width: 100%; align-items: center">
                                <thead>
                                    <tr style="color:darkblue">
                                        <th>ลำดับ</th>
                                        <th>ประเภทการผลิต</th>
                                        <th>ลายดอก</th>
                                        <th>ขนาดยาง</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody class="table-group-divider">
                                    <tr v-for="rec in product_data" :key="rec.product_list_id">
                                        <td>{{ product_data.indexOf(rec) + 1 }}</td>
                                        <td>{{ rec.production_type_name }}</td>
                                        <td>{{ rec.rub_style_name }}</td>
                                        <td>{{ rec.rub_size_name }} {{ rec.rub_size_detail }}</td>
                                        <td style="text-align: left">
                                            <button id="edit" class="btn btn-primary btn-sm" title="แก้ไขข้อมูล"
                                                @click="editProduct();">
                                                <font-awesome-icon icon="fa-solid fa-pen" />
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from "jquery"
import axios from "@/axios"
// import { ref } from "vue"

export default {
    data() {
        return {
            x: false,
            chk_newProduct_page: false,
            productiontype_data: [],
            product_data: [],
            rubstyle_data: [],
            rubsize_data: [],
            rubsize_data2: [],
            check_dup: [],
            new_product_list: {
                production_type_id: "",
                rub_style_id: "",
                rub_size_id: "",
            },
            search_text: "",
        }
    },
    async mounted() {
        await this.getProduct();
        await this.getProductionType();
        await this.getRubberStyle();
        await this.getRubberSize();
        await this.onSelect2ForRubberStyle();
        await this.onSelect2ForRubberSize();
    },
    methods: {
        switchpage() {
            this.chk_newProduct_page = !this.chk_newProduct_page;
        },
        async findSizeAll() {
            if (this.search_text != "") {
                await axios.get(`rubbersize/findbytext/${this.search_text}`).then((response) => {
                    this.rubsize_data2 = response.data;
                    if ((this.search_text.length > 0) && (response.data.length > 0)) {
                        $(document).ready(() => {
                            this.x = true;
                            // let rec;
                            // for (rec = 0; rec < response.data.length; rec++) {
                            //     let t = response.data[rec].rub_size_name;
                            // $("#show-list").html(`<a class="list-group-item list-group-item-action border-1">${t}`);
                            // $("#show-list").html(`<li class="list-group-item mt-2">${t}</li>`)
                            // console.log(response.data[rec])
                            // }
                        })
                    }
                    else if ((this.search_text == "") || (response.data.length < 1)) {
                        // $("#show-list").html("");
                        this.x = false;
                    }
                });
            } else this.x = false;
        },
        onSelect2ForRubberStyle() {
            $(document).ready(() => {
                $("#rubber_style").select2({
                    theme: "bootstrap-5",
                    closeOnSelect: true,
                    width: "100%",
                    dropdownParent: $("#rubber_style").parent(),
                    placeholder: "--- เลือกลายดอก ---",
                    // tags: true,
                });
                $("#rubber_style").on("select2:select", (e) => {
                    let data = e.params.data;
                    this.new_product_list.rub_style_id = data.id;
                });
            });
        },
        onSelect2ForRubberSize() {
            $(document).ready(() => {
                $("#rubber_size").select2({
                    theme: "bootstrap-5",
                    closeOnSelect: true,
                    width: "100%",
                    dropdownParent: $("#rubber_size").parent(),
                    placeholder: "--- เลือกขนาดยาง ---",
                    // tags: true,
                });
                $("#rubber_size").on("select2:select", (e) => {
                    let data = e.params.data;
                    this.new_product_list.rub_size_id = data.id;
                });
            });
        },
        async getProductionType() {
            await axios.get(`productiontype/read`).then((response) => {
                this.productiontype_data = response.data;
            });
        },
        async getRubberStyle() {
            await axios.get(`rubberstyle/read`).then((response) => {
                this.rubstyle_data = response.data;
            });
        },
        async getRubberSize() {
            await axios.get(`rubbersize/read`).then((response) => {
                this.rubsize_data = response.data;
            });
        },
        async saveNewProduct() {
            if ((this.new_product_list.production_type_id != '') &&
                (this.new_product_list.rub_size_id != '') && (this.new_product_list.rub_style_id != '')) {
                await axios.post(`productlist/checkdup`, this.new_product_list).then((response) => {
                    this.check_dup = response.data;
                    if (this.check_dup.length == 0) {
                        if (confirm("ยืนยันการบันทุกข้อมูล") == true) {
                            axios.post(`productlist/new`, this.new_product_list).then(() => {
                                $("#listproduct").DataTable().destroy();
                                this.getProduct();
                            });
                            // $("#listproduct").DataTable().destroy();
                        }
                    }
                    else {
                        alert("พบว่ามีรายการสินค้านี้อยู่แล้ว !!!");
                    }
                }).catch((error) => {
                    console.log("พบข้อผิดผลาดในการบันทึกข้อมูล " + error);
                });
            }
            else {
                alert("กรุณากรอกข้อมูลให้ครบถ้วน !")
            }
        },
        async getProduct() {
            // console.log("getProduct started...");
            await axios.get(`productlist/read`).then((response) => {
                this.product_data = response.data;
                $(document).ready(() => {
                    $("#listproduct").DataTable({
                        "scrollY": '300px',
                        "scorllX": false,
                        "bJQueryUI": true,
                        "sPaginationType": "full_numbers",
                        "bFilter": true,
                        "paging": true,
                        "scrollCollapse": true,
                        "rowReorder": true,
                        "destroy": true,
                        "bSort": true,
                        "language": {
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
            });
        },
    },
}
</script>



