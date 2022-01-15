const Users = require('../user/model');
const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config');
const {getToken} = require('../../utils');

const register = async (req, res, next) => {
    try {
        const payload = req.body;
        let user = new Users(payload);
        await user.save();
        return res.json(user);

    } catch (err) {
        if (err && err.name === 'ValidationError') {
            return res.json({
                error: 1,
                message: err.message,
                fields: err.errors
            });
        }
        next(err)
    }
}

const localStrategy = async (email, password, done) => {
    try {
        let user = await Users.findOne({ email }).select(
            "-__v -createdAt -updatedAt -cart_items -token"
        );
        if (!user) return done();
        if (bcrypt.compareSync(password, user.password)) {
            ({ password, ...userWithoutPassword } = user.toJSON());
            return done(null, userWithoutPassword);
        }
    } catch (err) {
        done(err, null);
    }
    done();
};

const login = async (req, res, next) => {
    passport.authenticate("local", async function (err, user) {
        try {
            if (err) return next(err);

            if (!user)
                return res.json({ error: 1, message: "Email or Password incorrect" });

            let signed = jwt.sign(user, config.secretKey);

            await Users.findByIdAndUpdate(user._id, { $push: { token: signed } });

            res.json({
                message: "Login Success",
                user,
                token: signed,
            });
        } catch (err) {
            next(err);
        }
    })(req, res, next);
};

const logout = async (req, res, next) => {
    let token = getToken(req);

    let user = await Users.findOneAndUpdate(
        { token: { $in: [token] } },
        { $pull: { token: token } },
        { useFindAndModify: false }
    );

    if (!token || !user) {
        res.json({
            error: 1,
            message: "No user found!",
        });
    }
    return res.json({
        error: 0,
        message: "Logout berhasil",
    });
};

const me = (req, res, next) => {
    if (!req.user) {
        res.json({
            error: 1,
            message: `You're not login or token expired`,
        });
    }

    res.json(req.user);
};

module.exports = {
    register,
    localStrategy,
    login,
    logout,
    me
}