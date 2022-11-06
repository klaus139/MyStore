const mongoose = require('mongoose');
const moment = require('moment');
const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    createdAt: {
        type: String,
        required: true,
        default: moment().format("DD MM YYYY")
    },
    details: [{
        book: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book"
        },
        quantity: {
            type: Number,
            required: true
        }

    }],
    amount: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Order", orderSchema);