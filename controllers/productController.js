const mongoose = require("mongoose");
const Product = require("../models/product");

let productController = {};

/* LIST ProductS */
productController.list = (req, res) => {
  const search = req.query.search || "";

  Product.find({
    name: { $regex: search, $options: "i" }
  })
    .sort({ createdAt: -1 })
    .exec()
    .then((products) => {
      res.render("products/list", {
        title: "Products list",
        products,
      });
    })
    .catch((err) => {
      console.log("Error: ", err);
      res.status(500).send("Error loading Products");
    });
};

/* FORM Create Product */
productController.create = (req, res) => {
  res.render("products/create", {
    title: "Create Product",
    supermarkets
  });
};

/* SAVE Product */
productController.save = (req, res) => {
  supermarket: req.body.supermarket
  
  const { name, description, category, price, stock, image } = req.body;

  const product = new Product({
    name,
    description,
    category,
    price,
    stock,
    image: image || "default.jpg"
  });

  product
    .save()
    .then(() => {
      console.log("Product created successfully");
      res.redirect("/products");
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/products/create");
    });
};

/* VER DETALHES */
productController.view = (req, res) => {
  Product.findById(req.params.id)
    .exec()
    .then((product) => {
      res.render("products/view", {
        title: "Product details",
        product,
      });
    })
    .catch((err) => {
      console.log("Error: ", err);
      res.status(500).send("Internal error");
    });
};

/* FORM EDIT */
productController.edit = (req, res) => {
  Product.findById(req.params.id)
    .exec()
    .then((product) => {
      res.render("products/edit", {
        title: "Edit Product",
        product,
      });
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
};

/* UPDATE Product */
productController.update = (req, res) => {
  Product.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
        stock: req.body.stock,
        image: req.body.image
      },
    },
    { new: true }
  )
    .then(() => {
      res.redirect("/products");
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
};

/* DELETE Product */
productController.delete = (req, res) => {
  Product.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect("/products");
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
};

module.exports = productController;