const mongoose = require('mongoose');
const Bid = mongoose.model('Bid');
const User = mongoose.model('User');
const Auction = mongoose.model('Auction');

module.exports = {
    getAllBids: (req, res) => {
        Bid.find({}, (err, bids) => {
            if (err) {
                console.log(err)
                res.json({status: false, message: "Get All Bids", data: err})
            } else {
                console.log(bids)
                res.json({status: true, message: "Get All Bids", data: bids})
            }
        })
    },
    getAllBidsByAuctionId: (req, res) => {
        Auction.find({_id: req.params.auctionId}, 'bids', (err, bid) => {
            if (err) {
                console.log(err)
                res.json({status: false, message: "Get Bid By Auction Id", data: err})
            } else {
                console.log(bid)
                res.json({status: true, message: "Get Bid By Auction Id", data: bid})
            }
        })
    },
    getAllBidsByUserId: (req, res) => {
        Bid.find(
            { "bidder_id": req.body.userId }, 
            (err, bids) => {
                if (err) {
                    console.log(err)
                    res.json({status: false, message: "Get Bid By User Id", data: err})
                } else {
                    console.log(bids)
                    res.json({status: true, message: "Get Bid By User Id", data: bids})
                }
            }
        )
    },
    createBid: (req, res) => {
        console.log("==========", req.body);
        Bid.create(req.body, (err, bid) => {
            if (err) {
                console.log(err);
                res.json({status: false, message: "Create Bid", data: err})
            } else {
                Auction.findOneAndUpdate(
                    { _id: req.body.auction_id },
                    { $push: {bids: req.body} },
                    (err, auction) => {
                        if (err) {
                            console.log(err)
                            res.json({status: false, message: "Create Bid on Auction", data: err})
                        } else {
                            res.json({status: true, message: "Create Bid on Auction", data: {bid: bid, auction: auction} })
                        }
                    }
                )
            }
        })
    },
    nukeBidById: (req, res) => {
        Bid.deleteOne({ _id: req.body.bidId }, (err) => {
            if (err) {
                console.log(err)
                res.json({status: false, message: "Delete Bid", data: err})
            } else {
                console.log("Delete")
                Auction.deleteOne({ "bids._id": req.body.bidId }, (err) => {
                    if (err) {
                        res.json({status: false, message: "Delete Bid", data: err})
                    } else {
                        res.json({status: true, message: "Delete Bid"})
                    }
                })
            }
        })
    },
}