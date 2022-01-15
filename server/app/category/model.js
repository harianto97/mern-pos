const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const categorySchema = Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 100
    }
}, {timestamps : true});

module.exports = model('categories', categorySchema);