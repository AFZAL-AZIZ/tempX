const User = require("./../models/userModel");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const JWT_SECRET = "my-ultra-long-and-ultra-secure-finalboss-secret";
const JWT_EXPIRES_IN = "90d";

exports.signup = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
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
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email);

  if (!email || !password) {
    res.status(400).json({
      status: "failed",
      message: "Please provide email and password!",
    });
    return;
  }

  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
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
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: err,
    });
  }
};

exports.protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return res.status(401).json({
            status: "failed",
            message: "You are not logged in!",
        });
    }

    try {
        const decoded = await promisify(jwt.verify)(token, JWT_SECRET);

        const currentUser = await User.findById(decoded.id);
        if (!currentUser) {
            return res.status(401).json({
                status: "failed",
                message: "The user belonging to this token no longer exist.",
            });
        }

        console.log('Success');
        req.user = currentUser;
        next();
    } catch (error) {
        return res.status(400).json({
            status: "failed",
            message: "Invalid token or invalid id!",
        });
    }
};
