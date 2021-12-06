const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema(
    {
        username: {
            type: String,
            maxlength: 255,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            maxlength: 255,
            required: true,
        },
        admin: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('User', User);
