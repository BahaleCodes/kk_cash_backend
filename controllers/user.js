const User = require('../models/user');
const { errorHandler } = require('../helpers/dbErrorHandler');
const Loan = require('../models/loan');
const Address = require('../models/address');
const banking = require('../models/banking');
const employment = require('../models/employment');
const finances = require('../models/finances');

exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }
        req.profile = user;
        next();
    });
};
exports.read = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
};
exports.update = (req, res) => {
    const { first_name, last_name, email, phone_number, idNum, home_language, home_status, marital_status, dependents, address, employment, bank, finances } = req.body;
    User.findOne({ _id: req.profile._id }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }
        if (first_name) {
            user.first_name = first_name;
        }
        if (last_name) {
            user.last_name = last_name;
        }
        if (phone_number) {
            user.phone_number = phone_number;
        }
        if (email){
            user.email = email;
        }
        if (idNum){
            user.idNum = idNum;
        }
        if (home_language) {
            user.home_language = home_language
        }
        if (marital_status) {
            user.marital_status = marital_status
        }
        if (home_status) {
            user.home_status = home_status
        }
        if (dependents) {
            user.dependents = dependents
        }
        if (address) {
            user.address = address
        }
        if (employment) {
            user.employment = employment
        }
        if (bank) {
            user.bank = bank
        }
        if (finances) {
            user.finances = finances
        }
        user.save((err, updatedUser) => {
            if (err) {
                console.log('USER UPDATE ERROR', err);
                return res.status(400).json({
                    error: 'User update failed'
                });
            }
            updatedUser.hashed_password = undefined;
            updatedUser.salt = undefined;
            res.json(updatedUser);
        });
    });
};
exports.listUsers = (req, res) => {
    User.find().exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};
exports.addLoanToUserHistory = (req, res, next) => {
    let loan_history = [];
    loan_history.push(req.body);
    User.findOneAndUpdate({ _id: req.profile._id }, { $push: { loan_history: loan_history } }, { new: true }, (error, data) => {
        if (error) {
            return res.status(400).json({
                error: 'Could not update user purchase history'
            });
        }
        next();
    });
};
exports.addBankingToUserHistory = (req, res, next) => {
    let userBank = [];
    userBank.push(req.body);
    User.findOneAndUpdate({ _id: req.profile._id }, { $push: { userBank: userBank } }, { new: true }, (error, data) => {
        if (error) {
            return res.status(400).json({
                error: 'Could not update user purchase history'
            });
        }
        next();
    });
};
exports.addEmpToUserHistory = (req, res, next) => {
    let userEmp = [];
    userEmp.push(req.body);
    User.findOneAndUpdate({ _id: req.profile._id }, { $push: { userEmp: userEmp } }, { new: true }, (error, data) => {
        if (error) {
            return res.status(400).json({
                error: 'Could not update user purchase history'
            });
        }
        next();
    });
};
exports.addFInancesToUserHistory = (req, res, next) => {
    let userFinances = [];
    userFinances.push(req.body);
    User.findOneAndUpdate({ _id: req.profile._id }, { $push: { userFinances: userFinances } }, { new: true }, (error, data) => {
        if (error) {
            return res.status(400).json({
                error: 'Could not update user purchase history'
            });
        }
        next();
    });
};
exports.addAddressToUserAddress = (req, res, next) => {
    let address = null;
    address = req.body
    User.findOneAndUpdate({ _id: req.profile._id }, { address: address },  { new: true }, (error, data) => {
        if (error) {
            return res.status(400).json({
                error: 'Could not attach address id'
            });
        }
    })
    next();
};
exports.addAddressId = (req, res, next) => {
    let addressId = null;
    addressId = req.body._id;
    User.findOneAndUpdate(
        { _id: req.profile._id},
        { $push: {address: addressId }},
        { new: true },
        (error, data) => {
            if (error) {
                return res.status(400).json({
                    error: 'Could not attach addressId to user'
                });
            }
            next();
        }
    )
};
exports.loansHistory = (req, res) => {
    Loan.find({ user: req.profile._id })
        .populate('user', '_id first_name last_name')
        .sort('-created')
        .exec((err, loans) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(loans);
        });
};
exports.addressByUser = (req, res) => {
    Address.find({ user: req.profile._id })
        .populate('user', '_id first_name last_name')
        .sort('-created')
        .exec((err, address) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(address);
        });
};
exports.bankByUser = (req, res) => {
    banking.find({ user: req.profile._id })
        .populate('user', '_id first_name last_name')
        .sort('-created')
        .exec((err, bank) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(bank);
        });
};
exports.empByUser = (req, res) => {
    employment.find({ user: req.profile._id })
        .populate('user', '_id first_name last_name')
        .sort('-created')
        .exec((err, bank) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(bank);
        });
};
exports.financesByUser = (req, res) => {
    finances.find({ user: req.profile._id })
        .populate('user', '_id first_name last_name idNum')
        .sort('-created')
        .exec((err, bank) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(bank);
        });
};