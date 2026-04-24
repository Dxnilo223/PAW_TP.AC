var mongoose = require("mongoose");
var Supermarket = require("../models/supermarket")

let supermarketController = {};

//Supermarket List
supermarketController.list = async (req, res) => {
  const supermarkets = await Supermarket.find().populate('owner');
  res.render('supermarkets/list', { supermarkets });
};

//CREATE
supermarketController.create = (req, res) => {
  res.render('supermarkets/create')
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

// APPROVE (admin action)
supermarketController.approve = async (req, res) => {
  await Supermarket.findByIdAndUpdate(req.params.id, {
    approved: true
  });

  res.redirect('/supermarkets');
};

module.exports = supermarketController;