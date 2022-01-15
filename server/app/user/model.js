const mongoose = require('mongoose');
const { model, Schema} = mongoose;
const bcrypt = require('bcrypt');
const AutoIncrement = require('mongoose-sequence')(mongoose);

let userSchema = Schema({
    full_name: {
        type: String,
        required: true,
    },
    customer_id: Number,
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 255,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    token: [String]
}, { timestamps: true });

userSchema.path("email").validate(
    function (value) {
        console.log(`Validasi regex email`);
        const EMAIL_RE = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return EMAIL_RE.test(value);
    }, (attr) => `${attr.value} harus merupakan email yang valid`
);

userSchema.path("email").validate(async function (value) {
    try {
        const count = await this.model("users").count({ email: value });
        return !count;
    } catch (err) {
        throw err;
    }
}, (attr) => `${attr.value} sudah terdaftar`
);

const HASH_ROUND = 10;
userSchema.pre("save", function (next) {
  console.log("Hash password");
  this.password = bcrypt.hashSync(this.password, HASH_ROUND);
  next();
});

userSchema.plugin(AutoIncrement, { inc_field: "customer_id" });

module.exports = model('users', userSchema);