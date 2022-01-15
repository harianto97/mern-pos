const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const tagsSchema = Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 100
    }
}, {timestamps : true});

module.exports = model('tags', tagsSchema);