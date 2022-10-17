const Banking = require('../models/banking');
const User = require('../models/user');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.bankingInfoById = (req, res, next, id) => {
    Banking.findById(id).exec((err, banking) => {
        if (err || !banking) {
            return res.status(400).json({
                error: 'ERROR! Banking details not found'
            });
        }
        req.banking = banking;
        next();
    });
};
exports.create = (req, res) => {
    req.body.user = req.profile;
    const bank = new Banking(req.body);
    bank.save((error, data) => {
        if (error) {
            return res.status(400).json({
                error: error
            });
        }
        res.json(data);
        User.findById(req.profile.id).exec((err, user) => {
            if(err || !user) {
                return res.status(400).json({
                    error: "User not found"
                })
            }
            user.bank = data._id;
        })
    })
};
exports.read = (req, res) => {
    return res.json(req.banking);
};
exports.update = (req, res) => {
    const banking = req.banking;
    if (!banking.bank_name){
        return res.status(400).json({
            error: "Bank Name is required!"
        });
    } else {
        banking.bank_name = req.body.bank_name;
    }
    if (!banking.acc_num){
        return res.status(400).json({
            error: "Account Number is required!"
        });
    } else {
        banking.acc_num = req.body.acc_num;
    }
    if (!banking.acc_type){
        return res.status(400).json({
            error: "Account Type is required!"
        });
    } else {
        banking.acc_type = req.body.acc_type;
    }
    if (!banking.branch_num){
        return res.status(400).json({
            error: "Branch Number is required!"
        });
    } else {
        banking.branch_num = req.body.branch_num;
    }
    if (!banking.acc_holder){
        return res.status(400).json({
            error: "Account Holder's Full Name (Name and Surname) is required!"
        });
    } else {
        banking.acc_holder = req.body.acc_holder;
    }
    banking.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: "ERROR! Updating Banking Details Failed."
            });
        }
        res.json(data);
    });
};
exports.list = (req, res) => {
    Banking.find().exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};
