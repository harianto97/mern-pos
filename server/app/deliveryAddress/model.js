const mongoose = require('mongoose');
const {model, Schema} = mongoose;

const deliveryAddressSchema = Schema ({
    name: {
        type: String,
        required: true
    },
    kelurahan: {
        type: String,
        required: true,
    },
    kecamatan: {
        type: String,
        required: true
    },
    kabupaten: {
        type: String,
        required: true
    },
    provinsi: {
        type: String,
        required: true
    },
    detail: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
}, {timestamps: true});

module.exports = model('deliveryAddress', deliveryAddressSchema);
