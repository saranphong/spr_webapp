const mysql = require("mysql");
const con = mysql.createConnection({
    host: "localhost",
    user: "spr_admin",
    password: "Handsome454559",
    database: "sprdb",
    port: 3306,
});

con.connect((err) => {
    if (err) {
        console.error("error conecting: " + err.stack);
        return;
    }
    // console.log("connected as id " + con.threadId);
});

module.exports = con