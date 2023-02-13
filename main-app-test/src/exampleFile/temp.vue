<template>
     <!-- <button type="button" class="btn btn-primary mt-2" data-bs-toggle="modal" data-bs-target="#add_popup"
          data-bs-whatever="@mdo">เพิ่มข้อมูลใหม่</button> -->
     <!-- Modal สำหรับการเพิ่มข้อมูลใหม่ -->
     <div class="modal fade" id="add_popup" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
               <div class="modal-content">
                    <div class="modal-header">
                         <h1 class="modal-title fs-5" id="exampleModalLabel">
                              เพิ่มข้อมูลใหม่
                         </h1>
                         <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                         <form>
                              <div class="form-floating mb-2">
                                   <input id="input_email" type="text" class="form-control" placeholder="e-mail"
                                        v-model="newRec.email" />
                                   <label for="floatingInput">E-Mail</label>
                              </div>
                              <div class="form-floating mb-2">
                                   <input id="input_fullname" type="text" class="form-control" placeholder="fullname"
                                        v-model="newRec.fullname" />
                                   <label for="floatingInput">Full Name</label>
                              </div>
                              <div class="form-floating mb-2">
                                   <input id="input_password" type="text" class="form-control" placeholder="password"
                                        v-model="newRec.password" />
                                   <label for="floatingInput">password</label>
                              </div>
                         </form>
                         {{ newRec }}
                    </div>
                    <div class="modal-footer">
                         <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                              ปิด
                         </button>
                         <button id="newdataButton" type="button" class="btn btn-primary" @click.prevent="saveNewrec"
                              data-bs-dismiss="modal">
                              บันทึก
                         </button>
                    </div>
               </div>
          </div>
     </div>
     <!-- สิ้นสุดการเพิ่มข้อมูลใหม่ -->
     <!-- Modal สำหรับการแก้ไขข้อมูล -->
     <div class="modal fade" id="edit_popup" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
               <div class="modal-content">
                    <div class="modal-header">
                         <h1 class="modal-title fs-5" id="exampleModalLabel">
                              รายละเอียดข้อมูล
                         </h1>
                         <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                         <form>
                              <div class="form-floating mb-2">
                                   <input id="input_email" type="text" class="form-control" placeholder="e-mail"
                                        v-model="newDB.email" />
                                   <label for="floatingInput">E-Mail</label>
                              </div>
                              <div class="form-floating mb-2">
                                   <input id="input_fullname" type="text" class="form-control" placeholder="fullname"
                                        v-model="newDB.fullname" />
                                   <label for="floatingInput">Full Name</label>
                              </div>
                              <div class="form-floating mb-2">
                                   <input id="input_password" type="text" class="form-control" placeholder="password"
                                        v-model="newDB.password" />
                                   <label for="floatingInput">password</label>
                              </div>
                         </form>
                         {{ newDB }}
                    </div>
                    <div class="modal-footer">
                         <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                              ปิด
                         </button>
                         <button id="editDatabutton" type="submit" class="btn btn-primary" @click.prevent="editRec"
                              data-bs-dismiss="modal">
                              บันทึกการแก้ไข
                         </button>
                    </div>
               </div>
          </div>
     </div>
     <!-- สิ้นสุดการแก้ไขข้อมูล -->
     <!-- {{ this.info }} -->
     <table id="show" class="table table-striped table-hover table-sm" style="width: 100%; align-items: center">
          <thead>
               <tr>
                    <th>ID</th>
                    <th>E-Mail</th>
                    <th>Full Name</th>
                    <th>Password</th>
                    <th><button type="button" class="btn btn-primary btn-sm mt-2" @click="newCustomer">+</button></th>
                    <!-- data-bs-toggle="modal"
                              data-bs-target="#add_popup" -->
               </tr>
          </thead>
          <tbody class="table-group-divider">
               <tr id="detail" v-for="rec in info" :key="rec.id">
                    <td>{{ rec.id }}</td>
                    <td>{{ rec.email }}</td>
                    <td>{{ rec.fullname }}</td>
                    <td>{{ rec.password }}</td>
                    <td><button id="edit" type='button' class='btn btn-primary btn-sm me-md-1' data-bs-toggle='modal'
                              data-bs-target='#edit_popup'> Edit </button>
                    </td>
               </tr>
          </tbody>
     </table>
