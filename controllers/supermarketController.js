var mongoose = require("mongoose");
var Supermarket = require("../models/supermarket");

let supermarketController = {};

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

    await supermarket.save();

    res.redirect('/supermarkets');

  } catch (err) {
    console.log(err);
    res.render('supermarkets/create', { error: err.message });
  }
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