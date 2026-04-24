var mongoose = require("mongoose");
var Supermarket = require("../../models/supermarket")

let supermarketController = {};

exports.list = async (req, res) => {
  const supermarkets = await Supermarket.find().populate('owner');
  res.render('supermarkets/list', { supermarkets });
};

exports.approve = async (req, res) => {
  await Supermarket.findByIdAndUpdate(req.params.id, { approved: true });
  res.redirect('/supermarkets');
};

exports.getCreate = (req, res) => res.render('supermarkets/form', { error: null });

exports.postCreate = async (req, res) => {
  try {
    const { name, description, location, schedule, phone } = req.body;
    await Supermarket.create({ name, description, location, schedule, phone, owner: req.session.user._id });
    res.redirect('/supermarkets');
  } catch (err) {
    res.render('supermarkets/form', { error: 'Erro ao criar supermercado' });
  }
};

supermarketController.getAll = async (req, res, next) => {
  try {
    const supermarkets = await Supermarket.find({ active: true });
    res.json(supermarkets);
  } catch (err) {
    next(err);
  }
};

supermarketController.getOne = (req, res, next) => {
  if (req.supermarket) {
    res.json(req.supermarket);
  } else {
    res.status(404).send("Supermarket not found");
  }
};

supermarketController.getById = async function (req, res, next, id) {
    try{
    var supermarket = await Supermarket.findById(id);
    if(!supermarket){
      return res.status(404).send("Supermarket not found");
    }
    req.supermarket = supermarket;
    next()
}catch (err) {
    next(err);
  }
}


module.exports = superMController;