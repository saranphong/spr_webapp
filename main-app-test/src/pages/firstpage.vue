<template>
  <Loading v-model:active="isLoading" />
  <!-- <div class="row-12">
    <nav class="navbar navbar-expand-lg navbar-light" style="background-color:dodgerblue">
      <div class="container-fluid">
        <div class="navber-brand">
          <router-link to="/" class="navbar-brand">
            <img src="./assets/sprlogo.png" alt="" width="60" height="52" class="d-inline-block align-text-top">&nbsp;
            สมปองการยาง[Demo Version]
          </router-link>
        </div>
      </div>
    </nav>
  </div> -->
  <div class="container-fluid">
    <div class="row mt-2">
      <div class="col rounded-4 shadow-lg" style="background-color:darkblue">
        <!-- <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white vh-100"> -->
        <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white">
          <!-- ส่วนของเมนู -->
          <div class="card col-12" style="background-color:darkblue">
            <div class="card-header col-auto text-wrap" style="text-align:center">
              <div>
                <button type="button" @click="refresh" style="text-decoration:none">HOME</button>
              </div>
              <div>แผงควบคุมงาน</div>
            </div>
          </div>
          <ul class="list-unstyled">
            <!-- จัดการข้อมูลลูกค้า -->
            <li class="nav-item">
              <div class="d-grid gap-2">
                <button class="btn btn-outline-primary btnblock mt-2 third btn-menu" data-bs-toggle="collapse"
                  data-bs-target="#customer" aria-expanded="false" aria-controls="multiCollapseExample2"
                  style="color:white;text-align: left;">จัดการข้อมูลลูกค้า
                  &raquo;</button>
                <div id="customer" class="collapse">
                  <ul class="list-group list-unstyled">
                    <li class="btn mt-2" style="text-align: left;">
                      <router-link to="/newCustomer" class="text-white link-info rounded small fw-normal"
                        style="text-decoration: none">
                        บันทึกข้อมูลลูกค้า
                      </router-link>
                    </li>
                    <li class="btn mt-2" style="text-align: left;">
                      <router-link to="/showCustomer" class="text-white link-info rounded small fw-normal"
                        style="text-decoration: none">
                        ข้อมูลลูกค้า
                        <font-awesome-icon icon="fa-solid fa-address-book" />
                      </router-link>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            <!-- จัดการข้อมูลสินค้า -->
            <li class="nav-item">
              <div class="d-grid gap-2">
                <button class="btn btn-outline-primary btnblock mt-2 third btn-menu" data-bs-toggle="collapse"
                  data-bs-target="#product" aria-expanded="false" aria-controls="multiCollapseExample2"
                  style="color:white;text-align: left;">จัดการข้อมูลสินค้า
                  &raquo;</button>
                <div id="product" class="collapse">
                  <ul class="list-group list-unstyled">                    
                    <li class="btn mt-2" style="text-align: left;">
                      <router-link to="/productBrand" class="text-white link-info rounded small fw-normal"
                        style="text-decoration: none">
                        ข้อมูลยี่ห้อยาง</router-link>
                    </li>
                    <li class="btn mt-2" style="text-align: left;">
                      <router-link to="/productSize" class="text-white link-info rounded small fw-normal"
                        style="text-decoration: none">
                        ข้อมูลขนาดยาง</router-link>
                    </li>
                    <li class="btn mt-2" style="text-align: left;">
                      <router-link to="/productStyle" class="text-white link-info rounded small fw-normal"
                        style="text-decoration: none">
                        ข้อมูลลายดอกยาง</router-link>
                    </li>
                    <li class="btn mt-2" style="text-align: left;">
                      <router-link to="/productGrade" class="text-white link-info rounded small fw-normal"
                        style="text-decoration: none">
                        ข้อมูลเกรดยาง</router-link>
                    </li>
                    <li class="btn mt-2" style="text-align: left;">
                      <router-link to="/createProductList" class="text-white link-info rounded small fw-normal"
                        style="text-decoration: none">
                        สร้างรายการสินค้า</router-link>
                    </li>
                    <li class="btn mt-2" style="text-align: left;">
                      <router-link to="/productFixcost" class="text-white link-info rounded small fw-normal"
                        style="text-decoration: none">
                        กำหนดราคาสินค้า</router-link>
                    </li>
                    <!-- <li class="btn mt-2" style="text-align: left;">
                      <router-link to="/productType" class="text-white link-info rounded small fw-normal"
                        style="text-decoration: none">
                        ประเภทการผลิต</router-link>
                    </li> -->
                  </ul>
                </div>
              </div>
            </li>
            <!-- บันทึกรับยางเข้าระบบ -->
            <li class="nav-item">
              <div class="d-grid gap-2">
                <button class="btn btn-outline-primary btnblock mt-2 third btn-menu" data-bs-toggle="collapse"
                  data-bs-target="#checkinProduct" aria-expanded="false" aria-controls="multiCollapseExample2"
                  style="color:white;text-align: left;">จัดการการผลิตสินค้า
                  &raquo;</button>
                <div id="checkinProduct" class="collapse">
                  <ul class="list-group list-unstyled">
                    <!-- <li class="btn mt-2 text-white link-info rounded small fw-normal" style="text-align: left; text-decoration: none;" 
                      @click="router_link('importWork2');">
                      ใบรับยาง                    
                    </li> -->
                    <li class="btn mt-2" style="text-align: left;">
                      <router-link to="/listWork" class="text-white link-info rounded small fw-normal"
                        style="text-decoration: none">
                        รายการข้อมูลใบรับ</router-link>
                    </li>
                    <li class="btn mt-2" style="text-align: left;">
                      <router-link to="#" class="text-white link-info rounded small fw-normal"
                        style="text-decoration: none">
                        ทำใบเสนอราคา</router-link>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            <!-- การขายยางแบ่งเป็น VAT หรือ No VAT -->
            <li class="nav-item">
              <div class="d-grid gap-2">
                <button class="btn btn-outline-primary btnblock mt-2 third btn-menu" data-bs-toggle="collapse"
                  data-bs-target="#salesProduct" aria-expanded="false" aria-controls="multiCollapseExample2"
                  style="color:white;text-align: left;">จัดการการขายสินค้า
                  &raquo;</button>
                <div id="salesProduct" class="collapse">
                  <ul class="list-group list-unstyled">
                    <li class="btn mt-2" style="text-align: left;">
                      <router-link to="/" class="text-white link-info rounded small fw-normal"
                        style="text-decoration: none">
                        ขายประเภทที่ 1 (์NV)</router-link>
                    </li>
                    <li class="btn mt-2" style="text-align: left;">
                      <router-link to="/" class="text-white link-info rounded small fw-normal"
                        style="text-decoration: none">
                        ขายประเภทที่ 2 (์IV)</router-link>
                    </li>
                  </ul>
                </div>
              </div>
            </li>           
          </ul>
          <!-- จบส่วนของเมนู -->
        </div>
      </div>
      <div class="col-10 mt-3">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>


<script>
import "@/css/firstpage.css"
export default {
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    async refresh() {
      await this.$router.push("/");
      //await this.$router.push("/showcustomer");
      //await this.$router.go();
    },
    router_link(link) {
      this.$router.push(`/${link}`)
    },
  }
}
</script>

<style>
.fixed {
    width: 100px;
}
</style>