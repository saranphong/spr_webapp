<template>
    <input id="datepicker" :class="xclass" :style="xstyle" readonly/>
</template>

<script>
import $ from "jquery"
export default {
    name: "MyDatepicker",
    props: [
        "xstyle",
        "xclass",
    ],
    emits: ["update:xtext"],
    mounted() {
        this.getDatepicker();
    },
    methods: {
        getDatepicker() {
            $(document).ready(()=> {
                $('#datepicker').datepicker({
                    format: "dd/mm/yyyy",
                    autoclose: true,
                    toggleActive: true,
                });
                $('#datepicker').change(() => {
                    this.$emit("getDate", $('#datepicker').val());
                });
            });
        },
    }
}
</script>
