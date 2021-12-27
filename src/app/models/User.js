const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema(
    {
        email: {
            type: String,
            maxlength: 255,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            minlength: 6,
            maxlength: 255,
            required: true,
        },
        admin: {
            type: Boolean,
            default: false,
        },
        name: {
            type: String,
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('User', User);