</template>
<script>

import axios from "axios";
import $ from "jquery";

export default {
     data() {
          return {
               info: [],
               newRec: {
                    //id: "",
                    email: "",
                    fullname: "",
                    password: "",
               },
               newDB: {
                    id: "",
                    email: "",
                    fullname: "",
                    password: "",
               },
          };
     },
     created() {
          this.getData();
     },
     methods: {
          newCustomer() {
               this.$router.push("/newCustomer");
          },
          onbtnClick() {
               alert("Hello Project");
          },
          saveNewrec() {
               let apiURL = "http://localhost:3000/create";
               axios.post(apiURL, this.newRec).then(() => {
                    this.newRec = {
                         email: "",
                         fullname: "",
                         password: ""
                    }
                    this.$router.push("/showcustomer");
                    console.log('Process success!');
               }).catch(error => {
                    console.log(error)
               })
               this.$router.push("/viewContent");
          },
          editRec() {
               //let apiURL = "http://localhost:3000/update/" + this.newDB.email + "/" + this.newDB.fullname + "/" + this.newDB.password
               let apiURL = "http://localhost:3000/update/"
               axios.patch(apiURL, this.newDB).then(() => {
                    this.newDB = {
                         id: 0,
                         email: "",
                         fullname: "",
                         password: ""
                    }
                    this.$router.push("/showcustomer");
                    console.log('Process success!');
               }).catch(error => {
                    console.log(error)
               })
               this.$router.push("/viewContent"); // มันจะอ่านบรรทัดนี้ก่อน แล้วถึงอ่านใน axios หลอกให้สลับหน้าเพื่อรีเฟรช datatable ก่อนหาวิธีได้
          },
          getData() {
               axios.get("http://localhost:3000/read").then((response) => {
                    this.info = response.data;
                    $(document).ready(function () {
                         $('#show').DataTable({

                              "fnRowCallback": function (nRow, aData,) {
                                   if (aData[3] == "handsome") {
                                        $('td', nRow).css('color', 'Red');
                                   }
                              }
                         });
                    });
               })
               let DB = this.newDB; //-- ประกาศ DB มารับตัวแปรจาก newDB ด้านบน ผลจากการทดลองมันไม่สามารถ Access ได้โดยตรงในส่วนของ JQuery

               // let table = $("#show").DataTable({ //--- ทำตารางโดยส่งข้อมูลเข้าไปใน Datatable ตรงๆ เลย
               //      //$('#show').DataTable({

               //      data: this.info,
               //      columns: [
               //           { data: "id" },
               //           { data: "email" },
               //           { data: "fullname" },
               //           { data: "password" },
               //           {
               //                defaultContent:
               //                     "<div style='text-align:right;'>"+
               //                     "<button id='edit' type='button' class='btn btn-primary btn-sm me-md-1' data-bs-toggle='modal' data-bs-target='#edit_popup'> Edit </button>" +
               //                     "<button id='delete' type='button' class='btn btn-primary btn-sm' data-bs-toggle='modal'> Delete </button>"+
               //                     "</div>"
               //           },
               //      ],
               // });

               // $("button").click(function() {
               //      if(this.id=="edit") {
               //           alert(table.row($(this).parents('tr')).data());
               //      } else if(this.id == "delete") {
               //          alert('Hello Delete');
               //      }
               // })

               $(document).ready(function () {
                    $('#show').on('click', '#edit', function () {
                         let table = $('#show').DataTable();
                         let newdata = table.row($(this).parents('tr')).data();
                         DB.id = newdata[0];
                         DB.email = newdata[1];
                         DB.fullname = newdata[2];
                         DB.password = newdata[3];
                    });
               })

               // $("#show").on("click", "#edit", function () {
               //      let newdata = table.row($(this).parents("tr")).data();
               //      DB.email = newdata.email;
               //      DB.fullname = newdata.fullname;
               //      DB.password = newdata.password;
               //      console.log(newdata)
               // });
          },
     },
};
</script>

<style>
.dataTables_filter {
     width: 35%;
     float: right;
     text-align: left;
}
</style>