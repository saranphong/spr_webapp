<template>
     <Loading v-model:active="isLoading" />
     <div class="scroll">
          <!-- Modal สำหรับการสร้างใบรับ -->
          <div class="modal fade rounded-3" id="importHeader" tabindex="-1" aria-hidden="true"
               aria-labelledby="exampleModalLabel">
               <div class="modal-dialog modal-xl" role="document">
                    <div class="modal-content">
                         <div class="modal-header bg-primary bg-opacity-75" style="color: white">
                              <h1 class="modal-title fs-5" style="color: white" id="exampleModalLabel">ใบรับ</h1>
                         </div>
                         <div class="modal-body">
                              <div class="row">
                                   <div class="col" style="text-align: left">
                                        <label>ประเภทใบรับ</label>
                                        <select class="form-select" v-model="this.import_header.job_type_id" disabled>
                                             <option value="1">ค่าจ้าง</option>
                                             <option value="2">ยางพร้อมโครง</option>
                                        </select>
                                   </div>
                                   <div class="col" style="text-align: left">
                                        <label>เล่มที่</label>
                                        <input type="text" class="form-control" id="book_id"
                                             v-model.trim="this.import_header.import_book_id"
                                             @keyup.enter="this.func.setFocus('book_no')" />
                                   </div>
                                   <div class="col" style="text-align: left">
                                        <label>เลขที่</label>
                                        <input type="text" class="form-control" id="book_no"
                                             v-model.trim="this.import_header.import_book_no"
                                             @keyup.enter="saveImportBill()" />
                                   </div>
                                   <div class="col" style="text-align: left">
                                        <label>วันที่เปิดใบรับ(DD/MM/YYYY)</label>
                                        <!-- <input type="date" id="datepicker" class="form-control"
                                             v-model="this.import_header.import_date"  min="2020-01-01" max="2050-12-31" /> -->
                                        <input type="text" id="datepicker" class="form-control"
                                             v-model="this.import_header.import_date" readonly />
                                        <!-- <Datepicker v-model="this.import_header.import_date" :format="format"
                                             autoApply /> -->
                                   </div>
                                   <div class="col" style="text-align: left">
                                        <label>การชำระเงิน</label>
                                        <select id="pay_type" class="form-control form-select"
                                             v-model="this.import_header.pay_type"
                                             style="color:blue; font-weight:bold;">
                                             <option value="1">เงินสด</option>
                                             <option value="2">เงินสด+จัดส่ง</option>
                                        </select>
                                   </div>
                              </div>
                              <div class="row mt-1">
                                   <div class="col-3" style="text-align: left">
                                        <label>ชื่อลูกค้า</label>
                                        <input type="text" class="form-control" v-model="this.tmp_cust_name" readonly />
                                   </div>
                                   <div class="col-6" style="text-align: left">
                                        <label>ที่อยู่ลูกค้า</label>
                                        <input type="text" class="form-control" v-model="this.tmp_cust_addr" readonly />
                                   </div>
                                   <div class="col-3" style="text-align: left">
                                        <label>เบอร์โทร</label>
                                        <input type="text" class="form-control" v-model="this.tmp_cust_tel" readonly />
                                   </div>
                              </div>
                              <div class="row-12 mt-2" style="text-align: center">
                                   <button type="button" class="btn btn-danger rounded-2 me-2"
                                        @click.prevent="this.func.hideModal('importHeader')">
                                        <font-awesome-icon icon="fa-solid fa-ban" />&nbsp;ปิดหน้าต่าง
                                   </button>
                                   <button type="button" class="btn btn-primary rounded-2 me-2"
                                        @click.prevent="saveImportBill()">
                                        <font-awesome-icon icon="fa-solid fa-check-to-slot" />&nbsp;บันทึกใบรับ
                                   </button>
                              </div>
                              <!-- {{ this.import_header }} -->
                         </div>
                    </div>
               </div>
          </div>
          <!-- สิ้นสุดการสร้างใบรับ -->

          <!-- Modal สำหรับการแก้ไขข้อมูล -->
          <div class="modal fade rounded-3" id="editCustModal" tabindex="-1" aria-hidden="true">
               <div class="modal-dialog modal-xl" role="document">
                    <div class="modal-content">
                         <div class="modal-header bg-danger bg-opacity-75">
                              <h1 class="modal-title fs-5" style="color: white" id="exampleModalLabel">
                                   ดูรายละเอียด / แก้ไข
                              </h1>
                              <button type="button" class="btn-close" data-bs-dismiss="modal"
                                   aria-label="Close"></button>
                         </div>
                         <div class="modal-body">
                              <div class="card-body">
                                   <div class="row">
                                        <div class="col-6">
                                             <div class="row">
                                                  <div class="col-4">
                                                       <label style="color: red">*รหัสลูกค้า</label>
                                                       <input type="text" class="form-control"
                                                            v-model.trim="editCustomer.customerId" disabled />
                                                  </div>
                                                  <div class="col-8">
                                                       <label style="color: red">*ชื่อลูกค้า</label>
                                                       <input type="text" id="input_name" class="form-control"
                                                            v-model.trim="editCustomer.customerName" />
                                                  </div>
                                             </div>
                                             <div class="row mt-1">
                                                  <div class="col">
                                                       <label>ที่อยู่ลูกค้า</label>
                                                       <input type="text" class="form-control"
                                                            v-model.trim="editCustomer.customerAddr" />
                                                  </div>
                                             </div>
                                             <div class="row mt-1">
                                                  <div class="col-8">
                                                       <label>จังหวัด</label>
                                                       <select class="form-select" id="findSelect"
                                                            v-model="editCustomer.province_id">
                                                            <option v-for="province in province_id"
                                                                 :key="province.PROVINCE_ID"
                                                                 :value="province.PROVINCE_ID">
                                                                 {{ province.PROVINCE_NAME }}
                                                            </option>
                                                       </select>
                                                  </div>
                                                  <div class="col-4">
                                                       <label>รหัสไปรษณีย์</label>
                                                       <input type="text" class="form-control"
                                                            v-model="editCustomer.postCode" />
                                                  </div>
                                             </div>
                                             <div class="row mt-1">
                                                  <div class="col">
                                                       <label>เบอร์โทรศัพท์</label>
                                                       <input type="text" class="form-control"
                                                            v-model="editCustomer.customerTel" />
                                                  </div>
                                             </div>
                                        </div>
                                        <div class="col-6">
                                             <div class="row">
                                                  <div class="col-4">
                                                       <label>ชื่อผู้ติดต่อ</label>
                                                       <input type="text" class="form-control"
                                                            v-model="editCustomer.contactName" />
                                                  </div>
                                                  <div class="col-4">
                                                       <label>เบอร์โทรผู้ติดต่อ</label>
                                                       <input type="text" class="form-control"
                                                            v-model="editCustomer.contactTel" />
                                                  </div>
                                                  <div class="col-4">
                                                       <label>ตำแหน่งงาน</label>
                                                       <input type="text" class="form-control"
                                                            v-model="editCustomer.contactPosition" />
                                                  </div>
                                             </div>
                                             <!-- <div class="mb-2">
                                                  <label>ประเภทการชำระเงิน</label>
                                                  <select class="form-select" @change="setCreditday"
                                                       v-model="editCustomer.payType">
                                                       <option value="1">เงินสด</option>
                                                       <option value="2">เครดิต</option>
                                                  </select>
                                             </div> -->
                                             <!-- ตรวจสอบสิทธิ์ในการเครดิต -->
                                             <!-- <div class="row border-0" v-if="editCustomer.payType == 2">
                                                  <div class="col">
                                                       <label>เครดิต (วัน)</label>
                                                       <div class="input-group">
                                                            <input type="number" class="form-control"
                                                                 v-model="editCustomer.creditDay" style="width: auto" /> -->
                                             <!-- <span class="input-group-text" style="width:100%;">วัน</span> -->
                                             <!-- </div>
                                                  </div>
                                                  <div class="col">
                                                       <label>วงเงิน (บาท)</label>
                                                       <div class="input-group">
                                                            <input type="number" class="form-control"
                                                                 v-model="editCustomer.creditLimit"
                                                                 style="width: auto" /> -->
                                             <!-- <span class="input-group-text" style="width:100%;">บาท</span> -->
                                             <!-- </div>
                                                  </div>
                                             </div> -->
                                             <!-- สิ้นสุดตรวจสอบสิทธิ์ในการเครดิต -->
                                             <!-- <div class="mb-2 mt-2">
                                                  <label>ประเภทราคาที่</label>
                                                  <select class="form-select" v-model="editCustomer.priceType">
                                                       <option value="1">เงินสด</option>
                                                       <option value="2">เงินสด+จัดส่ง</option>
                                                       <option value="3">เครดิต</option>
                                                       <option value="4">ราคาพิเศษ</option>
                                                  </select>
                                             </div> -->
                                             <div class="row mt-1">
                                                  <div class="col">
                                                       <label for="comment">บันทึกเพิ่มเติม</label>
                                                       <textarea class="form-control" v-model="editCustomer.remark"
                                                            style="height: 170px"></textarea>
                                                  </div>
                                             </div>
                                        </div>
                                   </div>
                              </div>
                              <!-- {{ editCustomer }} -->
                         </div>
                         <div class="modal-footer">
                              <!-- ปุ่มปิด -->
                              <button type="button" class="btn btn-danger rounded-4"
                                   @click.prevent="this.func.hideModal('editCustModal')">
                                   ปิดหน้าต่าง&nbsp;<font-awesome-icon icon="fa-solid fa-ban" />
                              </button>
                              <!-- ปุ่มบันทึก -->
                              <button id="btn" class="btn btn-primary rounded-4" @click.prevent="saveEditCustomer()">
                                   บันทึกข้อมูล&nbsp;<font-awesome-icon icon="fa-solid fa-floppy-disk" />
                              </button>
                         </div>
                    </div>
               </div>
          </div>
          <!-- สิ้นสุดการแก้ไขข้อมูล(Modal) -->
          <div class="card card-primary shadow-lg" style="width: 100%">
               <div class="card-header bg-primary" style="color: white">
                    ::: แสดงรายการ-ลูกค้า :::
               </div>
               <div class="card-body">
                    <table id="showcustomer" class="table table-striped table-hover table-sm nowrap"
                         style="width: 90%; align-items: center">
                         <thead>
                              <tr>
                                   <th>รหัสลูกค้า</th>
                                   <th>ชื่อลูกค้า</th>
                                   <th>ที่อยู่ลูกค้า</th>
                                   <th>เบอร์ติดต่อ</th>
                                   <th>จังหวัด</th>
                                   <th style="text-align: right">
                                        <button class="btn btn-success btn-sm" title="เพิ่มข้อมูล"
                                             @click="newCustomer()">
                                             <!-- ปุ่มเพิ่มข้อมูล -->
                                             <!-- <font-awesome-icon icon="fa-solid fa-plus" /> -->
                                             <font-awesome-icon icon="fa-solid fa-user-plus" />
                                        </button>
                                   </th>
                                   <th></th>
                              </tr>
                         </thead>
                         <tbody class="table-group-divider">
                              <tr v-for="rec in data_row" :key="rec.customerId">
                                   <td @click.prevent="editCustomer_Modal(rec)">{{ rec.customerId }}</td>
                                   <td @click.prevent="editCustomer_Modal(rec)">{{ rec.customerName }}</td>
                                   <td @click.prevent="editCustomer_Modal(rec)">{{ rec.customerAddr }}</td>
                                   <td @click.prevent="editCustomer_Modal(rec)">{{ rec.customerTel }}</td>
                                   <td @click.prevent="editCustomer_Modal(rec)">{{ rec.PROVINCE_NAME }}</td>
                                   <td style="text-align: right">
                                        <button id="edit" class="btn btn-primary btn-sm" title="แก้ไขข้อมูล"
                                             @click.prevent="editCustomer_Modal(rec)">
                                             <font-awesome-icon icon="fa-solid fa-user-pen" />
                                        </button>
                                   </td>
                                   <td style="text-align: left">
                                        <button class="btn btn-info btn-sm" title="ทำใบรับ"
                                             @click.prevent="showDatePicker(); importBill(rec)">
                                             <font-awesome-icon icon="fa-regula fa-file-lines" />
                                        </button>
                                   </td>
                              </tr>
                         </tbody>
                    </table>
               </div>
          </div>
     </div>
