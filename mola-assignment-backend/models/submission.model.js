const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const submissionAnswer = new Schema({
    varname: {type: String, required: true},
    answered: String
})

const submissionSchema = new Schema({
    answers : {type: [submissionAnswer], required: true},
    submission_date: {type: Date, required: true},
    duration: {type: Number, required: true}
}, {
    timestamps: true
})

const Submission  = mongoose.model('Submission', submissionSchema);

module.exports = Submission;