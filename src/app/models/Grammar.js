const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Grammar = new Schema(
    {
        title: {type:String, maxlength:256, required: true},
        grammar_content: { type: String, maxlength: 10000, required: true },
        description: { type: String, required: true }
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Grammar', Grammar);
