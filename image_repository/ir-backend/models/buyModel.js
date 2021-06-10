const mongoose = require('mongoose');
const buySchema = new mongoose.Schema({
    _imageId: { type: mongoose.Types.ObjectId, required: true, ref: 'Image' },
    _buyerAccountId: { type: mongoose.Types.ObjectId, required: true, ref: 'Account' },
    cancellation: { type: Boolean, required: true, default: false },
    transaction: { type: Date, required: true, default: Date.now },
    completion: { type: Date }
});

const Buy = mongoose.model('buy', buySchema);
module.exports = Buy;