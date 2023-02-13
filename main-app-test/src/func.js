import $ from "jquery"
import { Modal } from "bootstrap"
export default {
    async showModal(e) {
        let myModal = await new Modal(document.getElementById(e));
        await myModal.show();
    },
    async hideModal(e) {
        const body = document.querySelector("body");
        await $(".modal-backdrop").remove();
        await $(`#${e}`).removeClass("in");
        await $(`#${e}`).hide();
        body.style.overflow = "auto";
    },
    setFocusInModal(Modal, InputModal) {
        const myModal = document.getElementById(Modal);
        const myInput = document.getElementById(InputModal);
        myModal.addEventListener("shown.bs.modal", () => {
            myInput.focus();
        });
    },
    setFocus(input_id) {
        let event = document.querySelector(`#${input_id}`);
        event.focus();
        event.addEventListener("focus", () => {
            event.select();
        })
    },
    numFormat(e) {        
        const nf = new Intl.NumberFormat("th-TH", {
            style: "currency",
            currency: "THB",
            maximumFractionDigits: 2,
        }).format(e);
        return nf;
    },
    //    กำหนดให้พิมพ์ได้แค่ภาษาอังกฤษ และตัวเลข
    fixCharecter(evt) {
        let char = String.fromCharCode(evt.keyCode);
        if (/^[A-Za-z0-9_-]+$/.test(char)) return true;
        else evt.preventDefault();
        return char;
    },
    async clearSelect2(e,val) {
        await $(`#${e}`).val(`${val}`).tigger('change');
    },
    async setToday() {
        const myDate = await new Date();
        const myMonth = await myDate.getMonth() + 1;
        const newDate = await myDate.getDate() + "/" + myMonth + "/" + myDate.getFullYear();
        return await newDate;
    },
    async convertDateToMySql(isdate) {        
        const convertdate = await isdate.split("/");
        const dateToMySql = await convertdate[2] + "-" + convertdate[1] + "-" + convertdate[0];
        return await dateToMySql;
    },
}
