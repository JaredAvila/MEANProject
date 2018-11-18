const mongoose = require('mongoose');
const Category = mongoose.model('Category');

module.exports = {
    getAllCategories: (req, res) => {
        Category.find({}, (err, categories) => {
            if (err) {
                console.log(err)
                res.json({status: false, message: "Get All Categories", data: err})
            } else {
                console.log(categories)
                res.json({status: true, message: "Get All Categories", data: categories})
            }
        })
    },
    getCategoryById: (req, res) => {
        Category.find({_id: req.params.id}, (err, category) => {
            if (err) {
                console.log(err)
                res.json({status: false, message: "Get Category By Id", data: err})
            } else {
                console.log(category)
                res.json({status: true, message: "Get Category By Id", data: category})
            }
        })
    },
    createCategory: (req, res) => {
        Category.create(req.body, (err, category) => {
            if (err) {
                console.log(err)
                res.json({status: false, message: "Create Category", data: err})
            } else {
                res.json({status: true, message: "Create Category", data: category})
            }
        })
    },
    updateCategoryById: (req, res) => {
        Category.findOneAndUpdate({_id: req.params.id}, {$set: {name: req.body.name}}, {runValidators: true}, (err, category) => {
            if (err) {
                console.log(err)
                res.json({status: false, message:  "Update Category", data: err})
            } else {
                console.log(category)
                res.json({status: true, message: "Update Category", data: category})
            }
        })
    },
    nukeCategoryById: (req, res) => {
        Category.deleteOne({_id: req.params.id}, (err) => {
            if (err) {
                console.log(err)
                res.json({status: false, message: "Delete Category", data: err})
            } else {
                console.log("Delete")
                res.json({status: true, message: "Delete Category"})
            }
        })
    },
}