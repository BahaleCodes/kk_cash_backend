const Finances = require('../models/finances');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.financesById = (req, res, next, id) => {
    Finances.findById(id).exec((err, finances) => {
        if (err || !finances) {
            return res.status(400).json({
                error: 'ERROR! financial details not found'
            });
        }
        req.finances = finances;
        next();
    });
};
exports.create = (req, res) => {
    req.body.user = req.profile;
    const finances = new Finances(req.body);
    finances.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
        User.findById(req.profile.id).exec((err, user) => {
            if(err || !user) {
                return res.status(400).json({
                    error: "User not found"
                })
            }
            user.finances = data._id;
        })
    });
};
exports.read = (req, res) => {
    return res.json(req.finances);
};
exports.update = (req, res) => {
    const finances = req.finances;
    if (!finances.monthly_rates){
        return res.status(400).json({
            error: "Monthly rates is required!"
        });
    } else {
        finances.monthly_rates = req.body.monthly_rates;
    }
    if (!finances.groceries){
        return res.status(400).json({
            error: "Amount spent on groceries is required!"
        });
    } else {
        finances.groceries = req.body.groceries;
    }
    if (!finances.commuting_costs){
        return res.status(400).json({
            error: "Commuting costs is required!"
        });
    } else {
        finances.commuting_costs = req.body.commuting_costs;
    }
    if (!finances.loan_repayments){
        return res.status(400).json({
            error: "Loan Repayments are required!"
        });
    } else {
        finances.loan_repayments = req.body.loan_repayments;
    }
    if (!finances.child_maintenance){
        return res.status(400).json({
            error: "Child Maintenance costs are required!"
        });
    } else {
        finances.child_maintenance = req.body.child_maintenance;
    }
    if (!finances.desp_income){
        return res.status(400).json({
            error: "Amount of money left after all your expenses is required"
        });
    } else {
        finances.desp_income = req.body.desp_income;
    }
    finances.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: `ERROR! Updating Financial Details Failed.${err}`
            });
        }
        res.json(data);
    });
};
exports.list = (req, res) => {
    Finances.find().exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};