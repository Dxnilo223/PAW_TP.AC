const Product = require("../models/productModel");
const Sale = require("../models/saleModel");

let salesController = {};

salesController.create = (req, res) => {
    Product.find()
    .then((products) => {
        res.render("sales/create", {
            title: "Create Sale",
            products
        });
    })

    .catch((err) => console.log(err));
};

