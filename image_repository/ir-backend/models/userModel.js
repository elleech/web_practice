const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    _accountId: { type: mongoose.Types.ObjectId, required: true, ref: 'Account' },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    payment: { type: Number, required: true, default: 0, length: 1, min: 0, max: 1 }, // 0: credit card, 1: paypal
    phone: { type: Number, required: true, validate:/[0-9]{10}/, length: 10 },
    address: { type: String, required: true }
});

const User = mongoose.model('user', userSchema);
module.exports = User;