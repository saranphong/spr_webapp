const express = require("express");
const cors = require("cors");
const router = express.Router();
const connection = require("./mysqlCon");
router.use(express.json()).use(cors());

router.get("/", cors(), async (req, res) => {
    res.send('Hello user authen...');
})

router.get("/read", cors(), async (req, res) => {
    try {
        connection.query("SELECT * FROM users", (err, result, fields) => {
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

router.get("/search/:user", cors(), async (req, res) => {
    const user = req.params.user;
    // console.log('func() member search started...')
    try {
        connection.query("SELECT * FROM users WHERE userName = ?", [user], (err, result, fields) => {
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