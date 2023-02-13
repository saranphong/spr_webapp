const express = require("express");
// const mysql = require("mysql");
const cors = require("cors");
const router = express.Router();
const connection = require("./mysqlCon");

router.use(express.json()).use(cors());

// const connection = mysql.createConnection({
//     host: "localhost",
//     user: "spr_admin",
//     password: "Handsome454559",
//     database: "sprdb",
//     port: 3306,
// });

router.post("/new", cors(), async (req, res) => {

});

router.delete("/delete", cors(), async (req, res) => {

});

router.get("/read", cors(), async (req, res) => {
    //res.send({data: "readProvince"});
    try {
        connection.query("SELECT * FROM province", (err, result, fields) => {
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

router.patch("/update", cors(), async (req, res) => {

})

router.get("/search/:key", cors(), async (req, res) => {
    try {
        connection.query("SELECT * FROM province", (err, result, fields) => {
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