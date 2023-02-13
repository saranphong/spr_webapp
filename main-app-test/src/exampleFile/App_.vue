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
    <div class="row">
      <div class="col-2" style="background-color:darkblue">
        <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
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
                <button class="btn btn-outline-primary btnblock mt-2" data-bs-toggle="collapse"
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
                <button class="btn btn-outline-primary btnblock mt-2" data-bs-toggle="collapse"
                  data-bs-target="#product" aria-expanded="false" aria-controls="multiCollapseExample2"
                  style="color:white;text-align: left;">จัดการข้อมูลสินค้า
                  &raquo;</button>
                <div id="product" class="collapse">
                  <ul class="list-group list-unstyled">
                    <li class="btn mt-2" style="text-align: left;">
                      <router-link to="/productFixcost" class="text-white link-info rounded small fw-normal"
                        style="text-decoration: none">
                        กำหนดราคาสินค้า(มาตรฐาน)</router-link>
                    </li>
                    <li class="btn mt-2" style="text-align: left;">
                      <router-link to="/productBrand" class="text-white link-info rounded small fw-normal"
                        style="text-decoration: none">
                        ยี่ห้อยาง</router-link>
                    </li>
                    <li class="btn mt-2" style="text-align: left;">
                      <router-link to="/productSize" class="text-white link-info rounded small fw-normal"
                        style="text-decoration: none">
                        ขนาดยาง</router-link>
                    </li>
                    <li class="btn mt-2" style="text-align: left;">
                      <router-link to="/productStyle" class="text-white link-info rounded small fw-normal"
                        style="text-decoration: none">
                        ลายดอกยาง</router-link>
                    </li>
                    <li class="btn mt-2" style="text-align: left;">
                      <router-link to="/productGrade" class="text-white link-info rounded small fw-normal"
                        style="text-decoration: none">
                        เกรดยาง</router-link>
                    </li>
                    <li class="btn mt-2" style="text-align: left;">
                      <router-link to="/productType" class="text-white link-info rounded small fw-normal"
                        style="text-decoration: none">
                        ประเภทการผลิต</router-link>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            <!-- บันทึกรับยางเข้าระบบ -->
            <li class="nav-item">
              <div class="d-grid gap-2">
                <button class="btn btn-outline-primary btnblock mt-2" data-bs-toggle="collapse"
                  data-bs-target="#checkinProduct" aria-expanded="false" aria-controls="multiCollapseExample2"
                  style="color:white;text-align: left;">บันทึกรับยางเข้าผลิต
                  &raquo;</button>
                <div id="checkinProduct" class="collapse">
                  <ul class="list-group list-unstyled">
                    <li class="btn mt-2" style="text-align: left;">
                      <router-link to="/" class="text-white link-info rounded small fw-normal"
                        style="text-decoration: none">
                        พร้อมโครง</router-link>
                    </li>
                    <li class="btn mt-2" style="text-align: left;">
                      <router-link to="/" class="text-white link-info rounded small fw-normal"
                        style="text-decoration: none">
                        จ้างอัด</router-link>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            <!-- การขายยางแบ่งเป็น VAT หรือ No VAT -->
            <li class="nav-item">
              <div class="d-grid gap-2">
                <button class="btn btn-outline-primary btnblock mt-2" data-bs-toggle="collapse"
                  data-bs-target="#salesProduct" aria-expanded="false" aria-controls="multiCollapseExample2"
                  style="color:white;text-align: left;">บันทึกการส่งยาง(ขาย)
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
            <!-- ทดสอบเมนู -->
            <nav class="navbar navbar-light-color mt-2" aria-label="First navbar example" style="background-color:darkblue;">
              <div class="container-fluid">
                <a class="navbar-brand" href="#" style="color:white">ทดสอบเมนู</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                  data-bs-target="#navbarsExample01" aria-controls="navbarsExample01" aria-expanded="false"
                  aria-label="Toggle navigation" style="color:white">
                  <span class="navbar-toggler-icon small" style="background-color:darkblue"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarsExample01">
                  <ul class="navbar-nav me-auto mb-2">
                    <li class="nav-item">
                      <a class="nav-link active" aria-current="page" href="#">Home</a>
                    </li>
                    <li class="nav-item dropdown">
                      <a class="nav-link dropdown-toggle" href="#" id="dropdown01" data-bs-toggle="dropdown"
                        aria-expanded="false">Dropdown</a>
                      <ul class="dropdown-menu" aria-labelledby="dropdown01">
                        <li><a class="dropdown-item" href="#">Action</a></li>
                        <li><a class="dropdown-item" href="#">Another action</a></li>
                        <li><a class="dropdown-item" href="#">Something else here</a></li>
                      </ul>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#">Link</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                    </li>
                    
                  </ul>
                  <form>
                    <input class="form-control" type="text" placeholder="Search" aria-label="Search">
                  </form>
                </div>
              </div>
            </nav>
            <!-- จบส่วนทดสอบเมนู -->
          </ul>
          <!-- จบส่วนของเมนู -->
        </div>
      </div>
      <div class="col-10">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>


<script>
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
  }
}
</script>