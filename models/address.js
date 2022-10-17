const  mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const addressSchema = new mongoose.Schema(
    {
        street: {
            type: String,
            trim: true,
            required: true,
            maxlength: 102
        },
        suburb: {
            type: String,
            required: true,
            maxlength: 52
        },
        city: {
            type: String,
            trim: true,
            required: true,
            maxlength: 52
        },
        province: {
            type: String,
            trim: true,
            required: true,
            maxlength: 52
        },
        postal_code: {
            type: Number,
            trim: true,
            required: true,
            maxlength: 5
        },
        user: {
            type: ObjectId,
            ref: "User"
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Address", addressSchema);