const mongoose = require("mongoose");
const schema = mongoose.schema;

//Schema for Supermarket
const SupermarketSchema = new schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    description: {type: String},
    location: {
        city: {
            type: String,
            required: true,
        },
        street: {
            type: String,
            required: true,
        },
        postalCode: {
        type: String,
        required: true,
        },
    },
    schedule:{
        type: String,
        required: true,
    },
    phone:{
        type:String,
        required: true,
    },
    deliveryMethod: {
        method: { type: String, enum:['courier', 'pickup']}
    },
    deliveryCost: {
        type:Number,
        default:0,
    },
    approved: {
    type: Boolean,
    default: false
  },

},
{ timestamps: true }
)

module.exports = mongoose.model('Supermarket', supermarketSchema);