<template>
    Input Text:
    <div>
        <input type="text" @keypress="setData($event)">
    </div>
    {{ info }}
</template>

<script setup>
    const info = {
        fname: "",
        lname: ""
    }
    const setData = (evt) => {
        let val = String.fromCharCode(evt.keyCode);
        info.fname = info.fname+val;
        alert(info.fname)
        // return val;
    }
</script>