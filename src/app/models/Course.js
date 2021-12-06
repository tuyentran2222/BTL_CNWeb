const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);
const Course = new Schema(
    {
        name: { type: String, maxlength: 255, required: true },
        description: { type: String },
        image: { type: String, maxlength: 255 },
        slug: { type: String, slug: 'name', unique: true }, // vào const Course nhé
        level: { type: String },
        videoId: { type: String, required: true },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Course', Course);
