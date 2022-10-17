const Loan = require('../models/loan');
const { errorHandler } = require('../helpers/dbErrorHandler');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');

exports.loanById = (req, res, next, id) => {
    Loan.findById(id).exec((err, loan) => {
        if (err || !loan) {
            return res.status(400).json({
                error: 'ERROR! Loan details not found'
            });
        }
        req.loan = loan;
        next();
    });
};
exports.create = (req, res) => {
    req.body.user = req.profile;
    const loan = new Loan(req.body);
    loan.save((error, data) => {
        if (error) {
            return res.status(400).json({
                error: error
            });
        }
        const emailData = {
            to: "tmponya187@hotmail.com",
            from: "codebahale@gmail.com",
            subject: "New Loan application",
            html: `
                <p>New Loan application received</p>
                <p>Total Amount: ${loan.amount}</p>
                <p>Loan duration: ${loan.duration}</p>
                <p>To be repaid on ${loan.repay_date}</p>
                <a href='https://bahalecodes.co.za/' >Click here to go to dashboard and view further details about the loan</a>
            `
        };
        sgMail.send(emailData)
            .then(() => {
                console.log("Message Sent")
            })
            .catch((error) => {
                console.log(error.response.body)
            });
        res.json(data);
    })
}

exports.listLoans = (req, res) => {
    Loan.find()
        .populate('user', '_id name first_name last_name idNum')
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

exports.getStatusValue = (req, res) => {
    res.json(Loan.schema.path('loan_state').enumValues);
}

exports.updateLoanStatus = (req, res) => {
    const loan = req.loan;
    if (!req.body.loan_state) {
        return res.status(400).json({
            error: "The Loan's state is required!"
        });
    } else {
        loan.loan_state = req.body.loan_state;
    }
    loan.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};