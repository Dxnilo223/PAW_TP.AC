var mongoose = require("mongoose");
var Supermarket = require("../models/supermarket")

let supermarketController = {};

//Supermarket List
supermarketController.list = (req, res) => {
const search = req.query.search || "";

  Supermarket.find({
    name: { $regex: search, $options: "i" }
  })
    .sort({ createdAt: -1 })
    .exec()
    .then((Supermarkets) => {
      res.render("supermarkets/list", {
        title: "Supermarkets list",
        supermarkets,
      });
    })
    .catch((err) => {
      console.log("Error: ", err);
      res.status(500).send("Error loading Supermarkets");
    });
};


//CREATE
supermarketController.create = (req, res) => {
  res.render("supermarkets/create", {
    title: "Create Supermarket",
  });
};

// SAVE
supermarketController.save =  (req, res) => {
    const { name, description, location, schedule, method, cost } = req.body;

    const supermarket = new Supermarket({
      name,
      description,
      location,
      schedule,
      deliveryMethods: [
        {
          method,
          cost: Number(cost)
        }
      ]
    });

    supermarket
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

// APPROVE (admin action)
supermarketController.approve = async (req, res) => {
  await Supermarket.findByIdAndUpdate(req.params.id, {
    approved: true
  });

  res.redirect('/supermarkets');
};

module.exports = supermarketController;