const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcryptjs');

module.exports = {
    getAllUsers: (req, res) => {
        User.find({}, (err, users) => {
            if (err) {
                console.log(err)
                res.json({status: false, message: "Get All Users", data: err})
            } else {
                console.log(users)
                res.json({status: true, message: "Get All Users", data: users})
            }
        })
    },
    getUserById: (req, res) => {
        User.find({_id: req.params.id}, (err, user) => {
            if (err) {
                console.log(err)
                res.json({status: false, message: "Get User By Id", data: err})
            } else {
                console.log(user)
                res.json({status: true, message: "Get User By Id", data: user})
            }
        })
    },
    createUser: (req, res) => {
        User.create(req.body, (err, user) => {
            if (err) {
                console.log(err)
                res.json({status: false, message: "Register User", data: err})
            } else {
                bcrypt.hash(req.body.passwordHash, 10, (err, hash) => {
                    user.passwordHash = hash;
                    user.save((err, user) => {
                        if (err) {
                            console.log(err)
                            res.json({status: false, message: "Register User", data: err})
                        } else {
                            console.log(user)
                            res.json({status: true, message: "Register User", data: user})
                        }
                    })
                })
            }
        })
    },
    updateUserById: (req, res) => {
        User.findOne({_id: req.params.id}, {runValidators: true}, (err, user) => {
            
            user.first_name = req.body.first_name;
            user.last_name = req.body.last_name;
            user.email = req.body.email;

            user.save((err, newUser) => {
                if (err) {
                    console.log(err)
                    res.json({status: false, message:  "Update User", data: err})
                } else {
                    console.log(newUser)
                    res.json({status: true, message: "Update User", data: newUser})
                }
            })
        })
    },
    nukeUserById: (req, res) => {
        User.deleteOne({_id: req.params.id}, (err) => {
            if (err) {
                console.log(err)
                res.json({status: false, message: "Delete User", data: err})
            } else {
                console.log("Delete")
                res.json({status: true, message: "Delete User"})
            }
        })
    },

    // others
    loginUser: (req, res) => {
        User.findOne({email: req.body.email}, (err, user) => {
            if (err) {
                console.log(err)
                res.json({status: false, message: "Login User 2", data: err})
            } else {
                bcrypt.compare(req.body.password, user.passwordHash, (err, verified) => {
                    if (verified) {
                        let response = {
                            userId: user._id,
                            firstName: user.first_name
                        }
                        res.json({status: true, message: "Login User 3", data: response});
                    } else {
                        console.log(err)
                        res.json({status: false, message: "Login User 3", data: err})
                    }
                })
            }
        })
    }
}