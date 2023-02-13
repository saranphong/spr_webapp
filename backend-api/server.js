const express = require("express");
const app = express();
const cors = require("cors");
//const mysql = require("mysql");

const users = require("./routes/users.js");
const customerRoute = require("./routes/Customer.js");
const provinceRoute = require("./routes/Province.js");
const brandRoute = require("./routes/RubberBrand.js");
const sizeRoute = require("./routes/RubberSize.js");
const styleRoute = require("./routes/RubberStyle.js");
const gradeRoute = require("./routes/RubberGrade.js");
const productdetail = require("./routes/ProductDetail.js");
const productcost = require("./routes/ProductCost.js");
const productlist = require("./routes/ProductList.js");
const productiontype = require("./routes/ProductionType.js");
const billimport = require("./routes/import/BillImport.js");
const confirmImport = require("./routes/import/confirmImport.js");

app.use("/users", users);
app.use("/customer", customerRoute);
app.use("/province", provinceRoute);
app.use("/rubberbrand", brandRoute);
app.use("/rubbersize", sizeRoute);
app.use("/rubberstyle", styleRoute);
app.use("/rubbergrade", gradeRoute);
app.use("/productdetail", productdetail);
app.use("/productcost", productcost);
app.use("/productlist", productlist);
app.use("/productiontype", productiontype);
app.use("/billimport", billimport);
app.use("/confirmImport", confirmImport);



app.use(express.json()).use(cors());
const PORT = process.env.PORT || 3000;

app.get("/", cors(), async (req, res) => {
    res.send('>>> Main connection with my API <<<');
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));