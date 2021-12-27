const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const slug = require('mongoose-slug-generator');
// mongoose.plugin(slug);
const Question = new Schema(
    {
        content: { type: String, maxlength: 255, required: true },
        lesson_id: { type: String, required: true },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Question', Question);
