<template>
    <!-- แก้ไขหัวบิลใบรับ -->
    <div class="modal fade rounded-3" id="importHeaderEdit" tabindex="-1" aria-hidden="true"
        aria-labelledby="exampleModalLabel">
        <div class="modal-dialog modal-xl" role="document">
            <div class="modal-content">
                <div class="modal-header bg-danger text-center" style="color:white;">
                    <h1 class="modal-title" id="exampleModalLabel"
                        style="color: white; text-align:center; font-size:medium">
                        ::: แก้ไขหัวบิลใบรับ :::
                    </h1>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col" style="text-align: left">
                            <label>ประเภทใบรับ</label>
                            <select class="form-select" style="background-color:#e2e2e2"
                                v-model="this.import_header_edit.job_type_id" disabled>
                                <option value="1">ค่าจ้าง</option>
                                <option value="2">ยางพร้อมโครง</option>
                            </select>                            
                        </div>
                        <div class="col" style="text-align: left">
                            <label>วันที่(ว/ด/ป)</label>
                            <!-- datepicker เป็น Component ที่สร้างขึ้นมาเอง อยู่ที่ไฟล์ Mydatepicker.vue -->
                            <datepicker @getDate="getDate" class="text form-control"
                                :value="this.import_header_edit.import_date" />
                            <!-- <input type="text" id="datepicker_edit" class="form-control"
                                v-model="this.import_header_edit.import_date" readonly
                                @click.prevent="this.showDatePicker_edit();" /> -->
                        </div>
                        <div class="col" style="text-align:left">
                            <label>การชำระเงิน</label>
                            <select id="pay_type" class="form-control import_header"
                                v-model="this.import_header_edit.pay_type" style="color:blue; font-weight:bold;"
                                disabled>
                                <option value="1">เงินสด</option>
                                <option value="2">เงินสด+จัดส่ง</option>
                            </select>
                        </div>
                    </div>
                    <div class="row mt-1">
                        <div class="col-3" style="text-align: left">
                            <label>ชื่อลูกค้า</label>
                            <select class="form-select" v-model="this.import_header_edit.cust_auto_id" id="findcust">
                                <option v-for="rec in customer_data" :key="rec.cust_auto_id" :value="rec.cust_auto_id">
                                    {{ rec.customerName }}
                                </option>
                            </select>
                        </div>
                        <div class="col-6" style="text-align: left">
                            <label>ที่อยู่ลูกค้า</label>
                            <input type="text" class="form-control" v-model="this.cust_addr_edit" disabled />
                        </div>
                        <div class="col-3" style="text-align: left">
                            <label>เบอร์โทร</label>
                            <input type="text" class="form-control" v-model="this.cust_tel_edit" disabled />
                        </div>
                    </div>
                    <div class="row-12 mt-2" style="text-align: center">
                        <button type="button" class="btn btn-danger rounded-4 me-2"
                            @click.prevent="this.func.hideModal('importHeaderEdit')">
                            <font-awesome-icon icon="fa-solid fa-ban" />&nbsp;ปิดหน้าต่าง
                        </button>
                        <button type="button" class="btn btn-primary rounded-4 me-2"
                            @click.prevent="updateImportHeader();">
                            <font-awesome-icon icon="fa-solid fa-check-to-slot" />&nbsp;บันทึกการแก้ไข
                        </button>
                    </div>
                    <!-- {{ this.import_header_edit }} -->
                </div>
            </div>
        </div>
    </div>
    <!-- end -->
    <!-- เพิ่มรายละเอียดใบรับจากตารางราคา -->
    <!-- ส่วนของการเพิ่มรายการใบรับแบบใหม่ collapse -->
    <!-- add product to import list ค้นหาโดยละเอียด-->
    <div class="container-fluid" v-if="this.page == 2">
        <div class="row-12">
            <div class="col-12" style="text-align:center">
                <button class="btn btn-success rounded-3 shadow col-12" type="button" data-bs-toggle="collapse"
                    data-bs-target="#findProduct" aria-expanded="false" aria-controls="newProductList"
                    @click.prevent="findProductPage();">
                    ค้นหาสินค้าแบบละเอียด&nbsp;
                    <font-awesome-icon icon="fa-solid fa-magnifying-glass-plus" style="color:yellow;"
                        v-if="this.chk_findproduct_page == false" />
                    <font-awesome-icon icon="fa-solid fa-magnifying-glass-minus" style="color:yellow;" v-else />
                </button>
            </div>
            <div class="collapse mt-1 mb-1" id="findProduct">
                <div class="card rounded-3 shadow" style="width:100%">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-2">
                                <label>ประเภทงาน</label>
                                <select class="form-select" v-model="this.import_header.job_type_id" disabled>
                                    <option value="1">ค่าจ้าง</option>
                                    <option value="2">ยางพร้อมโครง</option>
                                </select>
                            </div>
                            <!-- @change="findStyleByProduction(this.find_data.find_production_type)" ***Insert to select tag-->
                            <div class="col-4">
                                <label>ประเภทการผลิต</label>
                                <select class="form-select" v-model="this.find_data.find_production_type"
                                    @change="findStyleByProduction(this.find_data.find_production_type)">
                                    <option value="0" selected>::: ข้อมูลทั้งหมด :::</option>
                                    <option v-for="productDetail in product_detail"
                                        :key="productDetail.production_type_id"
                                        :value="productDetail.production_type_id">
                                        {{ productDetail.production_type_name }}
                                    </option>
                                </select>
                            </div>
                            <div class="col-2">
                                <label>ลายดอก</label>
                                <select class="form-select" id="style" v-model="this.find_data.find_style"
                                    @change="this.findSizeByStyle();">
                                    <option value="0" selected>::: ข้อมูลทั้งหมด :::</option>
                                    <option v-for="rubStyleList in rubber_style" :key="rubStyleList.rub_style_id"
                                        :value="rubStyleList.rub_style_id">
                                        {{ rubStyleList.rub_style_name }}
                                    </option>
                                </select>
                            </div>
                            <div class="col-4">
                                <label>ขนาดยาง</label>
                                <select class="form-select" id="size" v-model="this.find_data.find_size">
                                    <option value="0" selected>::: ข้อมูลทั้งหมด :::</option>
                                    <option v-for="rubSizeList in rubber_size" :key="rubSizeList.rub_size_id"
                                        :value="rubSizeList.rub_size_id">
                                        {{ rubSizeList.rub_size_name }} > {{ rubSizeList.rub_size_detail }}
                                    </option>
                                </select>
                            </div>
                            <!-- Object find_data: {{ this.find_data }} -->
                        </div>
                        <div class="row-12 mt-4 d-flex justify-content-center">
                            <button type="button" class="btn btn-danger rounded-5 shadow"
                                @click.prevent="resetFindData(); getProductList();">
                                ค่าเริ่มต้น&nbsp;<font-awesome-icon icon="fa-solid fa-rotate-right" />
                            </button>
                            <button type="button" class="btn btn-primary rounded-5 shadow ms-1"
                                @click.prevent="startFindProduct();">
                                เริ่มค้นหา&nbsp;<font-awesome-icon icon="fa-solid fa-magnifying-glass" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- end -->
        <!-- ส่วนของการเพิ่มรายการใบรับแบบเก่า -->
        <!-- <div class="card mt-1 rounded-3 shadow" style="width: 100%">
            <div class="card-header bg-primary shadow" style="color: white; text-align:center;"
                v-if="this.operator == 'new'">
                ::: เพิ่มรายการใบรับ :::
            </div>
            <div class="card-header bg-danger shadow" style="color: white; text-align:center;" v-else>
                ::: แก้ไขรายการใบรับ :::
            </div>
            <div class="card-body">
                <div class="row mt-1">
                    <div class="col-2 ms-2">
                        <div style="text-align:left;">
                            <label style="color:blue">หมายเลขยาง(จากโครง)</label>
                            <input type="text" class="form-control shadow" id="manufac_id"
                                v-model.trim="this.import_detail.manufac_id" placeholder="กรุณาใส่หมายเลขยาง"
                                @keypress="this.func.fixCharecter($event)"
                                @input="(this.import_detail.manufac_id = this.import_detail.manufac_id.toUpperCase())" />
                        </div>
                    </div>
                    <div class="col-3" style="text-align:left;">
                        <label style="color:blue">ยี่ห้อยาง</label>
                        <select class="form-select shadow" id="findBrand" v-model="this.import_detail.rub_brand_id">
                            <option v-for="rubberBrand in rubber_brand" :key="rubberBrand.rub_brand_id"
                                :value="rubberBrand.rub_brand_id">
                                {{ rubberBrand.rub_brand_shotname }} > {{ rubberBrand.rub_brand_name }}
                            </option>
                        </select>
                    </div>
                    <div class="col me-2" style="text-align:left;">
                        <label style="color:blue">รายละเอียดสินค้า</label>
                        <input type="text" class="form-control shadow" v-model="this.product_select"
                            placeholder="เลือกจากรายการด้านล่าง" readonly />
                    </div>
                </div>
            </div>
        </div> -->
        <!-- end of เพิ่มรายการใบรับแบบเก่า -->
        <!-- ส่วนการป้อนรหมายเลขจากโครงยาง และยี่ห้อ (Model) -->
        <div class="modal fade rounded-4" id="getProductToImportList" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header bg-primary" style="color: white; text-align:center;"
                        v-if="this.operator == 'new'">
                        <div class="modal-title">::: ป้อนข้อมูลก่อนการบันทึก :::</div>
                    </div>
                    <div class="modal-header bg-danger" style="color: white; text-align:center;" v-else>
                        <div class="modal-title">::: แก้ไขรายการใบรับ :::</div>
                    </div>
                    <div class="modal-body">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-6">
                                    <label style="color:blue">หมายเลขยาง(จากโครง)</label>
                                    <input type="text" class="form-control shadow" id="manufac_id"
                                        v-model.trim="this.import_detail.manufac_id" placeholder="กรุณาใส่หมายเลขยาง"
                                        @keypress="this.func.fixCharecter($event)"
                                        @input="(this.import_detail.manufac_id = this.import_detail.manufac_id.toUpperCase())" />
                                </div>
                                <div class="col-6" style="text-align:left;">
                                    <label style="color:blue">ยี่ห้อยาง</label>
                                    <select class="form-select shadow" id="findBrand"
                                        v-model="this.import_detail.rub_brand_id">
                                        <option v-for="rubberBrand in rubber_brand" :key="rubberBrand.rub_brand_id"
                                            :value="rubberBrand.rub_brand_id">
                                            {{ rubberBrand.rub_brand_shotname }} > {{ rubberBrand.rub_brand_name }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mt-2">
                                <div class="col" style="text-align:left;">
                                    <label style="color:blue">รายละเอียดสินค้า</label>
                                    <input type="text" class="form-control shadow" v-model="this.product_select"
                                        placeholder="เลือกจากรายการด้านล่าง" readonly />
                                </div>
                            </div>
                            <!-- {{ this.import_detail }} -->
                            <div class="row mt-3">
                                <div class="col d-flex justify-content-center">
                                    <button type="button" class="btn btn-danger rounded-5 shadow me-1"
                                        @click.prevent="this.func.hideModal('getProductToImportList')">
                                        ยกเลิก/ปิด&nbsp;<font-awesome-icon icon="fa-solid fa-ban" />
                                    </button>
                                    <button type="button" class="btn btn-primary rounded-5 shadow ms-1"
                                        @click.prevent="saveImportDetail();">
                                        บันทึกลงใบรับ&nbsp;<font-awesome-icon icon="fa-solid fa-floppy-disk" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- end ส่วนการป้อนรหมายเลขจากโครงยาง และยี่ห้อ -->
        <!-- แสดงรายการสินค้าสำหรับเลือกลงใบรับงาน -->
        <div class="card rounded-3 shadow-lg mt-1" style="width: 100%">
            <div class="card-header bg-primary opacity-75 shadow" style="color: white; text-align:center;"
                v-if="this.operator == 'new'">
                ::: เลือกสินค้าสำหรับทำรายการใบรับยาง :::
            </div>
            <div class="card-header bg-danger opacity-75 shadow" style="color: white; text-align:center;" v-else>
                ::: เลือกสินค้าจากรายการ(เพื่อแก้ไข) :::
                <div>ข้อมูลเก่า : {{ this.product_select }}</div>
            </div>
            <div class="card-body">
                <table id="showProduct" class="table table-striped table-hover table-sm" style="width: 100%;">
                    <thead>
                        <tr style="color:darkblue">
                            <th>ลำดับ</th>
                            <th>ประเภทการผลิต</th>
                            <th>ขนาด</th>
                            <th>ลายดอก</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody class="table-group-divider">
                        <!-- <tr v-for="rec in product_cost" :key="rec.fixcost_id" @click.prevent="this.getFixcost(rec);" @dblclick.prevent=""> -->
                        <tr v-for="rec in product_list_data" :key="rec.product_list_id"
                            title="ดับเบิ้ลคลิ๊กเพื่อนำสินค้าเข้ารายการใบรับ" @dblclick="getProduct(rec); this.onSelect_Brand();
                            this.func.showModal('getProductToImportList');
                            this.func.setFocusInModal('getProductToImportList', 'manufac_id')">
                            <td>{{ product_list_data.indexOf(rec) + 1 }}</td>
                            <td>{{ rec.production_type_name }}</td>
                            <td>{{ rec.rub_size_name }} > {{ rec.rub_size_detail }}</td>
                            <td>{{ rec.rub_style_name }}</td>
                            <td>
                                <button class="btn btn-success border-0 btn-sm d-flex justify-content-start"
                                    @click.prevent="getProduct(rec); this.func.showModal('getProductToImportList'); this.onSelect_Brand();
                                    this.func.setFocusInModal('getProductToImportList', 'manufac_id')">
                                    <font-awesome-icon icon="fa-solid fa-down-long" style="color:white" />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="card-footer" style="text-align:right">
                <!-- ปุ่มปิด -->
                <button type="button" class="btn btn-danger ms-2 me-1 rounded-4"
                    @click.prevent="this.func.clearSelect2('findBrand');
                    this.import_detail.rub_brand_id = ''; this.import_detail.manufac_id = ''; this.chk_findproduct_page = true; this.findProductPage();
                    this.fixcost_detail = ''; this.getImportDetail(this.import_header.import_id); this.page = 1; this.resetFindData();">
                    ปิดหน้าต่าง&nbsp;<font-awesome-icon icon="fa-solid fa-ban" />
                </button>
                <!-- ปุ่มบันทึก -->
                <!-- <button id="btn" class="btn btn-primary ms-1" @click.prevent="saveImportDetail();">
                    <font-awesome-icon icon="fa-solid fa-circle-check" />&nbsp;บันทึกรายการ
                </button> -->
            </div>
        </div>
    </div>
    <!-- end เพิ่มรายละเอียดใบรับจากตารางราคา -->
    <!-- แสดง Header + รายละเอียดใบรับ -->
    <div class="container-fluid" v-if="this.page == 1">
        <div class="card rounded-3 shadow" style="width:100%;">
            <div class="card-header bg-primary" style="color:white; text-align:center;">
                ใบรับ (
                <select class="rounded-2 bg-primary border-0" style="color:yellow ;"
                    v-model="this.import_header.job_type_id" disabled>
                    <option value="1">ค่าจ้าง</option>
                    <option value="2">ยางพร้อมโครง</option>
                </select> )
            </div>
            <div class="card-body" style="font-weight:bold">
                <div class="row">
                    <div class="col" style="text-align:left;">
                        <label>เล่มที่</label>
                        <input type="text" class="form-control import-header" id="book_id"
                            v-model.trim="this.import_header.import_book_id" disabled />
                    </div>
                    <div class="col" style="text-align:left;">
                        <label>เลขที่</label>
                        <input type="text" class="form-control import-header" id="book_no"
                            v-model.trim="this.import_header.import_book_no" disabled />
                    </div>
                    <div class="col" style="text-align:left;">
                        <label>วันที่(ว/ด/ป)</label>
                        <input type="text" class="date form-control import-header"
                            v-model="this.import_header.import_date" disabled />
                    </div>
                    <div class="col" style="text-align:left;">
                        <label>การชำระเงิน</label>
                        <select id="pay_type" class="form-control import_header" v-model="this.import_header.pay_type"
                            style="color:blue; font-weight:bold;" disabled>
                            <option value="1">เงินสด</option>
                            <option value="2">เงินสด+จัดส่ง</option>
                        </select>
                    </div>
                </div>
                <div class="row mt-1">
                    <div class="col-3" style="text-align:left;">
                        <label>ชื่อลูกค้า</label>
                        <input type="text" class="form-control import-header" v-model="this.cust_name" disabled />
                    </div>
                    <div class="col-6" style="text-align:left;">
                        <label>ที่อยู่ลูกค้า</label>
                        <input type="text" class="form-control import-header" v-model="this.cust_addr" disabled />
                    </div>
                    <div class="col-3" style="text-align:left;">
                        <label>เบอร์โทร</label>
                        <input type="text" class="form-control import-header" v-model="this.cust_tel" disabled />
                    </div>
                </div>
                <div class="card-footer border-0" style="text-align:center">
                    <div class="row-12 mt-2 align-content-center">
                        <button class="btn btn-success rounded-4 me-2 btn-sm shadow" @click.prevent="confirmImport();">
                            <font-awesome-icon icon="fa-solid fa-check-to-slot" />&nbsp;ยืนยันใบรับ
                        </button>
                        <button class="btn btn-warning rounded-4 me-2 btn-sm shadow" style="color:white;"
                            @click.prevent="getCustomerAll(); onSelect_Cust();
                            setValueImportHeaderEdit(); this.func.showModal('importHeaderEdit');">
                            <font-awesome-icon icon="fa-solid fa-pen" />&nbsp;แก้ไขใบรับ
                        </button>
                        <button class="btn btn-danger rounded-4 me-2 btn-sm shadow">
                            <font-awesome-icon icon="fa-solid fa-file-circle-xmark" />&nbsp;ยกเลิกใบรับ
                        </button>
                        <!-- <button class="btn btn-primary rounded-4 me-2 btn-sm shadow" @click.prevent="getProductDetail(this.import_header.job_type_id);
                        this.checkOperator('new', rec)"> -->
                        <!-- newImportDetail() ตอนนี้ไม่ได้ใช้ -->
                        <!-- <font-awesome-icon icon="fa-solid fa-cart-plus" />&nbsp;เพิ่มรายการรับ
                        </button> -->
                    </div>
                </div>
            </div>
            <!-- <div class="card-footer align-content-center" id="control-detail"> -->

            <!-- </div> -->
        </div>
        <div class="card rounded-3 shadow mt-2" style="width: 100%">
            <div class="card-header bg-opacity-75 bg-primary" style="color:white;text-align:center">
                <div class="row">
                    <div class="col"></div>
                    <div class="col">::: รายการใบรับยาง :::</div>
                    <div class="col d-flex justify-content-end">
                        <button class="btn btn-sm border-0 glow-on-hover" style="color:white;"
                        @click.prevent="getProductDetail(this.import_header.job_type_id); this.checkOperator('new', rec)">
                            <font-awesome-icon icon="fa-solid fa-cart-plus" title="เพิ่มรายการสินค้า"/>
                        </button>
                    </div>
                </div>
                <!-- ปุ่มสำหรับเรียกเมนูที่ซ่อนอยู่ **ลูกเล่นที่ใช้ = offcanvas  -->
                <!-- <button class="btn justify-content-end" type="button" data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasDarkNavbar" aria-controls="staticBackdrop">
                    <font-awesome-icon icon="fa-solid fa-cart-plus" />
                </button> -->
            </div>
            <div class="card-body">
                <table id="showimportdetail" class="table table-striped table-hover table-sm nowrap"
                    style="width: 100%; align-items: center">
                    <thead>
                        <tr style="text-align:left; color:darkblue">
                            <th>ลำดับ</th>
                            <th>รหัสยาง</th>
                            <th>ประเภทการผลิต</th>
                            <th>ขนาดยาง</th>
                            <th>ลายดอก</th>
                            <th>ยี่ห้อยาง</th>
                            <th>เกรดยาง</th>
                            <th>ราคาขาย</th>
                            <th>คววามก้าวหน้า</th>
                            <th></th>
                            <!-- <th></th> -->
                        </tr>
                    </thead>
                    <tbody class="table-group-divider">
                        <tr v-for="rec in import_detail_list" :key="rec.import_detail_id" style="text-align:left">
                            <td>{{ import_detail_list.indexOf(rec) + 1 }}</td>
                            <td>{{ rec.manufac_id }}</td>
                            <td>{{ rec.production_type_name }}</td>
                            <td>{{ rec.rub_size_name }}</td>
                            <td>{{ rec.rub_style_name }}</td>
                            <td>{{ rec.rub_brand_shotname }}</td>
                            <td v-if="rec.rub_grade_id == '10'">
                                <font style="color:red">{{ rec.rub_grade_name }}!</font>
                            </td>
                            <td v-else>
                                <font style="color:blue">{{ rec.rub_grade_name }}!</font>
                            </td>
                            <td v-if="rec.product_price > 0">
                                <font style="color:mediumblue">{{ func.numFormat(rec.product_price) }}</font>
                            </td>
                            <td v-else>
                                <font style="color:red">ยังไม่กำหนด!</font>
                            </td>
                            <td>
                                <div class="progress shadow-sm">
                                    <div v-if="(rec.import_progress >= 0) && (rec.import_progress <= 25)"
                                        class="progress-bar" role="progressbar"
                                        style="color:white; background-color:#FF0000"
                                        :style="{ 'width': rec.import_progress + '%' }"
                                        F:aria-valuenow="rec.import_progress" aria-valuemin="0" aria-valuemax="100">
                                        <span>{{ rec.import_progress }}%</span>
                                    </div>
                                    <div v-else-if="(rec.import_progress >= 26) && (rec.import_progress <= 50)"
                                        class="progress-bar" role="progressbar"
                                        style="color:white; background-color:#FF9E00"
                                        :style="{ 'width': rec.import_progress + '%' }"
                                        :aria-valuenow="rec.import_progress" aria-valuemin="0" aria-valuemax="100">
                                        <span>{{ rec.import_progress }}%</span>
                                    </div>
                                    <div v-else-if="(rec.import_progress >= 51) && (rec.import_progress <= 75)"
                                        class="progress-bar" role="progressbar"
                                        style="color:white; background-color:#FFEC00"
                                        :style="{ 'width': rec.import_progress + '%' }"
                                        :aria-valuenow="rec.import_progress" aria-valuemin="0" aria-valuemax="100">
                                        <span>{{ rec.import_progress }}%</span>
                                    </div>
                                    <div v-else class="progress-bar" role="progressbar"
                                        style="color:white; background-color:#00FF00"
                                        :style="{ 'width': rec.import_progress + '%' }"
                                        :aria-valuenow="rec.import_progress" aria-valuemin="0" aria-valuemax="100">
                                        <span>{{ rec.import_progress }}%</span>
                                    </div>
                                </div>
                            </td>
                            <td style="text-align:left">
                                <div id="tracking" class="btn btn-warning btn-sm ms-1" title="ติดตามงาน"
                                    @click.prevent="">
                                    <font-awesome-icon icon="fa-solid fa-users-gear" style="color:green" />
                                </div>
                                <div id="edit" class="btn btn-primary btn-sm ms-1" title="แก้ไขรายการ"
                                    @click.prevent="this.checkOperator('edit', rec)">
                                    <font-awesome-icon icon="fa-solid fa-pen" style="color:white" />
                                </div>
                                <div id="delete" class="btn btn-danger btn-sm ms-1" title="ลบรายการ"
                                    @click.prevent="removeImportDetail(rec.import_detail_id)">
                                    <font-awesome-icon icon="fa-solid fa-trash-can" style="color:white" />
                                </div>
                            </td>
                            <!-- <td style="text-align:left">
                                <button id="delete" class="btn btn-danger btn-sm" title="ลบรายการ"
                                    @click.prevent="removeImportDetail(rec.import_detail_id)">
                                    <font-awesome-icon icon="fa-solid fa-trash-can" style="color:white" />
                                </button>
                            </td> -->
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <!-- ทดสอบ offcanvas -->
        <!-- <div class="offcanvas offcanvas-end text-bg-primary bg-opacity-75" tabindex="-1" id="offcanvasDarkNavbar"
            aria-labelledby="staticBackdropLabel" data-bs-backdrop="static">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasDarkNavbarLabel">::: นำเข้าสินค้าสู่ใบรับ :::</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                ปปปปปปป
            </div>
        </div> -->
        <!-- end offcanvas -->
    </div>
    <!-- {{ this.import_header }} -->
</template>

<script>
import $ from "jquery";
import axios from "@/axios";
import func from "../func.js";
import datepicker from "@/Mycomponents/Mydatepicker.vue";
export default {
    components: {
        datepicker,
    },
    data() {
        return {
            bgcolor: "#FF0000",
            chk_findproduct_page: false,
            func: func,
            page: "1",
            cust_name: "",
            cust_addr: "",
            cust_tel: "",
            cust_addr_edit: "",
            cust_tel_edit: "",
            operator: "", //--- ตรวจเช็คว่ากดเพิ่มข้อมูลใหม่ หรือแก้ไขข้อมูล 'new' or 'edit' Data
            fixcost_detail: "", //--- เอาไว้แสดงภาพรวมให้ผู้ใช้ดูข้อมูลราคา
            product_select: "", //--- เอาไว้แสดงภาพรวมให้ผู้ใช้ดูข้อมูลราคา
            import_detail_id: "",
            set_product_price: "", //---**เลือกราคาจาก fixcost 1 = เงินสด / 2 = เงินสด+จัดส่ง
            manufac_id_temp: "",
            check_manufac: [],
            check_bill_header: [],
            customer_data: [],
            rubber_size: [],
            rubber_style: [],
            rubber_brand: [],
            product_cost: [],
            import_detail_list: [],
            product_list_data: [],
            product_detail: [],
            import_header: {
                import_id: "",
                import_book_id: "",
                import_book_no: "",
                import_user: "",
                cust_auto_id: "",
                job_type_id: "",
                pay_type: "",
                import_date: "",
                import_status: "",
            },
            import_header_edit: {
                import_id: "",
                import_book_id: "",
                import_book_no: "",
                import_user: "",
                cust_auto_id: "",
                job_type_id: "",
                pay_type: "",
                import_date: "",
                import_status: "",
            },
            import_detail: {
                import_id: "",
                rub_brand_id: "",
                manufac_id: "",
                rub_grade_id: 10,
                product_list_id: "",
                product_price: 0,
                import_progress: 0,
                import_detail_status: "",
            },
            find_data: {
                find_production_type: "0",
                find_size: "0",
                find_style: "0",
                SQL_Code: "",
            },
        }
    },
    mounted() {
        let import_book_id = sessionStorage.getItem("import_book_id");
        let import_book_no = sessionStorage.getItem("import_book_no");
        if (import_book_id != null && import_book_no != null) {
            this.chkImportHeader(import_book_id, import_book_no);
        } else {
            let import_id = sessionStorage.getItem("import_id");
            this.import_detail.import_id = import_id;
            this.chkImportHeaderById(import_id);
            this.getImportDetail(import_id);
        }
    },
    beforeUnmount() {
        sessionStorage.removeItem("import_book_id");
        sessionStorage.removeItem("import_book_no");
        sessionStorage.removeItem("import_id");
    },
    methods: {
        checkColor(progress) {
            if ((progress >= 0) && (progress <= 25)) {
                this.color = "red";
            } else if ((progress >= 26) && (progress <= 75)) {
                this.color = "yellow";
            }
            else {
                this.color = "green";
            }
        },
        async resetFindData() {
            $("#showProduct").DataTable().destroy();
            this.find_data = {
                find_production_type: await "0",
                find_size: await "0",
                find_style: await "0"
            };
            await $("#size").val("0").trigger('change');
            await $("#style").val("0").trigger('change');
            await this.findStyleByProduction("0");
            await this.findSizeByStyle();
        },
        getDate(val) {
            this.import_header_edit.import_date = val;
        },
        findProductPage() {
            this.chk_findproduct_page = !this.chk_findproduct_page;
        },
        onSelect_Brand() {
            $(document).ready(() => {
                let rec = this.import_detail;
                $('#findBrand').select2({
                    theme: "bootstrap-5",
                    closeOnSelect: true,
                    width: '100%',
                    dropdownParent: $("#findBrand").parent(),
                    placeholder: "--- กรุณาเลือกยี่ห้อยาง ---",
                });
                $('#findBrand').on('select2:select', (e) => {
                    let data = e.params.data;
                    rec.rub_brand_id = data.id;
                })
            });
        },
        onSelect_Cust() {
            $(document).ready(() => {
                let rec = this.import_header_edit;
                $('#findcust').select2({
                    theme: "bootstrap-5",
                    closeOnSelect: true,
                    width: '100%',
                    dropdownParent: $("#findcust").parent(),
                    placeholder: "--- เลือกลูกค้า ---",
                });
                $('#findcust').on('select2:select', (e) => {
                    let data = e.params.data;
                    rec.cust_auto_id = data.id;
                    this.getCustomerEdit(rec.cust_auto_id);
                })
            });
        },
        getUseData() {
            this.getProductList();
            this.getRubberBrand();
            // this.getRubberStyle();
            // this.onSelect_Brand();
        },
        async chkImportHeader(val1, val2) {
            await axios.get(`billimport/search/${val1}/${val2}`).then((response) => {
                // this.check_bill_header = response.data;
                this.import_header.import_id = response.data[0].import_id;
                this.import_header.import_book_id = response.data[0].import_book_id;
                this.import_header.import_book_no = response.data[0].import_book_no;
                this.import_header.import_user = response.data[0].import_user;
                this.import_header.cust_auto_id = response.data[0].cust_auto_id;
                this.import_header.job_type_id = response.data[0].job_type_id;
                this.import_header.pay_type = response.data[0].pay_type;
                this.import_header.import_date = response.data[0].new_import_date;
                this.import_header.import_status = response.data[0].import_status;
                this.cust_name = response.data[0].customerName;
                this.cust_addr = response.data[0].customerAddr;
                this.cust_tel = response.data[0].customerTel;
                this.set_product_price = response.data[0].priceType;
                this.import_detail.import_id = response.data[0].import_id;
                this.getImportDetail(this.import_header.import_id);
            });
        },
        async chkImportHeaderById(val) {
            await axios.get(`billimport/searchid/${val}`).then((response) => {
                this.import_header.import_id = response.data[0].import_id;
                this.import_header.import_book_id = response.data[0].import_book_id;
                this.import_header.import_book_no = response.data[0].import_book_no;
                this.import_header.import_user = response.data[0].import_user;
                this.import_header.cust_auto_id = response.data[0].cust_auto_id;
                this.import_header.job_type_id = response.data[0].job_type_id;
                this.import_header.pay_type = response.data[0].pay_type;
                this.import_header.import_date = response.data[0].new_import_date;
                this.import_header.import_status = response.data[0].import_status;
                this.cust_name = response.data[0].customerName;
                this.cust_addr = response.data[0].customerAddr;
                this.cust_tel = response.data[0].customerTel;
                this.set_product_price = response.data[0].priceType;
            });
        },
        async updateImportHeader() {
            if (await confirm("ยืนยันบันทึกการแก้ไขข้อมูล") == true) {
                this.import_header_edit.import_date = await this.func.convertDateToMySql(this.import_header_edit.import_date);
                await axios.post(`billimport/update`, this.import_header_edit).then(() => {
                    this.chkImportHeaderById(sessionStorage.getItem("import_id"));
                }).catch((error) => {
                    console.log("เกิดข้อผิดพลาดในการบันทึกข้อมูล " + error)
                });
                // await this.chkImportHeaderById(sessionStorage.getItem("import_id"));
                // await this.getImportDetail(sessionStorage.getItem("import_id"));
                await func.hideModal("importHeaderEdit");
                // alert(sessionStorage.getItem("import_id"))                
            }
        },
        async newImportDetail() {
            // Load ตารางราคา
            await this.getProductCost();
            if ((this.import_header.import_book_id == null) ||
                (this.import_header.import_book_no == null) ||
                (this.import_header.import_date == null)) {
                alert('ข้อมูลหลักไม่ครบถ้วน.,กรุณาตรวจสอบ !!!')
                // document.getElementById("book_id").value = 'xxx';
                await document.getElementById("book_id").focus();
                await document.getElementById("book_id").select();
                //document.getElementById("book_no").disabled = true;             
            } else {
                await this.onSelect_Brand();
                await this.getUseData();
                // this.showModal('newImportDetail');
                await func.showModal('newImportDetail2');
            }
        },
        async saveImportDetail() {
            // Start sub function --------------------------------------------------------
            this.nextProcess = async () => {
                if (this.operator == "new") {
                    if (await confirm("ยืนยันการบันทึกรายการใหม่") == true) {
                        await axios.post(`billimport/detail/new`, this.import_detail).then(() => {
                            this.import_detail = {
                                import_id: this.import_header.import_id,
                                rub_brand_id: "",
                                manufac_id: "",
                                rub_grade_id: 10,
                                product_list_id: "",
                                product_price: 0,
                                import_progress: 0,
                                import_detail_status: "",
                            };
                            this.product_select = "";
                        }).catch((error) => {
                            console.log("พบข้อผิดผลาดในการบันทึกข้อมูล " + error);
                        });
                        this.func.hideModal("getProductToImportList")
                        // this.page = 1;
                    }
                }
                else {
                    if (confirm("ยืนยันการแก้ไขข้อมูล") == true) {
                        await axios.post(`billimport/detail/update/${this.import_detail_id}`, this.import_detail).then(() => {
                            this.import_detail = {
                                import_id: this.import_header.import_id,
                                rub_brand_id: "",
                                manufac_id: "",
                                rub_grade_id: 10,
                                product_list_id: "",
                                product_price: 0,
                                import_detail_status: "",
                            };
                            this.product_select = "";
                        }).catch((error) => {
                            console.log("พบข้อผิดผลาดในการแก้ไขข้อมูล " + error);
                        });
                        this.page = 1;
                        this.func.hideModal("getProductToImportList")
                        // await this.getImportDetail(this.import_header.import_id);
                    }
                }
                await this.getImportDetail(this.import_header.import_id);
            };
            // End sub function ----------------------------------------------------------
            // Start first process เมื่อเรียกใช้งาน Method นี้ จะเริ่มทำงานที่บรรทีดด้านล่างนี้ก่อน
            if (await this.import_detail.manufac_id == "" ||
                await this.import_detail.rub_brand_id == "") {
                await alert("กรุณากรอกข้อมูล หมายเลขยาง/ยี่ห้อยาง/รายการจากตารางราคา ให้ครบถ้วน!!!")
                await func.setFocus("manufac_id");
            }
            else {
                await this.checkImportDetail(this.import_detail.manufac_id);
                // await alert("TEMP: "+this.manufac_id_temp);
                // ตรวจสอบว่าหมายเลขยาง(จากโครง) มีการเรียกใช้หรือยัง
                if (await this.check_manufac.length == 0) {
                    this.nextProcess(); // เรียกใช้งาน Sub function ที่อยู่ด้านบน 
                }
                else if ((await this.check_manufac.length == 1) && (await this.manufac_id_temp == this.import_detail.manufac_id)) {
                    this.nextProcess(); // เรียกใช้งาน Sub function ที่อยู่ด้านบน
                }
                else {
                    alert("หมายเลขยางนี้มีการนำเข้าระบบแล้ว กรุณาตรวจสอบ !!!");
                    func.setFocus("manufac_id");
                }
            }
        },
        async checkImportDetail(val) {
            await axios.get(`billimport/detail/checkimportdetail/${val}`).then((response) => {
                this.check_manufac = response.data;
            });
        },
        async checkOperator(op, rec) {
            if (op == "new") {
                // await this.getProductCost(this.import_header.job_type_id);
                await this.getUseData();
                this.operator = await op;
                this.page = await 2;
            }
            else if (op == "edit") {
                // await this.getProductCost(this.import_header.job_type_id);
                await this.getUseData();
                this.import_detail.rub_brand_id = await rec.rub_brand_id;
                this.import_detail.manufac_id = await rec.manufac_id;
                this.import_detail.rub_grade_id = await rec.rub_grade_id;
                this.product_select = await rec.production_type_name + " / " + rec.rub_size_name + " / " + rec.rub_style_name;
                this.import_detail.product_list_id = await rec.product_list_id;
                this.import_detail_id = await rec.import_detail_id;
                this.operator = await op;
                this.page = await 2;
            }
            this.manufac_id_temp = await rec.manufac_id;
            // return op;
        },
        async getImportDetail(val) {
            await axios.get(`billimport/detail/read/${val}`).then((response) => {
                this.import_detail_list = response.data;
                $(document).ready(() => {
                    $("#showimportdetail").DataTable({
                        // dom: 'Bfrtip',
                        // buttons: [
                        //     'print',                            
                        // ],
                        // "order": [[0, 'asc']],
                        "scrollY": '200px',
                        "scorllX": false,
                        "bJQueryUI": true,
                        "sPaginationType": "full_numbers",
                        "bFilter": false,
                        "paging": false,
                        "scrollCollapse": true,
                        "rowReorder": true,
                        "destroy": true,
                        "bSort": false,
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
        setValueImportHeaderEdit() {
            let head = this.import_header;
            let headE = this.import_header_edit;
            headE.import_id = head.import_id;
            headE.import_book_id = head.import_book_id;
            headE.import_book_no = head.import_book_no;
            headE.import_user = head.import_user;
            headE.cust_auto_id = head.cust_auto_id;
            headE.job_type_id = head.job_type_id;
            headE.pay_type = head.pay_type;
            headE.import_date = head.import_date;
            headE.import_status = head.import_status;

            this.cust_addr_edit = this.cust_addr;
            this.cust_tel_edit = this.cust_tel;
        },
        async removeImportDetail(rec) {
            if (await confirm("ยืนยันการลบรายการ ?") == true) {
                await axios.delete(`billimport/detail/delete/${rec}`).then(() => {
                    $("#showimportdetail").DataTable().destroy();
                    this.getImportDetail(this.import_header.import_id);
                }).catch((error) => {
                    alert('ไม่สามารถลบข้อมูลได้ ' + error);
                });
            }
        },
        async getCustomer(val) {
            await axios.get(`customer/findbyautoid/${val}`).then((response) => {
                // this.customer_data = response.data;
                this.import_header = {
                    cust_auto_id: response.data[0].cust_auto_id
                }
                // **ในกรณีลูกค้าเป็น SPR จะเลือกใช้ประเภทงานเป็น "ยางพร้อมโครง[job_type_id = 2]"
                if (response.data[0].cust_auto_id == 1) { this.import_header.job_type_id = 2 }
                else this.import_header.job_type_id = 1

                this.cust_name = response.data[0].customerName
                this.cust_addr = response.data[0].customerAddr
                this.cust_tel = response.data[0].customerTel
            });
        },
        async getCustomerEdit(val) {
            await axios.get(`customer/findbyautoid/${val}`).then((response) => {
                // ตรวจสอบประเภทงาน ระหว่าง ค่าจ้าง / ยางพร้อมโครง
                if (response.data[0].cust_auto_id == 1) {
                    this.import_header_edit.job_type_id = 2
                }
                else this.import_header_edit.job_type_id = 1
                // -------------------------------------------------
                this.cust_addr_edit = response.data[0].customerAddr
                this.cust_tel_edit = response.data[0].customerTel
            });
        },
        // infar data
        async getCustomerAll() {
            await axios.get(`customer/read`).then((response) => {
                this.customer_data = response.data;
            });
        },
        getRubberSize() {
            axios.get(`rubbersize/read`).then((response) => {
                this.rubber_size = response.data;
            });
        },
        getRubberStyle() {
            axios.get(`rubberstyle/read`).then((response) => {
                this.rubber_style = response.data;
                $(document).ready(() => {
                    $('#style').select2({
                        theme: "bootstrap-5",
                        closeOnSelect: true,
                        width: '100%',
                        dropdownParent: $("#style").parent(),
                    });
                    $('#style').on('select2:select', (e) => {
                        let data = e.params.data;
                        this.find_data.find_style = data.id;
                        this.findSizeByStyle();
                    })
                });
            });
        },
        async findStyleByProduction(val) {
            await axios.get(`productlist/findstylebyproduction/${val}`).then((response) => {
                this.rubber_style = response.data;
                $(document).ready(() => {
                    $('#style').select2({
                        theme: "bootstrap-5",
                        closeOnSelect: true,
                        width: '100%',
                        dropdownParent: $("#style").parent(),
                    });
                    $('#style').on('select2:select', (e) => {
                        let data = e.params.data;
                        this.find_data.find_style = data.id;
                        this.findSizeByStyle();
                    })
                });
            });
        },
        async findSizeByStyle() {
            await axios.post(`productlist/findsizebystyle`, this.find_data).then((response) => {
                this.rubber_size = response.data;
                $(document).ready(() => {
                    $('#size').select2({
                        theme: "bootstrap-5",
                        closeOnSelect: true,
                        width: '100%',
                        dropdownParent: $("#size").parent(),
                    });
                    $('#size').on('select2:select', (e) => {
                        let data = e.params.data;
                        this.find_data.find_size = data.id;
                    })
                });
            });
        },
        getRubberBrand() {
            axios.get(`rubberbrand/read`).then((response) => {
                this.rubber_brand = response.data;
            });
        },
        // ----- ชุดงานในการค้นหาข้อมูลสินค้า เพื่อเพิ่มลงในรายการใบรับ ------------------------------------------------------
        setProductListDataTable() {
            $(document).ready(() => {
                $("#showProduct").DataTable({
                    "order": [[0, 'asc']],
                    "scrollY": '150px',
                    "scorllX": false,
                    "bJQueryUI": true,
                    "sPaginationType": "full_numbers",
                    "bFilter": true,
                    "paging": false,
                    "scrollCollapse": true,
                    "rowReorder": true,
                    // "destroy": true,
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
        },
        async getProductList() {
            await axios.get(`productlist/read`).then((response) => {
                this.product_list_data = response.data;
                // $("#showProduct").DataTable().destroy();
                this.setProductListDataTable();
            })
        },
        async startFindProduct() {
            if ((this.find_data.find_production_type == 0) && (this.find_data.find_size == 0) && (this.find_data.find_style == 0)) {
                alert("ไม่พบเงื่อนไขในการค้นหาข้อมูล!")
            }
            else {
                if (await this.find_data.find_production_type > 0 &&
                    this.find_data.find_size > 0 && this.find_data.find_style > 0) {
                    this.find_data.SQL_Code = "SELECT * FROM product_list, production_type, rubber_size, rubber_style " +
                        "WHERE product_list.production_type_id = production_type.production_type_id " +
                        "AND product_list.rub_size_id = rubber_size.rub_size_id AND product_list.rub_style_id = rubber_style.rub_style_id " +
                        "AND product_list.production_type_id = " + this.find_data.find_production_type +
                        " AND product_list.rub_size_id = " + this.find_data.find_size +
                        " AND product_list.rub_style_id = " + this.find_data.find_style +
                        " ORDER BY product_list.product_list_id";
                } else if (await this.find_data.find_production_type > 0 &&
                    this.find_data.find_style > 0) {
                    this.find_data.SQL_Code = "SELECT * FROM product_list, production_type, rubber_size, rubber_style " +
                        "WHERE product_list.production_type_id = production_type.production_type_id " +
                        "AND product_list.rub_size_id = rubber_size.rub_size_id AND product_list.rub_style_id = rubber_style.rub_style_id " +
                        "AND product_list.production_type_id = " + this.find_data.find_production_type +
                        " AND product_list.rub_style_id = " + this.find_data.find_style +
                        " ORDER BY product_list.product_list_id";
                } else if (await this.find_data.find_production_type > 0) {
                    this.find_data.SQL_Code = "SELECT * FROM product_list, production_type, rubber_size, rubber_style " +
                        "WHERE product_list.production_type_id = production_type.production_type_id " +
                        "AND product_list.rub_size_id = rubber_size.rub_size_id AND product_list.rub_style_id = rubber_style.rub_style_id " +
                        "AND product_list.production_type_id = " + this.find_data.find_production_type +
                        " ORDER BY product_list.product_list_id";
                }
                // else {
                //     this.find_data.SQL_Code = "SELECT * FROM product_list, production_type, rubber_size, rubber_style " +
                //         "WHERE product_list.production_type_id = production_type.production_type_id " +
                //         "AND product_list.rub_size_id = rubber_size.rub_size_id AND product_list.rub_style_id = rubber_style.rub_style_id " +                    
                //         "ORDER BY product_list.product_list_id";
                // }
                // console.log(this.find_data.SQL_Code);
                await axios.post(`productlist/find3f`, this.find_data).then((response) => {
                    this.product_list_data = response.data;
                    // console.log(response.data)
                    $("#showProduct").DataTable().destroy();
                    this.setProductListDataTable();
                });
            }
        },
        // ----- end of ชุดงานในการค้นหาข้อมูลสินค้า เพื่อเพิ่มลงในรายการใบรับ ------------------------------------------------------
        async getFixcost(rec) {
            this.import_detail.fixcost_id = await rec.fixcost_id;
            // --- ตรวจเช็คประเภทราคา ---
            if (await this.import_header.pay_type == 1) {
                this.import_detail.product_price = rec.price1;
            }
            else if (await this.import_header.pay_type == 2) {
                this.import_detail.product_price = rec.price2;
            }
            // if (await this.set_product_price == 1) {
            //     this.import_detail.product_price = rec.price1;
            // }
            // else if (await this.set_product_price == 2) {
            //     this.import_detail.product_price = rec.price2;
            // }
            // ------------------------
            this.fixcost_detail = await rec.job_type_name + " / " + rec.production_type_name + " / " +
                rec.rub_size_name + " / " + rec.rub_style_name + " / " + rec.rub_grade_name + " / " +
                this.func.numFormat(this.import_detail.product_price);
        },
        getProduct(rec) {
            this.product_select = rec.production_type_name + " / " + rec.rub_size_name + " / " + rec.rub_style_name;
            this.import_detail.product_list_id = rec.product_list_id;
        },
        getProductDetail(val) {
            axios.get(`productdetail/search/${val}`).then((response) => {
                this.product_detail = response.data;
            });
        },
        getProductCost(val) {
            axios.get(`productcost/readbyjobtype/${val}`).then((response) => {
                this.product_cost = response.data;
                $(document).ready(() => {
                    $("#showProduct").DataTable({
                        "order": [[0, 'asc']],
                        "scrollY": '200px',
                        "scorllX": false,
                        "bJQueryUI": true,
                        "sPaginationType": "full_numbers",
                        "bFilter": true,
                        "paging": false,
                        "scrollCollapse": true,
                        "rowReorder": true,
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
        confirmImport() {
            if(confirm("เมื่อทำการยืนยันใบรับแล้ว จะไม่สามารถแก้ไขได้อีก\n คุณยืนยันที่จะทำรายการต่อหรือไม่?") == true) {
                alert("OK OK OK");
            }
        },
    },
}

</script>

<style scoped>

.progress {
    position: relative;
}

.progress span {
    position: absolute;
    display: block;
    width: 100%;
    color: black;
 }

.offcanvas {
    width: 500;
}

/*  */
.import-header {
    font-weight: bold;
    color: blue;
}

input[type="text"]:disabled {
    background: #e2e2e2;
}
</style>