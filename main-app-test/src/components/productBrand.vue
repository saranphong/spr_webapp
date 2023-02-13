<template>
     <div class="modal fade" id="newBrand" tabindex="-1" aria-labelledby="exampleModalLabel"
          aria-hrub_brand_idden="true">
          <div class="modal-dialog">
               <div class="modal-content">
                    <div class="modal-header bg-primary bg-opacity-50">
                         <h1 class="modal-title fs-5" style="color:white">เพิ่มยี่ห้อยาง</h1>
                         <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                         <form>
                              <div class="form-floating mb-2">
                                   <input type="text" class="form-control text-uppercase" required
                                        placeholder="รหัสยี่ห้อ" v-model.trim="this.rubBrand.rub_brand_shotname"
                                        @input="this.rubBrand.rub_brand_shotname = this.rubBrand.rub_brand_shotname.toUpperCase()">
                                   <label for="floatingInput">ชื่อยี่ห้อยาง(ย่อ)</label>
                              </div>
                              <div class="form-floating mb-2">
                                   <input type="text" class="form-control text-uppercase" required
                                        placeholder="ชื่อยี่ห้อ" v-model="this.rubBrand.rub_brand_name"
                                        @input="this.rubBrand.rub_brand_name = this.rubBrand.rub_brand_name.toUpperCase()">
                                   <label for="floatingInput">ชื่อยี่ห้อยาง</label>
                              </div>
                         </form>
                    </div>
                    <div class="modal-footer">
                         <button type="button" class="btn btn-secondary"
                              @click.prevent="hideModal('newBrand')">ปิด</button>
                         <!-- ไม่อนุญาตให้กดปุ่มบันทึกหากไม่ใส่ข้อมูล -->
                         <button type="button" class="btn btn-primary"
                              v-if="this.rubBrand.rub_brand_shotname == '' || this.rubBrand.rub_brand_name == ''"
                              disabled>บันทึก</button>
                         <button type="button" class="btn btn-primary" @click.prevent="newRubBrand()"
                              v-else>บันทึก</button>
                         <!-- ****************************** -->
                    </div>
                    <!-- {{ this.rubBrand }} -->
               </div>
          </div>
     </div>
     <!--  -->
     <div class="modal fade" id="editBrand" tabindex="-1" aria-labelledby="exampleModalLabel"
          aria-hrub_brand_idden="true">
          <div class="modal-dialog">
               <div class="modal-content">
                    <div class="modal-header bg-danger bg-opacity-50">
                         <h1 class="modal-title fs-5" style="color:white">แก้ไขยี่ห้อยาง</h1>
                         <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                         <form>
                              <div class="form-floating mb-2">
                                   <input type="text" class="form-control text-uppercase" required
                                        placeholder="รหัสยี่ห้อ" v-model.trim="this.rubBrand_edit.rub_brand_shotname"
                                        @input="this.rubBrand_edit.rub_brand_shotname = this.rubBrand_edit.rub_brand_shotname.toUpperCase()">
                                   <label for="floatingInput">ชื่อยี่ห้อยาง(ย่อ)</label>
                              </div>
                              <div class="form-floating mb-2">
                                   <input type="text" class="form-control text-uppercase" required
                                        placeholder="ชื่อยี่ห้อ" v-model="this.rubBrand_edit.rub_brand_name"
                                        @input="this.rubBrand_edit.rub_brand_name = this.rubBrand_edit.rub_brand_name.toUpperCase()">
                                   <label for="floatingInput">ชื่อยี่ห้อยาง</label>
                              </div>
                         </form>
                    </div>
                    <div class="modal-footer">
                         <button type="button" class="btn btn-secondary"
                              @click.prevent="hideModal('editBrand')">ปิด</button>
                         <button type="button" class="btn btn-primary" @click.prevent="editRubBrand()">บันทึก</button>
                    </div>
                    <!-- {{ this.rubBrand_edit }} -->
               </div>
          </div>
     </div>
     <!--  -->

     <div class="card shadow" style="width:100%;">
          <div class="card-header bg-primary" style="color:white;">
               ::: แสดงรายการ-ยี่ห้อยาง :::
          </div>
          <table id="showrubberbrand" class="table table-striped table-hover table-sm"
               style="width: 100%; align-items: center">
               <thead>
                    <tr>
                         <th>ลำดับ</th>
                         <th>รหัสยี่ห้อยาง</th>
                         <th>ชื่อยี่ห้อยาง</th>
                         <th style="text-align:right">
                              <button class="btn btn-success btn-sm me-md-2" @click.prevent="showModal('newBrand')">
                                   <!-- ปุ่มเพิ่มข้อมูล -->
                                   <font-awesome-icon icon="fa-solid fa-plus" />
                              </button>
                         </th>
                         <!-- <th></th> -->
                    </tr>
               </thead>
               <tbody class="table-group-divider">
                    <tr v-for="rec in data_row" :key="rec.rub_brand_id" @click.prevent="getRubBrandToEdit(rec)">
                         <td>{{ rec.rub_brand_id }}</td>
                         <td>{{ rec.rub_brand_shotname }}</td>
                         <td>{{ rec.rub_brand_name }}</td>
                         <td style="text-align:right">
                              <button rub_brand_id="edit" type='button' class='btn btn-primary btn-sm me-md-2'
                                   @click.prevent="getRubBrandToEdit(rec)">
                                   <!-- ปุ่มแก้ไขข้อมูล -->
                                   <font-awesome-icon icon="fa-solid fa-pen" />
                              </button>
                         </td>
                         <!-- <td style="text-align:left">
                              <button class='btn btn-danger btn-sm me-md-1'>                                   
                                   <font-awesome-icon icon="fa-solrub_brand_id fa-trash-can" />
                              </button>
                         </td> -->
                    </tr>
               </tbody>
          </table>
     </div>
