<template>
     <button type="button" class="btn btn-primary mt-2" data-bs-toggle="modal" data-bs-target="#newTypepro"
          data-bs-whatever="@mdo">+</button>
     <div class="modal fade" id="newTypepro" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
               <div class="modal-content">
                    <div class="modal-header">
                         <h1 class="modal-title fs-5" id="exampleModalLabel">เพิ่มประเภทการผลิต</h1>
                         <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                         <form>
                              <div class="form-floating mb-2">
                                   <input type="text" class="form-control" required
                                        placeholder="รหัสประเภทการผลิต">
                                   <label for="floatingInput">รหัสประเภทการผลิต</label>
                              </div>
                              <div class="form-floating mb-2 mt-2">
                                   <select class="form-select" id="floatingSelect"
                                        aria-label="Floating label select example">
                                        <option value="1">จ้างอัด</option>
                                        <option value="2">พร้อมโครง</option>
                                   </select>
                                   <label for="floatingSelect">ประเภทการผลิต</label>
                              </div>
                              <div class="form-floating mb-2">
                                   <input type="text" class="form-control" required
                                        placeholder="รูปแบบการอัดดอก">
                                   <label for="floatingInput">รูปแบบการอัดดอก</label>
                              </div>
                         </form>
                    </div>
                    <div class="modal-footer">
                         <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">ปิด</button>
                         <button type="button" class="btn btn-primary">บันทึก</button>
                    </div>
               </div>
          </div>
     </div>
     <div class="row justify-content-center">
          <div class="col-md-6">
               <!-- List Student -->
               <h4>[ประเภทการผลิต]</h4>
               <table class="table">
                    <thead>
                         <tr>
                              <th scope="col">#</th>
                              <th scope="col">รหัสประเภทการผลิต</th>
                              <th scope="col">ประเภทการผลิต</th>
                              <th scope="col">รูปแบบการอัดดอก</th>
                         </tr>
                    </thead>
                    <tbody>
                         <tr>
                              <th scope="row">1</th>
                              <td>01</td>
                              <td>จ้างอัด</td>
                              <td>อัดดอกร้อน</td>
                         </tr>
                         <tr>
                              <th scope="row">2</th>
                              <td>02</td>
                              <td>พร้อมโครง</td>
                              <td>อัดดอกร้อน</td>
                         </tr>
                    </tbody>
               </table>
          </div>
     </div>
</template>
<script>
</script>