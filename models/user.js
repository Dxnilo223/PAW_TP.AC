const mongoose = require('mongoose')
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, 'Username is required!']
    },
    email:{
        type: String,
        required: [true, 'Email is required!'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email.']
    },
password: {
        type: String,
        required: [true, 'Password is required!']},
phone: { type: String },
address:  { type: String },
role:     { type: String,
    enum: ['client', 'supermarket', 'courier', 'admin'],
    default: 'client'
    }
}, { timestamps: true });

/* Hash password */
userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
})

/* Log-In method */
userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });

    if (user) {
        console.log(user);
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {return user;}
    }
    throw Error('Email or Password incorrect.');
}

const User = mongoose.model('user', userSchema);
module.exports = User;