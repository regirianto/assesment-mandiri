const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");
const {errorResponse} = require("../utils/Response");

const isLogin = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const TOKEN_SECRET = process.env.TOKEN_SECRET;
    if (!token) {
      return res.status(400).json(errorResponse("Please Login"));
    }
    const jwtToken = token.replace("Bearer ", "");
    jwt.verify(jwtToken, TOKEN_SECRET);

    next();
  } catch (error) {
    res.status(500).json(errorResponse(error.message));
  }
};

module.exports = isLogin;
