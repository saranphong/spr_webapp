const express = require("express");
// const mysql = require("mysql");
const cors = require("cors");
const router = express.Router();
const connection = require("./mysqlCon");
const { json } = require("express");

router.use(express.json()).use(cors());

router.get("/", cors(), async (req, res) => {
    res.send("Contact router rubbersize OK");
});

router.post("/new", cors(), async (req, res) => {
    const {
        rub_size_name, rub_size_detail
    } = req.body;
    try {
        connection.query(
            "INSERT INTO rubber_size(rub_size_name, rub_size_detail) VALUES(?,?)", [rub_size_name, rub_size_detail],
            (err, results, fields) => {
                if (err) {
                    console.log("Error while inserting a user into the database", err);
                    return res.status(400).send();
                }
                return res.status(201).json({ message: "New  rubber size successfully" });
            }
        );
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
});

router.post("/update", cors(), async (req, res) => {
    const {
        rub_size_id, rub_size_name, rub_size_detail
    } = req.body;
    try {
        connection.query("UPDATE rubber_size SET rub_size_name = ?, rub_size_detail = ? WHERE rub_size_id = ? ",
            [rub_size_name, rub_size_detail, rub_size_id],
            (err, result, fields) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                res.status(200).json({ message: "Update rubber size successfully" })
            });
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
});

router.delete("/delete", cors(), async (req, res) => {

});

router.get("/read", cors(), async (req, res) => {
    try {
        connection.query("SELECT * FROM rubber_size", (err, result, fields) => {
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

router.get("/findbytext/:search_text", cors(), async (req, res) => {
    const search_text = req.params.search_text
    const sql = `SELECT * FROM rubber_size WHERE rub_size_name LIKE '%${search_text}%'`;
    try {        
        connection.query(sql,
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

router.get("/search/:key", cors(), async (req, res) => {

});

module.exports = router;