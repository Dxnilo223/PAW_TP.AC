var mongoose = require("mongoose");
var Supermarket = require("../models/supermarket");

let supermarketController = {};

// LIST
supermarketController.list = async (req, res) => {
  const supermarkets = await Supermarket.find();

  res.render('supermarkets/list', {
    title: 'Supermarkets',
    supermarkets
  });
};

// CREATE FORM
supermarketController.create = (req, res) => {
  res.render('supermarkets/create', {
    title: 'Create Supermarket'
  });
};

// SAVE
supermarketController.save = async (req, res) => {
  try {
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

    await supermarket.save();

    res.redirect('/supermarkets');

  } catch (err) {
    console.log(err);
    res.send("Error creating supermarket");
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
