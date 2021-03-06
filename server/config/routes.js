const users = require('../controllers/users')
const auctions = require('../controllers/auctions')
const categories = require('../controllers/categories')
const dumdum = require('../config/dummyDataGen')
const bids = require('../controllers/bids')
const path = require('path')

module.exports = function(app) {

    // USER ROUTES
    app.get('/api/users/all', (req, res) => {
        users.getAllUsers(req, res)
    })
    app.get('/api/users/:id', (req, res) => {
        users.getUserById(req, res)
    })
    app.post('/api/users/new', (req, res) => {
        users.createUser(req, res)
    })
    app.put('/api/users/update/wallet', (req, res) => {
        users.updateWalletById(req, res)
    })
    app.put('/api/users/update/:id', (req, res) => {
        users.updateUserById(req, res)
    })
    app.delete('/api/users/delete/:id', (req, res) => {
        users.nukeUserById(req, res)
    })
    app.post('/api/login', (req, res) => {
        users.loginUser(req, res)
    })

    // AUCTION ROUTES
    app.get('/api/auctions/all', (req, res) => {
        auctions.getAllAuctions(req, res)
    })
    app.get('/api/category/auctions/:id', (req, res) => {
        auctions.getAuctionByAuction(req, res)
    })
    app.get('/api/auctions/:id', (req, res) => {
        auctions.getAuctionById(req, res)
    })
    app.post('/api/auctions/new', (req, res) => {
        auctions.createAuction(req, res)
    })
    app.put('/api/auctions/update/:userId/:auctionId', (req, res) => {
        auctions.updateAuctionById(req, res)
    })
    app.delete('/api/auctions/delete/:auctionId', (req, res) => {
        auctions.nukeAuctionById(req, res)
    })

    // CATEGORY ROUTES
    app.get('/api/categories/all', (req, res) => {
        categories.getAllCategories(req, res)
    })
    app.get('/api/categories/:categoryName', (req, res) => {
        categories.getCategoryByName(req, res)
    })
    app.get('/api/categories/name/:auctionId', (req, res) => {
        categories.getCategoryByAuctionId(req, res)
    })
    app.post('/api/categories/new', (req, res) => {
        categories.createCategory(req, res)
    })
    app.put('/api/categories/update/:id', (req, res) => {
        categories.updateCategoryById(req, res)
    })
    app.delete('/api/categories/delete/:id', (req, res) => {
        categories.nukeCategoryById(req, res)
    })

    // Bid Routes
    app.get('/api/bids/all', (req, res) => {
        bids.getAllBids(req, res)
    })
    app.get('/api/bids/auction/:auctionId', (req, res) => {
        bids.getAllBidsByAuctionId(req, res)
    })
    app.get('/api/bids/user', (req, res) => {
        bids.getAllBidsByUserId(req, res) // Bid History
    })
    app.post('/api/bids/new', (req, res) => {
        bids.createBid(req, res)
    })
    app.delete('/api/bids/delete', (req, res) => {
        bids.nukeBidById(req, res)
    })

    // MISC
    app.post('/api/createCategories', (req, res) => {
        categories.defaultCategories(req, res)
    })
    app.get('/dumdum', (req, res) => {
        dumdum(req, res)
    })

    app.all("*", (req, res, next) => {
        console.log(__dirname + "../../../public/dist/public/index.html")
        res.sendFile(path.resolve(__dirname + "../../../public/dist/public/index.html"))
    });
}