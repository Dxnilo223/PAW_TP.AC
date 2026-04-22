const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    descricao: {
        type: String
    },
    categoria: {
        type: String
    },
    preco: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        default: 0
    },
    imagem: {
        type: String,
        required: true
      },
}, 
{
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);