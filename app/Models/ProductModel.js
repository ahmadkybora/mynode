const dbCon = require("../../config/Connection.js");

const Product = product => {
    this.product_name = product.product_name;
    this.product_price = product.product_price;
    this.created_at = new Date();
    this.updated_at = new Date();
};

Product.findAll = (result) => {
    dbCon.query("SELECT * FROM products", (err, res) => {
        if(err)
        {
            console.log("error :", err);
            result(null, err);
        }
        else
        {
            console.log("user :", res);
            result(null, res);
        }
    });
};

Product.create = (create, result) => {
    dbCon.query("INSERT INTO user SET ?", create, (err, res) => {
        if(err)
        {
            console.log("error :", err);
            result(null, err);
        }
        else
        {
            console.log("error :", res.insertId);
            result(null, res.insertId);
        }
    });
};