const mongoose = require('mongoose');

const PurchaseHistorySchema = new mongoose.Schema({
    buyerName: {
        type: String,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    detail: {
        type: String,
        required: true
    },
    purchaseDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('PurchaseHistory', PurchaseHistorySchema);
