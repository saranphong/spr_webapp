<template>

<button class="btn btn-primary mt-1 ms-1 me-2" @click.prevent="navColtrol()">☰</button>
    <div id="mySidebar" class="sidebar">
        <a href="#" class="closebtn" @click.prevent="navColtrol()">x</a>

    </div>
    <div id="main">
        <RouterView />
    </div>
</template>
<script>
export default {
    data() {
        return {
            navSTA: false,
        }
    },
    methods: {
        navColtrol() {
            if (this.navSTA == false) {
                document.getElementById("mySidebar").style.width = "220px";
                document.getElementById("main").style.marginLeft = "220px";
                this.navSTA = !this.navSTA;
            } else {
                document.getElementById("mySidebar").style.width = "0";
                document.getElementById("main").style.marginLeft = "0";
                this.navSTA = !this.navSTA;
            }
        },
        openNav() {
            document.getElementById("mySidebar").style.width = "200px";
            document.getElementById("main").style.marginLeft = "200px";
        },
        closeNav() {
            document.getElementById("mySidebar").style.width = "0";
            document.getElementById("main").style.marginLeft = "0";
        }
    },
}
</script>

<style>
.sidebar {
    height: 100%;
    width: 0;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: #111;
    overflow-x: hidden;
    transition: 0.5s;
    padding-top: 60px;
}

.sidebar a {
    padding: 8px 8px 8px 32px;
    text-decoration: none;
    font-size: 25px;
    color: #818181;
    display: block;
    transition: 0.3s;
}

.sidebar a:hover {
    color: #f1f1f1;
}

.sidebar .closebtn {
    position: absolute;
    top: 0;
    right: 25px;
    font-size: 36px;
    margin-left: 50px;
}

.openbtn {
    font-size: 20px;
    cursor: pointer;
    background-color: #111;
    color: white;
    padding: 10px 15px;
    border: none;
}

.openbtn:hover {
    background-color: #444;
}

#main {
    transition: margin-left .5s;
    padding: 16px;
}

/* On smaller screens, where height is less than 450px, change the style of the sidenav (less padding and a smaller font size) */
@media screen and (max-height: 450px) {
    .sidebar {
        display: none;
        padding-top: 15px;
    }

    .sidebar a {
        font-size: 18px;
    }
}

/* ส่วนของ link menu ต่างๆ */

.dataTables_filter {
    width: 35%;
    float: right;
    text-align: left;
}

tr:hover {
    background-color: rgb(124, 152, 253);
}

.btn-logout {
    height: 40px;
    width: 40px;
    background: rgb(255, 88, 88);
    /* margin: 20px; */
    float: left;
    box-shadow: 0 0 1px #ccc;
    -webkit-transition: all 0.2s ease-in-out;
    border: 0px;
    color: rgb(255, 255, 255);
}

.btn-logout:hover {
    -webkit-transform: scale(1.1);
    background: #ff0000;
}

/* .btn-login {
    background: #0088ff;
    color: white;
} */
.btn-login:hover {
    /* background: #1500ff; */
    color: rgb(255, 255, 255);
}

html,
body {
    background: rgb(255, 255, 255);
}

.glow-on-hover {
    /* width: 220px;
    height: 50px; */
    border: none;
    outline: none;
    color: #fff;
    background: darkblue;
    cursor: pointer;
    position: relative;
    z-index: 0;
    border-radius: 10px;
}

.glow-on-hover:before {
    content: '';
    background: linear-gradient(45deg, #ff0000, #ff7300, #fffb00, #48ff00, #00ffd5, #002bff, #7a00ff, #ff00c8, #ff0000);
    position: absolute;
    top: -2px;
    left: -2px;
    background-size: 400%;
    z-index: -1;
    filter: blur(5px);
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    animation: glowing 20s linear infinite;
    opacity: 0;
    transition: opacity .3s ease-in-out;
    border-radius: 10px;
}

.glow-on-hover:active {
    color: darkblue;
}

.glow-on-hover:active:after {
    background: transparent;
}

.glow-on-hover:hover:before {
    opacity: 1;
}

.glow-on-hover:after {
    z-index: -1;
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: darkblue;
    left: 0;
    top: 0;
    border-radius: 10px;
}

@keyframes glowing {
    0% {
        background-position: 0 0;
    }

    50% {
        background-position: 400% 0;
    }

    100% {
        background-position: 0 0;
    }
}

.third {
    border-color: #3498db;
    color: #fff;
    box-shadow: 0 0 40px 40px #090085 inset, 0 0 0 0 #00087e;
    -webkit-transition: all 150ms ease-in-out;
    transition: all 150ms ease-in-out;
}

.third:hover {
    box-shadow: 0 0 10px 0 #3498db inset, 0 0 10px 4px #3498db;
}

.btn-menu {
    box-sizing: border-box;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-color: transparent;
    border-radius: 0.6em;
    cursor: pointer;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-align-self: center;
    -ms-flex-item-align: center;
    align-self: center;
    font-size: 1rem;
    line-height: 1;
    text-decoration: none;
    text-align: center;
    text-transform: uppercase;
    font-family: 'Montserrat', sans-serif;
}

.btn-menu:hover,
.btn:focus {
    color: #fff;
    outline: 0;
}
</style>