<template>
    <!-- <div class="container-fluid mt-2"> -->
    <nav class="navbar bg-primary bg-opacity-25 shadow rounded-3">
        <a class="navbar-brand ms-2">
            <img src="./assets/sprlogo1x1.png" alt="Logo" width="25" height="25"
                class="d-inline-block align-text-top" />
            <span class="navbar-brand mb-0 ms-2" style="color: blue" v-if="this.onpage == true">
                <b style="color: blue">{{ this.userlogin }}</b>
                <b style="color: black">[</b>
                <b style="color: forestgreen">online</b>
                <b style="color: black">]</b>
            </span>
        </a>
        <div class="d-flex me-2">
            <button title="ออกจากระบบ" class="btn btn-logout shadow" @click.prevent="toLogout()"
                v-if="this.onpage == true">
                <font-awesome-icon icon="fa-solid fa-sign-out" style="color: white" />
            </button>
        </div>
    </nav>
    <!-- </div> -->
    <div class="container-fluid" v-if="this.onpage == false">
        <div class="card rounded-5 shadow-lg mx-auto mt-5 bg-primary bg-opacity-25" style="width: 18rem">
            <img src="./assets/sprlogo3x2.png" class="card-img-top" alt="spr-logo" />
            <div class="card-body text-center">
                <h5 class="card-title" style="font-size: small; font-weight: bold; color: darkblue">
                    SOMPONG RUBBER RETREADING
                </h5>
                <div class="mb-2">
                    <input type="text" class="form-control shadow-sm" id="exampleFormControlInput1"
                        placeholder="รหัสผู้ใช้งาน" ref="user_input" />
                </div>
                <div class="mb-2">
                    <input type="password" class="form-control shadow-sm" id="exampleFormControlInput1"
                        placeholder="รหัสผ่าน" />
                </div>
                <div class="align-content-center mt-3">
                    <button class="btn btn-login rounded- shadow glow-on-hover" @click.prevent="toLogin()">
                        <font-awesome-icon icon="fa-solid fa-user-shield" />&nbsp;เข้าสู่ระบบ
                    </button>
                </div>
            </div>
        </div>
    </div>
    <!-- zone view other page -->
    <div class="container-fluid">
        <firstpage v-if="this.onpage == true" />
        <!-- <menuwithant v-if="this.onpage == true" /> -->
    </div>
    <!-- end zone view other page -->
</template>

<script>
import firstpage from "@/pages/firstpage.vue";
// import menuwithant from "@/pages/menuwithant.vue"

export default {
    data() {
        return {
            onpage: false,
            userlogin: "",
        };
    },
    components: {
        firstpage,
        // menuwithant,
    },
    beforeCreate() {
        //localStorage.setItem("onpage", 0)
    },
    beforeUnmount() {
        sessionStorage.clear();
    },
    mounted() {
        this.$refs.user_input.focus();
    },
    methods: {
        toLogin() {
            sessionStorage.setItem("user_login","admin")
            this.userlogin = sessionStorage.getItem("user_login")
            this.onpage = !this.onpage;
        },
        toLogout() {
            this.$router.replace("/");
            // ถ้าต้องการ clear session เฉพาะบางตัว ให้ระบุตามบรรทัดด้านล่าง
            // sessionStorage.removeItem("user_login")
            // clear session ที่สร้างขึ้นมาทั้งหมด
            sessionStorage.clear();
            this.onpage = !this.onpage;
        },
    },
};
</script>

<style>

</style>
