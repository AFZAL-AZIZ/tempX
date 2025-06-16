const User = require("./../models/userModel");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "my-ultra-long-and-ultra-secure-finalboss-secret";
const JWT_EXPIRES_IN = "90d";

exports.signup = (req, res) => {
    User.create(req.body)
        .then((newUser) => {
            const token = jwt.sign({ id: newUser._id }, JWT_SECRET, {
                expiresIn: JWT_EXPIRES_IN,
            });
            res.status(201).json({
                status: "success",
                token: token,
                data: {
                    user: newUser,
                },
            });
        })
        .catch((err) => {
            res.status(400).json({
                status: "failed",
                message: err,
            });
        });
};

exports.login = (req, res) => {
    const { email, password } = req.body;
    console.log(email);

    if (!email || !password) {
        res.status(400).json({
            status: "failed",
            message: "Please provide email and password!",
        });
        return; 
    }

    User.findOne({ email })
        .select("+password")
        .then((user) => {
            user.correctPassword(password, user.password).then((correct) => {
                if (!user || !correct) {
                    res.status(401).json({
                        status: "failed",
                        message: "Incorrect email or password",
                    });
                    return;
                }

                const token = jwt.sign({ id: user._id }, JWT_SECRET, {
                    expiresIn: JWT_EXPIRES_IN,
                });

                res.status(200).json({
                    status: "success",
                    token: token,
                });
            });
        });
};
