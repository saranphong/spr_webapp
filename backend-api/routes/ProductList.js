// สร้างรายการสินค้า
const express = require("express");
const cors = require("cors");
const router = express.Router();
const connection = require("./mysqlCon");

router.use(express.json()).use(cors());

router.get("/", cors(), async (req, res) => {
    res.send("=== API for ProductList ===");
});
router.post("/new", cors(), async (req, res) => {
    const {
        production_type_id, rub_style_id, rub_size_id
    } = req.body;
    try {
        connection.query(" INSERT INTO product_list(production_type_id, rub_style_id, rub_size_id) VALUE(?,?,?)",
            [production_type_id, rub_style_id, rub_size_id],
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
router.get("/read", cors(), async (req, res) => {
    try {
        connection.query("SELECT * FROM product_list, production_type, rubber_size, rubber_style " +
            "WHERE product_list.production_type_id = production_type.production_type_id " +
            "AND product_list.rub_size_id = rubber_size.rub_size_id " +
            "AND product_list.rub_style_id = rubber_style.rub_style_id ORDER BY product_list.product_list_id",
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
router.get("/search_productiontype/:production_type_id", cors(), async (req, res) => {
    const production_type_id = req.params.production_type_id;
    try {
        connection.query("SELECT * FROM product_list, production_type, rubber_size, rubber_style " +
            "WHERE product_list.production_type_id = production_type.production_type_id " +
            "AND product_list.rub_size_id = rubber_size.rub_size_id " +
            "AND product_list.rub_style_id = rubber_style.rub_style_id " +
            "AND product_list.production_type_id = ? ORDER BY product_list.product_list_id", [production_type_id],
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
router.get("/findstylebyproduction/:production_type_id", cors(), async (req, res) => {
    const production_type_id = req.params.production_type_id;
    try {
        connection.query("SELECT product_list.rub_style_id, rubber_style.rub_style_name FROM product_list " +
            "INNER JOIN rubber_style ON rubber_style.rub_style_id = product_list.rub_style_id " +
            "WHERE product_list.production_type_id = ? " +
            "GROUP BY product_list.rub_style_id, rubber_style.rub_style_name", [production_type_id],
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
router.post("/findsizebystyle", cors(), async (req, res) => {
    const {
        find_style, find_production_type
    } = req.body
    try {        
        connection.query("SELECT product_list.rub_size_id, rubber_size.rub_size_name, rubber_size.rub_size_detail FROM product_list, rubber_size " +
            "WHERE product_list.rub_size_id = rubber_size.rub_size_id " +
            "AND product_list.rub_style_id = ? " +
            "AND product_list.production_type_id = ? " +
            "GROUP BY product_list.rub_size_id, rubber_size.rub_size_name " +
            "ORDER BY product_list.rub_size_id",
            [find_style, find_production_type],
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
router.post("/find3f", cors(), async (req, res) => {
    const {
        SQL_Code
    } = req.body
    try {
        connection.query(SQL_Code,
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
router.post("/checkdup", cors(), async (req, res) => {
    const {
        production_type_id, rub_style_id, rub_size_id
    } = req.body;
    try {

        connection.query("SELECT * FROM product_list, production_type, rubber_size, rubber_style " +
            "WHERE product_list.production_type_id = production_type.production_type_id " +
            "AND product_list.rub_size_id = rubber_size.rub_size_id " +
            "AND product_list.rub_style_id = rubber_style.rub_style_id " +
            "AND product_list.production_type_id = ? AND product_list.rub_size_id = ? AND product_list.rub_style_id = ?",
            [production_type_id, rub_size_id, rub_style_id],
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