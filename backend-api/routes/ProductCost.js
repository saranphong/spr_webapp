const express = require("express");
const cors = require("cors");
const router = express.Router();
const connection = require("./mysqlCon");

router.use(express.json()).use(cors());

router.get("/", cors(), async (req, res) => {
    res.send('Hello router@productCost...');
});

router.get("/read", cors(), async (req, res) => {
    try {
        connection.query("SELECT * FROM product_fix_cost, job_type, production_type, rubber_grade, rubber_style, rubber_size, product_list " +
            "WHERE product_fix_cost.job_type_id = job_type.job_type_id " +
            "AND product_fix_cost.production_type_id = production_type.production_type_id " +
            "AND product_fix_cost.rub_grade_id = rubber_grade.id " +
            "AND product_fix_cost.product_list_id = product_list.product_list_id " +
            "AND product_list.rub_size_id = rubber_size.rub_size_id " +
            "AND product_list.rub_style_id = rubber_style.rub_style_id ORDER BY product_fix_cost.fixcost_id",
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
router.get("/readbyjobtype/:job_type_id", cors(), async (req, res) => {
    const job_type_id = req.params.job_type_id
    try {
        connection.query("SELECT * FROM product_fix_cost, job_type, production_type, rubber_grade, rubber_style, rubber_size, product_list " +
            "WHERE product_fix_cost.job_type_id = job_type.job_type_id " +
            "AND product_fix_cost.production_type_id = production_type.production_type_id " +
            "AND product_fix_cost.rub_grade_id = rubber_grade.id " +
            "AND product_fix_cost.product_list_id = product_list.product_list_id " +
            "AND product_list.rub_size_id = rubber_size.rub_size_id " +
            "AND product_list.rub_style_id = rubber_style.rub_style_id " +
            "AND product_fix_cost.job_type_id = ? "+
            "ORDER BY product_fix_cost.fixcost_id", [job_type_id],
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

router.post("/new", cors(), async (req, res) => {
    const {
        job_type_id, production_type_id, product_list_id, rub_grade_id, price1, price2
    } = req.body;
    try {
        connection.query(
            "INSERT INTO product_fix_cost(job_type_id, production_type_id, product_list_id, rub_grade_id, price1, price2) " +
            "VALUES(?,?,?,?,?,?)",
            [
                job_type_id, production_type_id, product_list_id, rub_grade_id, price1, price2
            ],
            (err, results, fields) => {
                if (err) {
                    console.log("Error insert into table RubberPrice", err);
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

router.post("/update", cors(), async (req, res) => {
    const {
        fixcost_id, job_type_id, production_type_id, product_list_id, rub_grade_id, price1, price2
    } = req.body;
    try {
        connection.query("UPDATE product_fix_cost SET job_type_id = ?, production_type_id = ?, product_list_id = ?, " +
            "rub_grade_id = ?, price1 = ?, price2 = ? WHERE fixcost_id = ?",
            [
                job_type_id, production_type_id, product_list_id, rub_grade_id, price1, price2, fixcost_id
            ],
            (err, result, fields) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                res.status(200).json({ message: "Update product cost success..." })
            });
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
});

module.exports = router;