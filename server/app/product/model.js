const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const productSchema = Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 100
    },
    description : {
        type : String,
        maxlength : 500
    },
    price: {
        type: Number,
        required: true,
        min: 1000,
        max: 100000000,
    },
    image_url : String,
    category:{
        type: Schema.Types.ObjectId,
        ref: 'categories'
        
    },
    tags: {
        type: Schema.Types.ObjectId,
        ref: 'tags'
    },
}, {timestamps : true});

module.exports = model('products', productSchema);
