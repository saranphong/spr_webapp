const express = require("express");
// const mysql = require("mysql");
const cors = require("cors");
const router = express.Router();
const connection = require("./mysqlCon");

router.use(express.json()).use(cors());

router.post("/new", cors(), async (req, res) => {
    const {
        rub_style_name, rub_style_desc
    } = req.body;
    try {
        connection.query("INSERT INTO rubber_style(rub_style_name,rub_style_desc) VALUES(?,?)",
            [rub_style_name, rub_style_desc],
            (err, results, fields) => {
                if (err) {
                    console.log("พบข้อผิดพลาดในการบันทึกข้อมุลลายดอก ", err);
                    return res.status(400).send();
                }
                return res.status(201).json({ message: "New  rubber style successfully" });
            }
        );
    } catch (error) {
        console.log(err);
        return res.status(500).send();
    }
});

router.post("/update", cors(), async (req, res) => {
    const {
        rub_style_id, rub_style_name, rub_style_desc
    } = req.body;
    try {
        connection.query("UPDATE rubber_style SET rub_style_name = ?, rub_style_desc = ? WHERE rub_style_id = ?",
            [rub_style_name, rub_style_desc, rub_style_id],
            (err, results, fields) => {
                if (err) {
                    console.log("พบข้อผิดพลาดในการแก้ไขข้อมูลลายดอก ", err);
                    return res.status(400).send();
                }
                return res.status(201).json({ message: "Update  rubber style successfully" });
            }
        );
    } catch (error) {
        console.log(err);
        return res.status(500).send();
    }
});

router.delete("/delete", cors(), async (req, res) => {

});

router.get("/read", cors(), async (req, res) => {
    try {
        connection.query("SELECT * FROM rubber_style", (err, result, fields) => {
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

router.get("/search/:key", cors(), async (req, res) => {

});

module.exports = router;