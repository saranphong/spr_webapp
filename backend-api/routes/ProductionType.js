// สร้างรายการสินค้า
const express = require("express");
const cors = require("cors");
const router = express.Router();
const connection = require("./mysqlCon");

router.use(express.json()).use(cors());

router.get("/", cors(), async (req, res) => {
    res.send("=== API for Production Type ===");
});

router.get("/read", cors(), async (req, res) => {
    try {
        connection.query("SELECT * FROM production_type",
            (err, result, fields) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                res.status(200).json(result)
            })
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
});

module.exports = router;