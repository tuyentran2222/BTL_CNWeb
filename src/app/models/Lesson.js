const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);
const Lesson = new Schema(
    {
        name: { type: String, maxlength: 255, required: true },
        course_id: { type: String, required: true },
        transcription: { type: String },
        imageUrl: { type: String },
        type: { type: String },
        slug: { type: String, slug: 'name', unique: true }, // vào const Lesson nhé
        contentId: { type: String, required: true },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Lesson', Lesson);
