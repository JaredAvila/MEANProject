const mongoose = require('mongoose');
const validate = require('mongoose-validator')

module.exports = function() {
    var emailValidator = [
        validate({
            validator: 'matches',
            arguments: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
            message: 'Email is invalid'
        })
    ]

    var bidSchema = new mongoose.Schema({
        bidder_id: { type: String, required: [true, 'Bidder id cannot be blank'] },
        bidder_name: { type: String, required: [true, 'Bidder name cannot be blank'] },
        amount: { type: Number, required: [true, 'Amount cannot be blank'] },
    }, {timestamps: true });

    var auctionSchema = new mongoose.Schema({
        item_name: {type: String, required: [true, 'Title cannot be blank'] },
        description: {type: String, required: [true, 'Description cannot be blank'] },
        image: {type: String, required: [true, 'Please provide an image url'] },
        starting_bid: {type: Number, required: [true, 'Starting bid cannot be blank'] },
        start_date: {type: Date, required: [true, 'Start date cannot be blank'] },
        duration: {type: String, required: [true, 'Duration cannot be blank'] },
        bids: [bidSchema],
    }, {timestamps: true });

    var userSchema = new mongoose.Schema({
        first_name: { type: String, required: [true, 'First name cannot be blank']},
        last_name: { type: String, required: [true, 'Last name cannot be blank']},
        email: {
            type: String,
            trim: true,
            lowercase: true,
            unique: true,
            required: [true, 'Email address is required'],
            validate: emailValidator
        },
        password: { 
            type: String, required: [true, "Password cannot be blank"], minlength: [8, "Password must contain at least 8 characters"]
        },
        wallet_balance: { type: Number },
        auctions_watched: [auctionSchema],
        auctions_created: [auctionSchema],
    }, {timestamps: true });

    var categorySchema = new mongoose.Schema({
        name: { type: String, required: [true, "Category name cannot be blank"] },
        auctions: [auctionSchema],
    })

    mongoose.model('Bid', bidSchema);
    mongoose.model('Category', categorySchema);
    mongoose.model('Auction', auctionSchema);
    mongoose.model('User', userSchema);
}