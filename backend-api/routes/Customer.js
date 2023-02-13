const express = require("express");
//const mysql = require("mysql");
const cors = require("cors");
const router = express.Router();
const connection = require("./mysqlCon");

router.use(express.json()).use(cors());

router.get("/", cors(), async (req, res) => {
    res.send('Hello test api with HostATOM@customer');
})

router.post("/new", cors(), async (req, res) => {
    const {
        customerId, customerName, customerAddr, province_id, postCode,
        customerTel, contactName, contactTel, contactPosition, payType, creditDay,
        creditLimit, priceType, remark, customerDel
    } = req.body;
    try {
        connection.query(
            "INSERT INTO spr_customer(customerId, customerName, customerAddr, province_id, postCode," +
            "customerTel, contactName, contactTel, contactPosition, payType, " +
            "creditDay, creditLimit, priceType, remark, customerDel) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
            [
                customerId, customerName, customerAddr, province_id, postCode,
                customerTel, contactName, contactTel, contactPosition, payType, creditDay,
                creditLimit, priceType, remark, customerDel
            ],
            (err, results, fields) => {
                if (err) {
                    console.log("Error while inserting a user into the database", err);
                    return res.status(400).send();
                }
                return res.status(201).json({ message: "New customer successfully created" });
            }
        );
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
});

router.delete("/delete", cors(), async (req, res) => {

});

router.get("/read", cors(), async (req, res) => {
    try {
        await connection.query("SELECT * FROM spr_customer LEFT JOIN  province ON spr_customer.province_id = province.PROVINCE_ID", (err, result, fields) => {
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

router.post("/update", cors(), async (req, res) => {
    const {
        customerId, customerName, customerAddr, province_id, postCode,
        customerTel, contactName, contactTel, contactPosition, payType, creditDay,
        creditLimit, priceType, remark, customerDel
    } = req.body;
    try {
        connection.query("UPDATE spr_customer SET customerName = ?, customerAddr = ?, province_id = ?, postCode = ?, " +
            "customerTel = ?, contactName = ?, contactTel = ?, contactPosition = ?, payType = ?, creditDay = ?, " +
            "creditLimit = ?, priceType = ?, remark = ?, customerDel = ?  WHERE customerId = ?",
            [
                customerName, customerAddr, province_id, postCode, customerTel, contactName,
                contactTel, contactPosition, payType, creditDay, creditLimit, priceType, remark, customerDel, customerId
            ],
            (err, result, fields) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                res.status(200).json({ message: "Update password successfully" })
            });
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
});

router.get("/search/:custID", cors(), async (req, res) => {
    const custID = req.params.custID;
    try {
        connection.query("SELECT * FROM spr_customer WHERE customerId = ?", [custID], (err, result, fields) => {
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

router.get("/findbyautoid/:cust_auto_id", cors(), async (req, res) => {
    const cust_auto_id = req.params.cust_auto_id;
    try {
        connection.query("SELECT * FROM spr_customer WHERE cust_auto_id = ?", [cust_auto_id], (err, result, fields) => {
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