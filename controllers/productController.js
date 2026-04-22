const mongoose = require("mongoose");
const Product = require("../models/Product");

let productController = {};

/* LISTAR PRODUTOS */
productController.list = (req, res) => {
  const search = req.query.search || "";

  Product.find({
    nome: { $regex: search, $options: "i" }
  })
    .sort({ createdAt: -1 })
    .exec()
    .then((products) => {
      res.render("products/list", {
        title: "Lista de Produtos",
        products,
      });
    })
    .catch((err) => {
      console.log("Erro: ", err);
      res.status(500).send("Erro ao carregar produtos");
    });
};

/* FORM CRIAR PRODUTO */
productController.create = (req, res) => {
  res.render("products/create", {
    title: "Criar Produto",
  });
};

/* GUARDAR PRODUTO */
productController.save = (req, res) => {
  const { nome, descricao, categoria, preco, stock, imagem } = req.body;

  const product = new Product({
    nome,
    descricao,
    categoria,
    preco,
    stock,
    imagem: imagem || "default.jpg"
  });

  product
    .save()
    .then(() => {
      console.log("Produto criado com sucesso");
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
        title: "Detalhes do Produto",
        product,
      });
    })
    .catch((err) => {
      console.log("Erro: ", err);
      res.status(500).send("Erro interno");
    });
};

/* FORM EDITAR */
productController.edit = (req, res) => {
  Product.findById(req.params.id)
    .exec()
    .then((product) => {
      res.render("products/edit", {
        title: "Editar Produto",
        product,
      });
    })
    .catch((err) => {
      console.log("Erro: ", err);
    });
};

/* ATUALIZAR PRODUTO */
productController.update = (req, res) => {
  Product.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        nome: req.body.nome,
        descricao: req.body.descricao,
        categoria: req.body.categoria,
        preco: req.body.preco,
        stock: req.body.stock,
        imagem: req.body.image
      },
    },
    { new: true }
  )
    .then(() => {
      res.redirect("/products");
    })
    .catch((err) => {
      console.log("Erro: ", err);
    });
};

/* APAGAR PRODUTO */
productController.delete = (req, res) => {
  Product.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect("/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = productController;