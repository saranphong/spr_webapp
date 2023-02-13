<template>
     <div class="container-fluid align-content-start ms-0">
          <div class="card card-primary mx-auto shadow-lg" style="width:auto">
               <div class="card-header bg-primary">
                    <h5 class="card-title" style="color: white">
                         เพิ่มข้อมูลลูกค้า
                    </h5>
               </div>
               <form>
                    <div class="card-body">
                         <div class="form-group">
                              <div class="row">
                                   <div class="col-6">
                                        <div class="row">
                                             <div class="col-4">
                                                  <label style="color: red">*รหัสลูกค้า</label>
                                                  <input type="text" class="form-control text-uppercase"
                                                       v-model.trim="this.customer.customerId"
                                                       @input="this.customer.customerId = this.customer.customerId.toUpperCase()"
                                                       @keyup="chkCustomerID(customer.customerId)" />
                                                  <span>
                                                       <label v-if="this.cust_id != ''"
                                                            style="color:red;font-weight:bold">***รหัสนี้ซ้ำไม่สามารถใช้ได้***
                                                       </label>
                                                  </span>
                                             </div>
                                             <div class="col-8">
                                                  <label style="color: red">*ชื่อลูกค้า</label>
                                                  <input type="text" id="input_name" class="form-control"
                                                       v-model.trim="customer.customerName" required />
                                             </div>
                                        </div>
                                        <div class="row mt-1">
                                             <div class="col">
                                                  <label>ที่อยู่ลูกค้า</label>
                                                  <input type="text" class="form-control"
                                                       v-model.trim="customer.customerAddr" />
                                             </div>
                                        </div>
                                        <div class="row mt-1">
                                             <div class="col-8">
                                                  <label>จังหวัด</label>
                                                  <select class="form-select" id="findSelect"
                                                       v-model="customer.province_id">
                                                       <option v-for="province in province_id"
                                                            :key="province.PROVINCE_ID" :value="province.PROVINCE_ID">
                                                            {{ province.PROVINCE_NAME }}
                                                       </option>
                                                  </select>
                                             </div>
                                             <div class="col-4">
                                                  <label>รหัสไปรษณีย์</label>
                                                  <input type="text" class="form-control" v-model="customer.postCode" />
                                             </div>
                                        </div>
                                        <div class="row mt-1">
                                             <div class="col">
                                                  <label>เบอร์โทรศัพท์</label>
                                                  <input type="text" class="form-control"
                                                       v-model="customer.customerTel" />
                                             </div>
                                        </div>
                                   </div>
                                   <div class="col-6">
                                        <div class="row">
                                             <div class="col-4">
                                                  <label>ชื่อผู้ติดต่อ</label>
                                                  <input type="text" class="form-control"
                                                       v-model="customer.contactName" />
                                             </div>
                                             <div class="col-4">
                                                  <label>เบอร์โทรผู้ติดต่อ</label>
                                                  <input type="text" class="form-control"
                                                       v-model="customer.contactTel" />
                                             </div>
                                             <div class="col-4">
                                                  <label>ตำแหน่งงาน</label>
                                                  <input type="text" class="form-control"
                                                       v-model="customer.contactPosition" />
                                             </div>
                                        </div>

                                        <!-- <div class="mb-2">
                                             <label>ประเภทการชำระเงิน</label>
                                             <select class="form-select" @change="setCreditday"
                                                  v-model="customer.payType">
                                                  <option value="1">เงินสด</option>
                                                  <option value="2">เครดิต</option>
                                             </select>
                                        </div> -->
                                        <!-- ตรวจสอบสิทธิ์ในการเครดิต -->
                                        <!-- <div class="row border-0" v-if="customer.payType == 2">
                                             <div class="col">
                                                  <label>เครดิต (วัน)</label>
                                                  <div class="input-group">
                                                       <input type="number" class="form-control"
                                                            v-model="customer.creditDay" style="width: auto;" />
                                                  </div>
                                             </div>
                                             <div class="col">
                                                  <label>วงเงิน (บาท)</label>
                                                  <div class="input-group">
                                                       <input type="number" class="form-control"
                                                            v-model="customer.creditLimit" style="width:auto;" />
                                                  </div>
                                             </div>
                                        </div> -->
                                        <!-- สิ้นสุดตรวจสอบสิทธิ์ในการเครดิต -->
                                        <!-- <div class="mb-2 mt-2">
                                             <label>ประเภทราคา</label>
                                             <select class="form-select" v-model="customer.priceType">
                                                  <option value="1">เงินสด</option>
                                                  <option value="2">เงินสด+จัดส่ง</option>
                                                  <option value="3">เครดิต</option>
                                                  <option value="4">ราคาพิเศษ</option>
                                             </select>
                                        </div> -->
                                        <div class="mt-1">
                                             <label>บันทึกเพิ่มเติม</label>
                                             <textarea class="form-control" v-model="customer.remark"
                                                  style="height: 170px"></textarea>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>
                    <div class="card-footer">
                         <!-- ปุ่มบันทึก -->
                         <div style="text-align:center;">
                              <button class="btn btn-primary rounded-4" v-if="(this.cust_id == '') && (this.customer.customerId != '')"
                                   @click.prevent="saveNewCustomer()" style="text-align:center;color:white">
                                   <font-awesome-icon icon="fa-solid fa-circle-check" style="color:white" />
                                   &nbsp;บันทึกข้อมูล
                              </button>
                              <button class="btn btn-primary rounded-4" v-else @click.prevent="chkCustomerID(customer.customerId)"
                                   style="text-align:center;color:white" disabled>
                                   <font-awesome-icon icon="fa-solid fa-circle-check" style="color:white" />
                                   &nbsp;บันทึกข้อมูล
                              </button>
                         </div>
                    </div>
               </form>
               <!-- {{ customer }} -->
          </div>
     </div>
     <!-- {{ customer }} -->
