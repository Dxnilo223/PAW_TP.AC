var mongoose = require("mongoose");
var Supermarket = require("../models/supermarket");

let supermarketController = {};

<<<<<<< HEAD
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
=======
// LIST
supermarketController.list = async (req, res) => {
  const supermarkets = await Supermarket.find().populate('owner');
  res.render('supermarkets/list', { supermarkets });
};

// CREATE (form)
supermarketController.create = (req, res) => {
  res.render('supermarkets/create', { error: null });
};

// SAVE (POST)
supermarketController.save = async (req, res) => {
  try {
>>>>>>> 9c15454553c974ac8da38ec75a3c0acef97fef3b
    const { name, description, location, schedule, method, cost } = req.body;

    const supermarket = new Supermarket({
      name,
      description,
      location,
      schedule,
      owner: req.session.user._id,   // <-- ADICIONADO
      deliveryMethods: [
        {
          method,
          cost: Number(cost)
        }
      ]
    });

<<<<<<< HEAD
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
 
=======
    await supermarket.save();

    res.redirect('/supermarkets');

  } catch (err) {
    console.log(err);
    res.render('supermarkets/create', { error: err.message });
  }
>>>>>>> 9c15454553c974ac8da38ec75a3c0acef97fef3b
};

// APPROVE
supermarketController.approve = async (req, res) => {
  await Supermarket.findByIdAndUpdate(req.params.id, { approved: true });
  res.redirect('/supermarkets');
};

// MIDDLEWARE getById
supermarketController.getById = async (req, res, next, id) => {
  try {
    const supermarket = await Supermarket.findById(id);
    if (!supermarket) return res.status(404).send("Supermarket not found");
    req.supermarket = supermarket;
    next();
  } catch (err) {
    next(err);
  }
};

// DETAIL PAGE
supermarketController.getOne = (req, res) => {
  if (req.supermarket) {
    res.render('supermarkets/detail', { supermarket: req.supermarket });
  } else {
    res.status(404).send("Supermarket not found");
  }
};

module.exports = supermarketController;