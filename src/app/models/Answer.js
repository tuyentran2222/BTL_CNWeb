const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Answer = new Schema(
    {
        content: { type: String, maxlength: 255, required: true },
        question_id: { type: String, required: true },
        lesson_id: { type: String, required: true },
        isTrue: { type: Boolean, required: true },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Answer', Answer);