</template>
<script>
import $ from "jquery"
import axios from "@/axios";
//import $ from "jquery";
// const axios = require("@/axios");

export default {
     data() {
          return {
               cust_id: "",
               province_id: [],
               customer: {
                    customerId: "",
                    customerName: "",
                    customerAddr: "",
                    province_id: "",
                    postCode: "",
                    customerTel: "",
                    contactName: "",
                    contactTel: "",
                    contactPosition: "",
                    // payType: "1",
                    // creditDay: "0",
                    // creditLimit: "0",
                    // priceType: "1",
                    remark: "",
                    customerDel: "1"
               },
          };
     },
     mounted() {
          this.getProvince();
          this.onSelect2();
     },
     methods: {
          onSelect2() {
               $(document).ready(() => {
                    let rec = this.customer;
                    $('#findSelect').select2({
                         theme: "bootstrap-5",
                         closeOnSelect: true,
                         width: '100%',
                         dropdownParent: $("#findSelect").parent(),
                         placeholder: "--- เลือกจังหวัด ---",
                         // tags: true,
                    });
                    $('#findSelect').on('select2:select', (e) => {
                         let data = e.params.data;
                         // $('#findSize1').val(data.id)
                         rec.province_id = data.id;
                    })
               });
          },
          async saveNewCustomer() {
               if (confirm("ยืนยันการบันทึกข้อมูล ?") == true) {
                    await axios.post(`customer/new`, this.customer).then(() => {
                         this.customer = {
                              customerId: "",
                              customerName: "",
                              customerAddr: "",
                              province_id: "",
                              postCode: "",
                              customerTel: "",
                              contactName: "",
                              contactTel: "",
                              contactPosition: "",
                              payType: "",
                              creditDay: "",
                              creditLimit: "",
                              priceType: "",
                              remark: "",
                              customerDel: ""
                         }
                         console.log('Process success!');
                    })
                         .catch(error => {
                              console.log(error)
                         })
                    //await this.$router.push("/");
                    //await this.$router.go();
                    await this.$router.push("/showcustomer");
               }
          },
          getProvince() {
               axios.get(`province/read`).then((response) => {
                    this.province_id = response.data;
               });
          },
          chkCustomerID(val) {
               //this.customer.customerId = this.customer.customerId.toLocaleUpperCase();
               axios.get(`customer/search/${val}`).then((response) => {
                    this.cust_id = response.data;
               });
          },
          setCreditday() {
               if (this.customer.payType == 1) {
                    this.customer.creditDay = 0;
                    this.customer.creditLimit = 0;
                    this.customer.priceType = 1;
               } else {
                    this.customer.creditDay = 30;
                    this.customer.creditLimit = 0;
                    this.customer.priceType = 3;
               }
          },
     },
};
</script>
