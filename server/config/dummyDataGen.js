const mongoose = require('mongoose');
const User = mongoose.model('User');
const Category = mongoose.model('Category');
const Auction = mongoose.model('Auction');

const users = require('./dummyData-users')
const cats = require('./dummyData-categories')
// const auctions = require('./dummyData-auctions')

module.exports = function(req, res) {
    User.insertMany(users, (err, docs) => {
        if (err) {
            res.json({status: false, message: "Insert many users", data: err})
        } else {
            User.findOne({email: 'johnd@email.com'}, (err, user) => {
                Auction.insertMany(user['auctions_created'], (err, docs2) => {
                    if (err) {
                        res.json({status: false, message: "Insert many auctions", data: err})
                    } else {
                        // res.json({status: true, message: "Insert many auctions", data: {docs: docs, docs2: docs2}})
                        Category.insertMany(cats, (err, docs3) => {
                            if (err) {
                                res.json({status: false, message: "Insert many categories", data: err})
                            } else {
                                res.json({status: true, message: "Insert many categories", data: {docs: docs, docs2: docs2, docs3: docs3}})
                            }
                        })
                    }
                })
            })
        }
    })
}