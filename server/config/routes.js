const users = require('../controllers/users')
const auctions = require('../controllers/auctions')
const categories = require('../controllers/categories')
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
    app.get('/api/categories/:id', (req, res) => {
        categories.getCategoryById(req, res)
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

    app.all("*", (req, res, next) => {
        console.log(__dirname + "../../../public/dist/public/index.html")
        res.sendFile(path.resolve(__dirname + "../../../public/dist/public/index.html"))
    });
}