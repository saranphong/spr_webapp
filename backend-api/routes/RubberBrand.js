const express = require("express");
// const mysql = require("mysql");
const cors = require("cors");
const router = express.Router();
const connection = require("./mysqlCon");

router.use(express.json()).use(cors());

router.post("/new", cors(), async (req, res) => {
    const {
        rub_brand_shotname, rub_brand_name
    } = req.body;
    try {
        connection.query(
            "INSERT INTO rubber_brand(rub_brand_shotname, rub_brand_name) VALUES(?,?)", [rub_brand_shotname, rub_brand_name],
            (err, results, fields) => {
                if (err) {
                    console.log("Error while inserting a user into the database", err);
                    return res.status(400).send();
                }
                return res.status(201).json({ message: "New  rubber brand successfully" });
            }
        );
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
});

router.post("/update", cors(), async (req, res) => {
    const {
        rub_brand_id, rub_brand_shotname, rub_brand_name
    } = req.body;
    try {
        connection.query("UPDATE rubber_brand SET rub_brand_shotname = ?, rub_brand_name = ? WHERE rub_brand_id = ? ",
            [rub_brand_shotname, rub_brand_name, rub_brand_id],
            (err, result, fields) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                res.status(200).json({ message: "Update rubber brand successfully" })
            });
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
});

router.delete("/delete", cors(), async (req, res) => {

});

router.get("/read", cors(), async (req, res) => {
    //console.log('--- Rubber Brand ---')
    try {
        connection.query("SELECT * FROM rubber_brand", (err, result, fields) => {
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