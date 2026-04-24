const Product = require("../models/product");
const Sale = require("../models/sale");

let salesController = {};

salesController.list = async (req, res) => {
  const sales = await Sale.find().populate('products.product');

  res.render('sales/list', {
    title: "Sales",
    sales
  });
};

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

salesController.save = async (req, res) => {
    try {
        let { customerEmail, productIds, quantities } = req.body;

        // GARANTIR ARRAYS
        const ids = Array.isArray(productIds) ? productIds : [productIds];
        const qtys = Array.isArray(quantities) ? quantities : [quantities];

        let productsArray = [];
        let total = 0;

        for (let i = 0; i < ids.length; i++) {

            const product = await Product.findById(ids[i]);
            const quantity = parseInt(qtys[i]);

            if (product && quantity > 0) {
                productsArray.push({
                    product: product._id,
                    quantity
                });

                total += product.price * quantity;
            }
        }

        const sale = new Sale({
            customerEmail,
            products: productsArray,
            total
        });

        await sale.save();

        res.redirect('/sales/create');

    } catch (err) {
        console.log(err);
        res.send("Error creating sale");
    }
};

module.exports = salesController;
