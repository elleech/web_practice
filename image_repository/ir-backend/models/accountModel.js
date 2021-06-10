const mongoose = require('mongoose');
const accountSchema = new mongoose.Schema({
    email: { type: String, required: true, validate: /(^[a-zA-Z][\w\-\.]*[a-zA-Z0-9]+)\@([a-zA-Z0-9][\w\-\.]*[a-zA-Z0-9]+)\.([a-zA-Z0-9]{2,})([\.]+([a-zA-Z]{2,}))*$/, minlength: 8, lowercase: true },
    username: { type: String, required: true, validate: /^[a-zA-Z][\w\-\.\@]*$/, minlength: 3, trim: true },
    passwordHash: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false }
});

const Account = mongoose.model('account', accountSchema);
module.exports = Account;