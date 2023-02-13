<template>
     <!-- Modal ในส่วนของการเพิ่มข้อมูลใหม่ -->
     <div class="modal fade shadow rounded-3" id="fixCost" tabindex="-1">
          <div class="modal-dialog">
               <div class="modal-content">
                    <div class="modal-header bg-primary bg-opacity-75">
                         <h1 class="modal-title fs-5" id="exampleModalLabel" style="color: white">
                              กำหนดราคาสินค้า
                         </h1>
                         <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                         <form>
                              <!-- <div class="form-floating mb-2">
                                   <input type="text" class="form-control" required placeholder="รหัสราคา">
                                   <label for="floatingInput">รหัสราคา</label>
                              </div> -->
                              <div class="mb-2 mt-2">
                                   <label>ประเภทงาน</label>
                                   <select class="form-select" v-model="this.fixCostData.job_type_id"
                                        @change="getProductDetail(this.fixCostData.job_type_id)">
                                        <option value="1">ค่าจ้าง</option>
                                        <option value="2">ยางพร้อมโครง</option>
                                   </select>
                              </div>
                              <div class="mb-2 mt-2">
                                   <label>ประเภทการผลิต</label>
                                   <select class="form-select" v-model="this.fixCostData.production_type_id"
                                        @change="getProductList(this.fixCostData.production_type_id);">
                                        <option v-for="productDetail in product_detail"
                                             :key="productDetail.production_type_id"
                                             :value="productDetail.production_type_id">
                                             {{ productDetail.production_type_name }}
                                        </option>
                                   </select>
                              </div>
                              <div class="mb-2 mt-2">
                                   <label>ข้อมูลสินค้า</label>
                                   <select class="form-select" id="productlist1"
                                        v-model="this.fixCostData.product_list_id">
                                        <option v-for="productList in product_list_data"
                                             :key="productList.product_list_id" :value="productList.product_list_id">
                                             ลายดอก: {{ productList.rub_style_name }} , ขนาดยาง: {{
                                                  productList.rub_size_detail
                                             }}
                                        </option>
                                   </select>
                              </div>
                              <div class="mb-2 mt-2">
                                   <label>เกรดยาง</label>
                                   <select class="form-select" v-model="this.fixCostData.rub_grade_id">
                                        <option v-for="rubberGrade in rubber_grade" :key="rubberGrade.id"
                                             :value="rubberGrade.id">
                                             {{ rubberGrade.rub_grade_name }}
                                        </option>
                                   </select>
                              </div>
                              <label>ราคาเงินสด</label>
                              <div class="input-group mb-2">
                                   <input type="number" class="form-control" v-model="this.fixCostData.price1" />
                                   <span class="input-group-text">บาท</span>
                              </div>
                              <label>ราคาเงินสด+จัดส่ง</label>
                              <div class="input-group mb-2">
                                   <input type="number" class="form-control" v-model="this.fixCostData.price2" />
                                   <span class="input-group-text">บาท</span>
                              </div>
                         </form>
                    </div>
                    <div class="modal-footer">
                         <button type="button" class="btn btn-secondary"
                              @click.prevent="this.func.hideModal('fixCost')">
                              ปิด
                         </button>
                         <button type="button" class="btn btn-primary" @click.prevent="newFixCost()">
                              บันทึก
                         </button>
                    </div>
                    <!-- {{ this.fixCostData }} -->
               </div>
          </div>
     </div>
     <!-- สิ้นสุดการเพิ่มข้อมูลใหม่ -->

     <!-- Modal ในส่วนของการแก้ไขข้อมูล -->
     <div class="modal fade shadow rounded-3" id="editfixCost" tabindex="-1">
          <div class="modal-dialog">
               <div class="modal-content">
                    <div class="modal-header bg-danger bg-opacity-75">
                         <h1 class="modal-title fs-5" id="exampleModalLabel" style="color: white">
                              แก้ไขราคาสินค้า > ลำดับที่&nbsp;{{ this.fixCostData_edit.fixcost_id }}
                         </h1>
                         <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                         <form>
                              <div class="mb-2 mt-2">
                                   <label for="job_type_id">ประเภทงาน</label>
                                   <select class="form-select" v-model="this.fixCostData_edit.job_type_id"
                                        @change="getProductDetail(this.fixCostData_edit.job_type_id)">
                                        <option value="1">ค่าจ้าง</option>
                                        <option value="2">ยางพร้อมโครง</option>
                                   </select>
                              </div>
                              <div class="mb-2 mt-2">
                                   <label>ประเภทการผลิต</label>
                                   <select class="form-select" v-model="this.fixCostData_edit.production_type_id"
                                        @change="getProductList(this.fixCostData_edit.production_type_id);">
                                        <option v-for="productDetail in product_detail"
                                             :key="productDetail.production_type_id"
                                             :value="productDetail.production_type_id">
                                             {{ productDetail.production_type_name }}
                                        </option>
                                   </select>
                              </div>
                              <div class="mb-2 mt-2">
                                   <label>ข้อมูลสินค้า</label>
                                   <select class="form-select" id="productlist2"
                                        v-model="this.fixCostData_edit.product_list_id">
                                        <option v-for="productList in product_list_data"
                                             :key="productList.product_list_id" :value="productList.product_list_id">
                                             ลายดอก: {{ productList.rub_style_name }} , ขนาดยาง: {{
                                                  productList.rub_size_detail
                                             }}
                                        </option>
                                   </select>
                              </div>
                              <div class="mb-2 mt-2">
                                   <label for="rub_grade_id">เกรดยาง</label>
                                   <select class="form-select" v-model="this.fixCostData_edit.rub_grade_id">
                                        <option v-for="rubberGrade in rubber_grade" :key="rubberGrade.id"
                                             :value="rubberGrade.id">
                                             {{ rubberGrade.rub_grade_name }}
                                        </option>
                                   </select>
                              </div>
                              <label>ราคาเงินสด</label>
                              <div class="input-group mb-2">
                                   <input type="number" class="form-control" required
                                        v-model="this.fixCostData_edit.price1" id="price1" />
                                   <span class="input-group-text">บาท</span>
                              </div>
                              <label>ราคาเงินสด+จัดส่ง</label>
                              <div class="input-group mb-2">
                                   <input type="number" class="form-control" required
                                        v-model="this.fixCostData_edit.price2" />
                                   <span class="input-group-text">บาท</span>
                              </div>
                         </form>
                    </div>
                    <div class="modal-footer">
                         <button type="button" class="btn btn-secondary"
                              @click.prevent="this.func.hideModal('editfixCost')">
                              ปิด
                         </button>
                         <button type="button" class="btn btn-primary" @click.prevent="editFixCost()">
                              บันทึก
                         </button>
                         <!-- {{ this.fixCostData_edit }} -->
                    </div>
               </div>
          </div>
     </div>
     <!-- สิ้นสุดการแก้ไขข้อมูล -->

     <!-- ส่วนของ Datatable แสดงรายการข้อมูล -->
     <div class="card shadow-lg" style="width: 100%">
          <div class="card-header bg-primary" style="color: white">
               ::: แสดงรายการ-ราคาสินค้า :::
          </div>
          <div class="card-body">
               <table id="showproductcost" class="table table-striped table-hover table-sm"
                    style="width: 100%; align-items: center">
                    <thead>
                         <tr>
                              <th>ลำดับ</th>
                              <th>ประเภทงาน</th>
                              <th>ประเภทการผลิต</th>
                              <th>ขนาด</th>
                              <th>ลายดอก</th>
                              <th>เกรดยาง</th>
                              <th>เงินสด</th>
                              <th>เงินสด+ส่ง</th>
                              <th style="text-align: left">
                                   <button class="btn btn-success btn-sm me-md-2"
                                        @click.prevent="clearSelect2(); onSelect2_1(); this.func.showModal('fixCost');">
                                        <!-- ปุ่มเพิ่มข้อมูล -->
                                        <font-awesome-icon icon="fa-solid fa-plus" />
                                   </button>
                              </th>
                         </tr>
                    </thead>
                    <tbody class="table-group-divider">
                         <tr v-for="rec in product_cost_data" :key="rec.fixcost_id" @click.prevent="getFixCost(rec)">
                              <td>{{ product_cost_data.indexOf(rec) + 1 }}</td>
                              <td>{{ rec.job_type_name }}</td>
                              <td>{{ rec.production_type_name }}</td>
                              <td>{{ rec.rub_size_name }} > {{ rec.rub_size_detail }}</td>
                              <td>{{ rec.rub_style_name }}</td>
                              <td>{{ rec.rub_grade_name }}</td>
                              <td>{{ this.numFormat(rec.price1) }}</td>
                              <td>{{ this.numFormat(rec.price2) }}</td>
                              <td style="text-align: left">
                                   <button id="edit" type="button" class="btn btn-primary btn-sm me-md-2"
                                        @click.prevent="getFixCost(rec)">
                                        <!-- ปุ่มแก้ไขข้อมูล -->
                                        <font-awesome-icon icon="fa-solid fa-pen" />
                                   </button>
                              </td>
                         </tr>
                    </tbody>
               </table>
          </div>
     </div>
     <!-- สิ้นสุดการแสดงข้อมูล -->