</template>

<script>
import axios from "@/axios";
import $ from "jquery";
import { ref } from "vue";
import func from "../func.js"

export default {
     setup() {
          const date = ref(new Date());
          const format = (date) => {
               const d = date.getDate();
               const m = date.getMonth() + 1;
               const y = date.getFullYear();
               return `${d}/${m}/${y}`;
          }
          return {
               date, format
          }
     },
     data() {
          return {
               func: func,
               isLoading: false,
               data_row: [],
               province_id: [],
               check_bill_header: "",
               newRec: {
                    customerId: "",
                    customerName: "",
                    customerAddr: "",
                    province_id: "",
                    postCode: "",
                    customerTel: "",
                    contactName: "",
                    contactTel: "",
                    contactPosition: "",
                    // payType: "",
                    // creditDay: "",
                    // creditLimit: "",
                    // priceType: "",
                    remark: "",
                    customerDel: "",
               },
               editCustomer: {
                    customerId: "",
                    customerName: "",
                    customerAddr: "",
                    province_id: "",
                    postCode: "",
                    customerTel: "",
                    contactName: "",
                    contactTel: "",
                    contactPosition: "",
                    // payType: "",
                    // creditDay: "",
                    // creditLimit: "",
                    // priceType: "",
                    remark: "",
                    customerDel: "",
               },
               // temp
               tmp_cust_name: "",
               tmp_cust_addr: "",
               tmp_cust_tel: "",
               import_header: {
                    import_book_id: "",
                    import_book_no: "",
                    cust_auto_id: "",
                    import_user: 1,
                    job_type_id: "",
                    pay_type: 1,
                    import_date: "",
                    import_status: "รอดำเนินการ",
               },
          };
     },
     async created() {

     },
     mounted() {
          const today = Promise.resolve(func.setToday());
          today.then(value => {
               this.import_header.import_date = value
          });
          this.getData();
          // const myDate = await new Date();
          // const myMonth = await myDate.getMonth() + 1;
          // const newDate = await myDate.getDate() + "/" + myMonth + "/" + myDate.getFullYear();
          // this.import_header.import_date = await newDate;
     },
     methods: {
          onSelect2() {
               $(document).ready(() => {
                    let rec = this.editCustomer;
                    $("#findSelect").select2({
                         theme: "bootstrap-5",
                         closeOnSelect: true,
                         width: "100%",
                         dropdownParent: $("#findSelect").parent(),
                         placeholder: "--- เลือกจังหวัด ---",
                         // tags: true,
                    });
                    $("#findSelect").on("select2:select", function (e) {
                         let data = e.params.data;
                         rec.province_id = data.id;
                    });
               });
          },
          showDatePicker() {
               let data = this.import_header;
               $(document).ready(() => {
                    $('#datepicker').datepicker({
                         format: "dd/mm/yyyy",
                         autoclose: true,
                         toggleActive: true,
                    });
                    $('#datepicker').change(() => {
                         data.import_date = $('#datepicker').val();
                    })
               });
          },
          convertDateToMySql(isdate) {
               const convertdate = isdate.split("/");
               const dateToMySql = convertdate[2] + "-" + convertdate[1] + "-" + convertdate[0];
               return dateToMySql;
          },
          goLoading() {
               this.isLoading = true;
               setTimeout(() => {
                    this.isLoading = false;
               }, 5000);
          },
          newCustomer() {
               this.$router.push("/newcustomer");
          },
          async editCustomer_Modal(val) {
               this.editCustomer.customerId = await val.customerId;
               this.editCustomer.customerName = await val.customerName;
               this.editCustomer.customerAddr = await val.customerAddr;
               this.editCustomer.province_id = await val.province_id;
               this.editCustomer.postCode = await val.postCode;
               this.editCustomer.customerTel = await val.customerTel;
               this.editCustomer.contactName = await val.contactName;
               this.editCustomer.contactTel = await val.contactTel;
               this.editCustomer.contactPosition = await val.contactPosition;
               // this.editCustomer.payType = await val.payType;
               // this.editCustomer.creditDay = await val.creditDay;
               // this.editCustomer.creditLimit = await val.creditLimit;
               // this.editCustomer.priceType = await val.priceType;
               this.editCustomer.remark = await val.remark;
               this.editCustomer.customerDel = await val.customerDel;
               await func.showModal("editCustModal");
               await this.onSelect2();
               //this.inputFocus("editCustModal", "input_name");
          },
          async saveNewrec() {
               // await axios.post(`${apiURL}/customer/new`, this.newRec).then(() => {
               await axios.post(`customer/new`, this.newRec).then(() => {
                    this.newRec = {
                         customerId: "",
                         customerName: "",
                         customerAddr: "",
                         province_id: "",
                         postCode: "",
                         customerTel: "",
                         contactName: "",
                         contactTel: "",
                         contactPosition: "",
                         // payType: "",
                         // creditDay: "",
                         // creditLimit: "",
                         // priceType: "",
                         remark: "",
                         customerDel: "",
                    };
                    this.$router.push("/showcustomer");
                    console.log("Process success!");
               }).catch((error) => {
                    console.log(error);
               });
               this.$router.push("/");
          },
          async saveEditCustomer() {
               if (confirm("ยืนยันการเปลี่ยนแปลงข้อมูล ?") == true) {
                    await axios.post(`customer/update`, this.editCustomer).then(() => {
                         this.editCustomer = {
                              customerId: "",
                              customerName: "",
                              customerAddr: "",
                              province_id: "",
                              postCode: "",
                              customerTel: "",
                              contactName: "",
                              contactTel: "",
                              contactPosition: "",
                              // payType: "",
                              // creditDay: "",
                              // creditLimit: "",
                              // priceType: "",
                              remark: "",
                              customerDel: "",
                         };
                         func.hideModal("editCustModal");
                         // ---------------------------------
                         // $("#showcustomer").DataTable().destroy(); //--- ทำลาย Datatable
                         this.getData();
                         console.log("Process success!");
                    })
                         .catch((error) => {
                              console.log(error);
                         });
               }
          },
          async getData() {
               this.goLoading();
               await axios.get(`customer/read`).then((response) => {
                    this.data_row = response.data;
                    $(document).ready(function () {
                         $("#showcustomer").DataTable({
                              // "fnRowCallback": function (nRow, aData,) { // เช็คเงื่อนไขในแต่ละเรคคอร์ด
                              //      if (aData[3] == "handsome") {
                              //           $('td', nRow).css('color', 'Red');
                              //      }
                              // }
                              //"dom": 'Bfrtip',
                              //"buttons": ['excel', 'pdf'],
                              "ordering": true,
                              "bFilter": true,
                              "paging": true,
                              deferRender: true,
                              processing: true,
                              "orderClasses": false,
                              "scrollY": "300",
                              "bJQueryUI": true,
                              "autoFill": true,
                              "sPaginationType": "full_numbers",
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
               await axios.get(`province/read`).then((response) => {
                    this.province_id = response.data;
               });
          },
          setCreditday() {
               if (this.editCustomer.payType == 1) {
                    this.editCustomer.creditDay = 0;
                    this.editCustomer.creditLimit = 0;
                    this.editCustomer.priceType = 1;
               } else {
                    this.editCustomer.creditDay = 30;
                    this.editCustomer.creditLimit = 0;
                    this.editCustomer.priceType = 3;
               }
          },
          importBill(val) {
               // sessionStorage.setItem("cust_id", val.cust_auto_id);
               // this.$router.push("/importWork");
               let imp_type;
               if (val.cust_auto_id == 1) {
                    imp_type = 2;
               } else {
                    imp_type = 1;
               }
               this.tmp_cust_name = val.customerName;
               this.tmp_cust_addr = val.customerAddr;
               this.tmp_cust_tel = val.customerTel;
               this.import_header.cust_auto_id = val.cust_auto_id;
               this.import_header.job_type_id = imp_type;
               func.showModal("importHeader");
               func.setFocusInModal("importHeader", "book_id")
          },
          async saveImportBill() {
               if (this.import_header.import_book_id == "" ||
                    this.import_header.import_book_no == "" ||
                    this.import_header.import_date == "") {
                    alert("กรุณากรอกข้อมูลให้ครบถ้วน(เล่มที่, เลขที่ หรือ วันที่) !!!");
                    func.setFocus("book_id");
               }
               else {
                    await this.chkImportHeader(this.import_header.import_book_id, this.import_header.import_book_no);
                    if (await this.check_bill_header == 0) {
                         if (await confirm("ยืนยันการสร้างใบรับ") == true) {
                              this.import_header.import_date = this.convertDateToMySql(this.import_header.import_date);
                              //alert(this.import_header.import_date);
                              await sessionStorage.setItem('import_book_id', this.import_header.import_book_id);
                              await sessionStorage.setItem('import_book_no', this.import_header.import_book_no);
                              await axios.post(`billimport/new`, this.import_header).then(() => {
                                   this.import_header = {
                                        import_book_id: "",
                                        import_book_no: "",
                                        cust_auto_id: "",
                                        import_user: "",
                                        job_type_id: "",
                                        pay_type: "",
                                        import_date: "",
                                        import_status: "รอดำเนินการ",
                                   };
                              }).catch((error) => { console.log(error); });
                              if (await confirm("บันทึกข้อมูลสำเร็จ...ต้องการเพิ่มรายการในบิลเลยหรือไม่?") == true) {
                                   func.hideModal("importHeader");
                                   this.$router.push("/importWork");
                              } else {
                                   await sessionStorage.removeItem('import_book_id');
                                   await sessionStorage.removeItem('import_book_no');
                                   await func.hideModal("importHeader");
                              }
                         }
                    }
                    else {
                         alert("ไม่สามารถใช้หมายเลขเล่ม และเลขบิลนี้ได้ กรุณาตรวจสอบ !!!");
                         func.setFocus("book_id");
                    }


               }
          },
          async chkImportHeader(val1, val2) {
               await axios.get(`billimport/search/${val1}/${val2}`).then((response) => {
                    this.check_bill_header = response.data.length;
               });
          },
     },
};
</script>

<style>

</style>
