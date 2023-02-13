// รายละเอียดการผลิต
const express = require("express");
//const mysql = require("mysql");
const cors = require("cors");
const router = express.Router();
const connection = require("./mysqlCon");

router.use(express.json()).use(cors());

router.get("/read", cors(), async (req, res) => {
    try {
        connection.query("SELECT product_detail.pro_de_id, job_type.job_type_name, production_type.production_type_name " +
            "FROM product_detail, job_type, production_type " +
            "WHERE product_detail.job_type_id = job_type.job_type_id AND product_detail.production_type_id = production_type.production_type_id",
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

router.get("/search/:job_type_id", cors(), async (req, res) => {
    const job_type_id = req.params.job_type_id;
    try {
        connection.query("SELECT * FROM product_detail, job_type, production_type " +            
            "WHERE product_detail.job_type_id = job_type.job_type_id AND product_detail.production_type_id = production_type.production_type_id " +
            "AND product_detail.job_type_id = ?", [job_type_id], (err, result, fields) => {
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