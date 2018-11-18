const mongoose = require('mongoose');
const User = mongoose.model('User');
const Category = mongoose.model('Category');
const Auction = mongoose.model('Auction');

module.exports = {
    getAllAuctions: (req, res) => {
        Auction.find({}, (err, auctions) => {
            if (err) {
                console.log(err)
                res.json({status: false, message: "Get All Auctions", data: err})
            } else {
                console.log(auctions)
                res.json({status: true, message: "Get All Auctions", data: auctions})
            }
        })
    },
    // get all auctions in a category
    getAuctionByCategory: (req, res) => {
        Category.find({_id: req.params.category_name}, (err, category) => {
            if (err) {
                console.log(err)
                res.json({status: false, message: "Get Auctions By Category", data: err})
            } else {
                console.log(category)
                res.json({status: true, message: "Get Auctions By Category", data: category})
            }
        })
    },
    // get an auction by it id
    getAuctionById: (req, res) => {
        Auction.find({_id: req.params.id}, (err, auction) => {
            if (err) {
                console.log(err)
                res.json({status: false, message: "Get Auction By Id", data: err})
            } else {
                console.log(auction)
                res.json({status: true, message: "Get Auction By Id", data: auction})
            }
        })
    },
    createAuction: (req, res) => {
        // create an auction
        Auction.create(req.body, (err, auction) => {
            if (err) {
                console.log(err)
                res.json({status: false, message: "Create Auction", data: err})
            } else {
                // then add the created auction to the user
                User.findOneAndUpdate({_id: req.params.userId}, {$push: {auctions_created: auction}}, (err) => {
                    if (err) {
                        console.log(err)
                        res.json({status: false, message: "Add Auction to User", data: err})
                    } else {
                        // then add the created aution to a category
                        Category.findOneAndUpdate({name: req.body.category}, {$push: {auctions: auction}}, (err, category) => {
                            if (err) {
                                console.log(err)
                                res.json({status: false, message: "Add Auction to Category", data: err})
                            } else {
                                res.json({status: true, message: "Add Auction to Category", data: auction})
                            }
                        })
                    }
                })
            }
        })
    },
    updateAuctionById: (req, res) => {
        // get the auction from auction collection
        Auction.findOne({_id: req.params.auctionId}, (err, auction) => {
            // dynamically update the fields
            auction.item_name = req.body.item_name;
            auction.description = req.body.description;
            auction.image = req.body.image;
            auction.starting_bid = req.body.starting_bid;
            auction.start_date = req.body.start_date;
            auction.duration = req.body.duration;

            // save the auction with new info
            auction.save((err, newAuction) => {
                if (err) {
                    console.log(err)
                    res.json({status: false, message: "Update Auction", data: err})
                } else {
                    // console.log(newAuction)
                    // update the auction in a user
                    User.findOne({_id: req.params.userId}, (err, user) => {
                        let aucs = user.auctions_created;
                        // find the auction in the array then replace it with newAuction
                        for (var i = 0; i < aucs.length; i++) {
                            if (aucs[i]['_id'] == req.params.auctionId) {
                                aucs[i].item_name = newAuction.item_name;
                                aucs[i].description = newAuction.description;
                                aucs[i].image = newAuction.image;
                                aucs[i].starting_bid = newAuction.starting_bid;
                                aucs[i].start_date = newAuction.start_date;
                                aucs[i].duration = newAuction.duration;
                            }
                        }
                        user.auctions_created = aucs;
                        console.log(user);
                        user.save((err, user) => {
                            if (err) {
                                console.log(err)
                                res.json({status: false, message: "Update Auction in a User", data: err})
                            } else {
                                // res.json({status: true, message: "Update Auction in a User", data: user})
                                // do the same with auciton in a category
                                Category.findOne({name: req.body.category}, (err, category) => {
                                    let aucs = category.auctions;
                                    for (var k = 0; k < aucs.length; k++) {
                                        if (aucs[k]['_id'] == req.params.auctionId) {
                                            aucs[k].item_name = newAuction.item_name;
                                            aucs[k].description = newAuction.description;
                                            aucs[k].image = newAuction.image;
                                            aucs[k].starting_bid = newAuction.starting_bid;
                                            aucs[k].start_date = newAuction.start_date;
                                            aucs[k].duration = newAuction.duration;
                                        }
                                    }
                                    category.auctions = aucs;
                                    category.save((err, category) => {
                                        if (err) {
                                            console.log(err)
                                            res.json({status: false, message: "Update Auction in a Category", data: err})
                                        } else {
                                            res.json({status: true, message: "Update Auction in a Category", data: {user: user, category: category}})
                                        }
                                    })
                                })
                            }
                        })
                    })
                }
            })
        })
    },
    nukeAuctionById: (req, res) => {
        Auction.deleteOne({_id: req.params.auctionId}, (err) => {
            if (err) {
                console.log(err)
                res.json({status: false, message: "Delete Auction", data: err})
            } else {
                console.log("Deleted Auction")
                // delete auction from a user
                User.findOne({_id: req.params.userId}, (err, user) => {
                    let aucs = user.auctions_created;
                    // find the auction in the array then splice
                    for (var i = 0; i < aucs.length; i++) {
                        if (aucs[i]['_id'] == req.params.auctionId) {
                            aucs.splice(i, 1);
                        }
                    }
                    user.auctions_created = aucs;
                    user.save((err, user) => {
                        if (err) {
                            console.log(err)
                            res.json({status: false, message: "Delete Auction in a User", data: err})
                        } else {
                            // do the same with auciton in a category
                            Category.findOne({name: req.params.categoryName}, (err, category) => {
                                let aucs = category.auctions;
                                for (var k = 0; k < aucs.length; k++) {
                                    if (aucs[k]['_id'] == req.params.auctionId) {
                                        aucs.splice(i, 1);
                                    }
                                }
                                category.auctions = aucs;
                                category.save((err, category) => {
                                    if (err) {
                                        console.log(err)
                                        res.json({status: false, message: "Delete Auction in a Category", data: err})
                                    } else {
                                        res.json({status: true, message: "Delete Auction in a Category", data: {user: user, category: category}})
                                    }
                                })
                            })
                        }
                    })
                })
            }
        })
    }
}