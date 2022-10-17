const { v1: uuidv1 } = require('uuid');
const mongoose = require('mongoose');
const crypto = require('crypto');
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
    {
        first_name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 52
        },
        last_name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 52
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true
        },
        phone_number: {
            type: String,
            trim: true,
            required: true,
            unique: true,
            maxlength: 10
        },
        idNum: {
            type: String,
            trim: true,
            required: true,
            unique: true,
            maxlength: 13
        },
        home_language: {
            type: String,
            trim: true,
            required: true,
            maxlength: 30
        },
        marital_status: {
            type: String,
            trim: true,
            required: true,
            maxlength: 30
        },
        home_status: {
            type: String,
            trim: true,
            required: true,
            maxlength: 30
        },
        dependents: {
            type: String,
            required: true
        },
        hashed_password: {
            type: String,
            required: true
        },
        salt: String,
        role: {
            type: Number,
            default: 0
        },
        loan_history: {
            type: Array,
            default: []
        },
        address: {
            type: ObjectId,
            ref: "Address"
        },
        employment: {
            type: ObjectId,
            ref: "Employment"
        },
        bank: {
            type: ObjectId,
            ref: "Bank"
        },
        finances: {
            type: ObjectId,
            ref: "Finances"
        }
    },
    { timestamps: true }
);

// virtual field
userSchema
    .virtual('password')
    .set(function(password) {
        this._password = password;
        this.salt = uuidv1();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function() {
        return this._password;
    });

userSchema.methods = {
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },

    encryptPassword: function(password) {
        if (!password) return '';
        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        } catch (err) {
            return '';
        }
    }
};

module.exports = mongoose.model('User', userSchema);
