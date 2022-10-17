const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const loanSchema = new mongoose.Schema(
    {
        transaction_id: {},
        amount: { type: Number },
        duration: {
            type: String,
            trim: true,
            // required: true,
            maxlength: 10
        },
        apply_date: { type: String },
        repay_date: { type: String },
        interest_rate: { type: Number },
        loan_state: {
            type: String,
            default: "Not processed",
            enum: ["Not processed", "Processing", "Approved", "Declined"]
        },
        user: {
            type: ObjectId,
            ref: "User"
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model("Loan", loanSchema);