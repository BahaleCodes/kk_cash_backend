const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const employmentSchema = new mongoose.Schema(
    {
        emp_status: {
            type: String,
            trim: true,
            required: true
        },
        gross_income: {
            type: String,
            required: true,
            required: true
        },
        net_income: {
            type: String,
            required: true,
            required: true
        },
        income_frequency: {
            type: String,
            tring: true,
            required: true
        },
        salary_day: {
            type: String,
            required: true,
            trim: true
        },
        work_number: {
            type: String,
            trim: true,
            required: false
        },
        university: {
            type: String,
            required: false,
            trim: true
        },
        academic_year: {
            type: String,
            trim: true,
            required: false
        },
        course_duration: {
            type: String,
            required: false,
            trim: true
        },
        division: {
            type: String,
            required: false,
            trim: true
        },
        service_time: {
            type: String,
            required: false,
            trim: true
        },
        emp_type: {
            type: String,
            trim: true,
            required: false
        },
        employer_name: {
            type: String,
            trim: true,
            required: false
        },
        emp_industry: {
            type: String,
            trim: true,
            required: false
        },
        emp_position: {
            type: String,
            trim: true,
            required: false
        },
        time_with_employer: {
            type: String,
            trim: true,
            required: false
        },
        emp_duration: {
            type: String,
            trim: true,
            required: false
        },
        user: {
            type: ObjectId,
            ref: "User"
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model("Employment", employmentSchema);