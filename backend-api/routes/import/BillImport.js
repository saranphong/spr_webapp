const express = require("express");
const cors = require("cors");
const router = express.Router();
const connection = require("../mysqlCon.js");

router.use(express.json()).use(cors());

router.get("/", cors(), async (req, res) => {
    res.send('>>> Router for BillImport@API <<<');
})

router.post("/new", cors(), async (req, res) => {
    const {
        import_book_id, import_book_no, cust_auto_id, import_user,
        job_type_id, pay_type, import_date, import_status
    } = req.body;
    try {
        connection.query("INSERT INTO import_header(import_book_id, import_book_no, cust_auto_id, import_user, " +
            "job_type_id, pay_type, import_date, import_status) VALUES(?,?,?,?,?,?,?,?)",
            [
                import_book_id, import_book_no, cust_auto_id, import_user,
                job_type_id, pay_type, import_date, import_status
            ],
            (err, result, fields) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                res.status(200).json({ message: "New data successfully" })
            });
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
});

router.post("/update", cors(), async (req, res) => {
    const {
        import_id, cust_auto_id, job_type_id, pay_type, import_date
    } = req.body;
    try {
        connection.query("UPDATE import_header SET cust_auto_id = ?, job_type_id = ?, " +
            "pay_type = ?, import_date = ? WHERE import_id = ?",
            [
                cust_auto_id, job_type_id, pay_type, import_date, import_id
            ],
            (err, result, fields) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                res.status(200).json({ message: "edit data successfully" })
            });
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
});

router.get("/read", cors(), async (req, res) => {
    try {
        connection.query("SELECT *,DATE_FORMAT(import_date,'%d/%m/%Y') as new_import_date FROM import_header " +
            "INNER JOIN spr_customer ON import_header.cust_auto_id = spr_customer.cust_auto_id " +
            "INNER JOIN job_type ON import_header.job_type_id = job_type.job_type_id " +
            "ORDER BY import_id", (err, result, fields) => {
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

router.get("/search/:book_id/:book_no", cors(), async (req, res) => {
    const book_id = req.params.book_id;
    const book_no = req.params.book_no;
    try {
        // connection.query("SELECT * FROM import_header WHERE import_book_id = ? and import_book_no = ?", [book_id, book_no], (err, result, fields) => {
        connection.query("SELECT *,DATE_FORMAT(import_date,'%d/%m/%Y') as new_import_date FROM import_header " +
            "INNER JOIN spr_customer ON import_header.cust_auto_id = spr_customer.cust_auto_id " +
            "INNER JOIN job_type ON import_header.job_type_id = job_type.job_type_id " +
            "WHERE import_book_id = ? and import_book_no = ? " +
            "ORDER BY import_id", [book_id, book_no], (err, result, fields) => {
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

router.get("/searchid/:import_id", cors(), async (req, res) => {
    const import_id = req.params.import_id;
    // console.log("ค้นหาจาก: "+import_id)
    try {
        connection.query("SELECT *,DATE_FORMAT(import_date,'%d/%m/%Y') as new_import_date FROM import_header " +
            "INNER JOIN spr_customer ON import_header.cust_auto_id = spr_customer.cust_auto_id " +
            "INNER JOIN job_type ON import_header.job_type_id = job_type.job_type_id " +
            "WHERE import_id = ?" +
            "ORDER BY import_id", [import_id], (err, result, fields) => {
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

router.get("/detail/read/:import_id", cors(), async (req, res) => {
    const import_id = req.params.import_id
    try {
        // ต้องทำการเขียน Code ใหม่ เนื่องจาก ต้องอ้างอิงข้อมูลสินค้าจาก product_list แทนการอ้างอิง product_fix_cost
        connection.query("SELECT * FROM import_detail, rubber_brand, rubber_grade, rubber_size, rubber_style, production_type, product_list " +
            "WHERE import_detail.rub_brand_id = rubber_brand.rub_brand_id " +
            "AND import_detail.rub_grade_id = rubber_grade.id " +
            "AND import_detail.product_list_id = product_list.product_list_id " +
            "AND product_list.production_type_id = production_type.production_type_id " +
            "AND product_list.rub_size_id = rubber_size.rub_size_id " +
            "AND product_list.rub_style_id = rubber_style.rub_style_id " +
            "AND import_id = ? ORDER BY import_detail.import_detail_id", [import_id], (err, result, fields) => {
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

router.get("/detail/checkimportdetail/:manufac_id", cors(), async (req, res) => {
    // const import_id = req.params.import_id;
    const manufac_id = req.params.manufac_id;
    try {
        connection.query("SELECT * FROM import_detail " +
            "WHERE manufac_id = ?", [manufac_id], (err, result, fields) => {
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

router.post("/detail/new", cors(), async (req, res) => {
    const {
        import_id, rub_brand_id, manufac_id, rub_grade_id, product_list_id, product_price, pay_type, import_progress, import_detail_status
    } = req.body;
    try {
        connection.query("INSERT INTO import_detail(import_id, rub_brand_id, manufac_id, rub_grade_id, product_list_id, "+
            "product_price, pay_type, import_progress, import_detail_status) VALUES(?,?,?,?,?,?,?,?,?)",
            [
                import_id, rub_brand_id, manufac_id, rub_grade_id, product_list_id,
                product_price, pay_type, import_progress, import_detail_status
            ],
            (err, result, fields) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                res.status(200).json({ message: "New data successfully " + result })
            });
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
});

router.post("/detail/update/:import_detail_id", cors(), async (req, res) => {
    const import_detail_id = req.params.import_detail_id;
    const {
        rub_brand_id, manufac_id, rub_grade_id, product_list_id, product_price, import_detail_status
    } = req.body;
    try {
        connection.query("UPDATE import_detail SET rub_brand_id = ?, manufac_id = ?, rub_grade_id = ?, product_list_id = ?, product_price = ?, import_detail_status = ? " +
            "WHERE import_detail_id = ?",
            [
                rub_brand_id, manufac_id, rub_grade_id, product_list_id, product_price, import_detail_status, import_detail_id
            ],
            (err, result, fields) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                res.status(200).json({ message: "update data successfully " + result })
            });
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
});

router.delete("/detail/delete/:import_detail_id", cors(), async (req, res) => {
    const import_detail_id = req.params.import_detail_id;
    try {
        connection.query("DELETE FROM import_detail WHERE import_detail_id = ?", [import_detail_id], (err, result, fields) => {
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