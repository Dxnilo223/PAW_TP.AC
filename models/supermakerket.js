const mongoose = require("mongoose");
const schema = mongoose.schema;

//Schema for donation
const superMarketSchema = new schema({
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
},
{ timestamps: true }
)