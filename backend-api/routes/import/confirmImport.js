const express = require("express");
const cors = require("cors");
const router = express.Router();
const connection = require("../mysqlCon.js");

router.use(express.json()).use(cors());

router.get("/", cors(), async (req, res) => {
    res.send('********* Confirm Import Bill ********* <br> router is OK');    
});

module.exports = router;