const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const saleSchema = new Schema({
  customerEmail: {
    type: String,
    required: true
  },

  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
      },
      quantity: {
        type: Number,
        required: true
      }
    }
  ],

  total: {
    type: Number,
    default: 0
  }

}, { timestamps: true });

module.exports = mongoose.model('Sale', saleSchema);

