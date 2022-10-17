const Employment = require('../models/employment');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.employmentById = (req, res, next, id) => {
    Employment.findById(id).exec((err, employment) => {
        if (err || !employment) {
            return res.status(400).json({
                error: 'ERROR! Employment details not found'
            });
        }
        req.employment = employment;
        next();
    });
};
exports.create = (req, res) => {
    req.body.user = req.profile;
    const employment = new Employment(req.body);
    employment.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json({ data });
        User.findById(req.profile.id).exec((err, user) => {
            if(err || !user) {
                return res.status(400).json({
                    error: "User not found"
                })
            }
            user.employment = data._id;
        })
    });
};
exports.read = (req, res) => {
    return res.json(req.employment);
};
exports.update = (req, res) => {
    const employment = req.employment;
    if (!employment.emp_status){
        return res.status(400).json({
            error: "Employment status is required!"
        });
    } else {
        employment.emp_status = req.body.emp_status;
    }
    if (!employment.gross_income){
        return res.status(400).json({
            error: "Gross income is required!"
        });
    } else {
        employment.gross_income = req.body.gross_income;
    }
    if (!employment.net_income){
        return res.status(400).json({
            error: "Net income is required!"
        });
    } else {
        employment.net_income = req.body.net_income;
    }
    if (!employment.income_frequency){
        return res.status(400).json({
            error: "Income frequency is required!"
        });
    } else {
        employment.income_frequency = req.body.income_frequency;
    }
    if (!employment.salary_day){
        return res.status(400).json({
            error: "Salary day is required"
        });
    } else {
        employment.salary_day = req.body.salary_day;
    }    
    employment.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: "ERROR! Updating Employment Details Failed."
            });
        }
        res.json(data);
    });
};
exports.list = (req, res) => {
    Employment.find().exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};