</template>

<script>
import axios from "@/axios";
import $ from "jquery";
import func from "../func.js";

export default {
     name: "FixCost",
     components: {

     },
     data() {
          return {
               func: func,
               product_detail: [],
               product_cost_data: [],
               product_list_data: [],
               rubber_grade: [],
               fixCostData: {
                    fixcost_id: "",
                    job_type_id: "", // link to product_type.job_type_id
                    production_type_id: "", // link to product_detail.production_type_id
                    product_list_id: "",
                    rub_grade_id: "",
                    price1: "",
                    price2: "",
               },
               fixCostData_edit: {
                    fixcost_id: "",
                    job_type_id: "", // link to product_type.job_type_id
                    production_type_id: "", // link to product_detail.production_type_id
                    product_list_id: "",
                    rub_grade_id: "",
                    price1: "",
                    price2: "",
               },
          };
     },
     beforeUnmount() {
          sessionStorage.clear();
     },
     created() { },
     mounted() {
          this.loadDefaultData();
          // this.getRubbergrade();
     },
     methods: {
          clearSelect2() {
               $(document).ready(() => {
                    $("#productlist1").val("");
               });
          },
          onSelect2_1() {
               $(document).ready(() => {
                    $("#productlist1").select2({
                         theme: "bootstrap-5",
                         closeOnSelect: true,
                         width: "100%",
                         dropdownParent: $("#productlist1").parent(),
                         placeholder: "--- เลือกรายการสินค้า ---",
                    });
                    $("#productlist1").on("select2:select", (e) => {
                         let data = e.params.data;
                         this.fixCostData.product_list_id = data.id;
                    });
               });
          },
          onSelect2_2() {
               $(document).ready(() => {
                    $("#productlist2").select2({
                         theme: "bootstrap-5",
                         closeOnSelect: true,
                         width: "100%",
                         dropdownParent: $("#productlist2").parent(),
                         placeholder: "--- เลือกรายการสินค้า ---",
                    });
                    $("#productlist2").on("select2:select", (e) => {
                         let data = e.params.data;
                         this.fixCostData_edit.product_list_id = data.id;
                    });
               });
          },
          loadDefaultData() {
               this.getRubbergrade();
               this.getProductCost();
          },
          async newFixCost() {
               if (confirm("ยืนยันการบันทึกข้อมูล ?") == true) {
                    await axios
                         .post(`productcost/new`, this.fixCostData)
                         .then(() => {
                              this.fixCostData = {
                                   fixcost_id: "",
                                   job_type_id: "", // link to product_type.job_type_id
                                   production_type_id: "", // link to product_detail.production_type_id
                                   product_list_id: "",
                                   rub_grade_id: "",
                                   price1: "",
                                   price2: "",
                              };
                              func.hideModal("fixCost");
                              $("#showproductcost").DataTable().destroy(); //--- ทำลาย Datatable
                              this.getProductCost();
                              console.log("Process success!");
                         })
                         .catch((error) => {
                              console.log(error);
                         });
               }
          },
          getFixCost(val) {
               this.getProductDetail(val.job_type_id);
               this.getProductList(val.production_type_id);
               this.fixCostData_edit.fixcost_id = val.fixcost_id;
               this.fixCostData_edit.job_type_id = val.job_type_id;
               this.fixCostData_edit.production_type_id = val.production_type_id;
               this.fixCostData_edit.product_list_id = val.product_list_id;
               this.fixCostData_edit.rub_grade_id = val.rub_grade_id;
               this.fixCostData_edit.price1 = val.price1;
               this.fixCostData_edit.price2 = val.price2;
               func.showModal("editfixCost");
               this.onSelect2_2();
          },
          async editFixCost() {
               if (confirm("ยืนยันการเปลี่ยนแปลงข้อมูล ?") == true) {
                    await axios.post(`productcost/update`, this.fixCostData_edit).then(() => {
                         this.fixCostData_edit = {
                              fixcost_id: "",
                              job_type_id: "", // link to product_type.job_type_id
                              production_type_id: "", // link to product_detail.production_type_id
                              product_list_id: "",
                              rub_grade_id: "",
                              price1: "",
                              price2: "",
                         };
                         func.hideModal("editfixCost");
                         // $("#showproductcost").DataTable().destroy(); //--- ทำลาย Datatable
                         this.getProductCost();
                    });
               }
          },
          getProductCost() {
               axios.get(`productcost/read`).then((response) => {
                    this.product_cost_data = response.data;
                    // console.log(response.data);
                    $(document).ready(function () {
                         $("#showproductcost").DataTable({
                              scrollY: "350px",
                              bJQueryUI: true,
                              sPaginationType: "full_numbers",
                              "destroy": true,
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
               });
          },
          getProductDetail(val) {
               axios.get(`productdetail/search/${val}`).then((response) => {
                    this.product_detail = response.data;
               });
          },
          getProductList(val) {
               axios.get(`productlist/search_productiontype/${val}`).then((response) => {
                    this.product_list_data = response.data;
               });
          },
          getRubbergrade() {
               axios.get(`rubbergrade/read`).then((response) => {
                    this.rubber_grade = response.data;
               });
          },
          numFormat(e) {
               const nf = new Intl.NumberFormat("th-TH", {
                    style: "currency",
                    currency: "THB",
                    maximumFractionDigits: 2,
               }).format(e);
               return nf;
          },
     },
};
</script>

<style>
.select2-selection {
     /* height: 58px !important; */
     border-color: #ced4da !important;
}

label {
     color: gray;
     font-style: italic;
}
</style>
