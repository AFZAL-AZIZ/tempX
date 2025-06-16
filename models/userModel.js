const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        select: false,
    },
    passwordConfirm: {
        type: String,
        required: true,
        validate: {
            validator: function (el) {
                return this.password === el;
            },
            message: "Passwords are not the same!",
        },
    },
});

userSchema.pre("save", function (next) {
    if (!this.isModified("password")) return next();

    bcrypt
        .hash(this.password, 12)
        .then((hashedPass) => {
            this.password = hashedPass;
            this.passwordConfirm = undefined;
            next();
        })
        .catch((err) => {
            console.log(err);
            next(err);
        });
});

userSchema.methods.correctPassword = function (
    candidatePassword,
    userPassword
) {
    return bcrypt.compare(candidatePassword, userPassword).then((val) => {
        return val;
    });
};

const User = mongoose.model("User", userSchema);

module.exports = User;
