const mongoose = require('mongoose');
require('mongoose-type-url');
const imageSchema = new mongoose.Schema({
    _ownerAccountId: { type: mongoose.Types.ObjectId, required: true, ref: 'Account' },
    title: { type: String, required: true },
    imageUrl: { type: mongoose.SchemaTypes.Url, required: true },
    date: { type: Date, required: true, default: Date.now },
    price: { type: Number, required: true },
    stock: { type: Boolean, required: true, default: true },
});

const Image = mongoose.model('image', imageSchema);
module.exports = Image;