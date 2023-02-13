const express = require("express");
// const mysql = require("mysql");
const cors = require("cors");
const router = express.Router();
const connection = require("./mysqlCon");

router.use(express.json()).use(cors());

router.get("/", cors(), async (req, res) => {
    res.send('Contact router rubbergrade OK...')
});

router.post("/new", cors(), async (req, res) => {
    const {
        rub_grade_name
    } = req.body;
    try {
        connection.query(
            "INSERT INTO rubber_grade(rub_grade_name) VALUES(?)", [rub_grade_name],
            (err, results, fields) => {
                if (err) {
                    console.log("Error while inserting a user into the database", err);
                    return res.status(400).send();
                }
                return res.status(201).json({ message: "New rubber grade successfully" });
            }
        );
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
});

router.post("/update", cors(), async (req, res) => {
    const {
        rub_grade_name, id
    } = req.body;
    try {
        connection.query("UPDATE rubber_grade SET rub_grade_name = ? WHERE id = ?",
            [rub_grade_name, id],
            (err, result, fields) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                res.status(200).json({ message: "Update rubber grade successfully" })
            });
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
})

router.delete("/delete", cors(), async (req, res) => {

});

router.get("/read", cors(), async (req, res) => {
    try {
        connection.query("SELECT * FROM rubber_grade", (err, result, fields) => {
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