</template>

<script>
//import axios from 'axios';
import $ from "jquery";
import axios from "@/axios";
import { Modal } from "bootstrap"

export default {
     data() {
          return {
               data_row: [],
               rubBrand: {
                    rub_brand_id: "",
                    rub_brand_shotname: "",
                    rub_brand_name: ""
               },
               rubBrand_edit: {
                    rub_brand_id: "",
                    rub_brand_shotname: "",
                    rub_brand_name: ""
               }
          }
     },
     mounted() {
          this.getRubberBrandData();
     },
     methods: {
          async getRubberBrandData() {
               await axios.get(`rubberbrand/read`).then((response) => {
                    this.data_row = response.data;
                    $(document).ready(function () {
                         $('#showrubberbrand').DataTable({
                              "scrollY": '320px',
                              bJQueryUI: true,
                              sPaginationType: "full_numbers",
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
          async newRubBrand() {
               if (this.rubBrand.rub_brand_shotname == '' || this.rubBrand.rub_brand_name == '') {
                    alert("กรุณากรอกช้อมูลให้ครบถ้วนก่อนการบันทึก !!!")
               } else {
                    if (confirm("ยืนยันการบันทึกข้อมูล ?") == true) {
                         await axios.post(`rubberbrand/new`, this.rubBrand).then(() => {
                              this.rubBrand = {
                                   rub_brand_id: "",
                                   rub_brand_shotname: "",
                                   rub_brand_name: ""
                              }
                              this.hideModal("newBrand")
                              $("#showrubberbrand").DataTable().destroy();
                              this.getRubberBrandData();
                              console.log('Process success!');
                         }).catch(error => {
                              console.log(error)
                         })
                    }
               }
          },
          async editRubBrand() {
               if (this.rubBrand_edit.rub_brand_shotname == '' || this.rubBrand_edit.rub_brand_name == '') {
                    alert("กรุณากรอกช้อมูลให้ครบถ้วนก่อนการบันทึก !!!")
               } else {
                    if (confirm("ยืนยันการเปลี่ยนแปลงข้อมูล ?") == true) {
                         await axios.post(`rubberbrand/update`, this.rubBrand_edit).then(() => {
                              this.rubBrand_edit = {
                                   rub_brand_id: "",
                                   rub_brand_shotname: "",
                                   rub_brand_name: ""
                              };
                              this.hideModal("editBrand");
                              $("#showrubberbrand").DataTable().destroy(); //--- ทำลาย Datatable
                              this.getRubberBrandData();
                         })
                    }
               }
          },
          getRubBrandToEdit(val) {
               this.rubBrand_edit.rub_brand_id = val.rub_brand_id
               this.rubBrand_edit.rub_brand_shotname = val.rub_brand_shotname
               this.rubBrand_edit.rub_brand_name = val.rub_brand_name
               this.showModal("editBrand")
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