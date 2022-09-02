const jwt = require("jsonwebtoken");
const db = require("../manager/infra.manager");
const bcryptjs = require("bcryptjs");
const dotenv = require("dotenv").config();
const {successResponse, errorResponse} = require("../utils/Response");

const register = async (req, res) => {
  try {
    const {name, email, password} = req.body;
    if (!name || !email || !password) {
      return res.status(400).json(errorResponse("Please fill all fields"));
    }
    const hashPassword = await bcryptjs.hash(password, 10);

    const result = await db.query(
      "INSERT INTO users(name,email,password) VALUES ($1,$2,$3) RETURNING *",
      [name, email, hashPassword]
    );
    res.status(201).json(successResponse("Success Signup", result.rows));
  } catch (error) {
    res.status(500).json(errorResponse(error.message));
  }
};

const signin = async (req, res) => {
  try {
    const {email, password} = req.body;
    const checkEmail = await db.query(
      "SELECT * FROM users WHERE email=$1 LIMIT 1",
      [email]
    );
    if (checkEmail.rowCount == 0) {
      return res.status(404).json(errorResponse("Invalid Account"));
    }
    const hashPassword = checkEmail.rows[0].password;
    const checkPassword = await bcryptjs.compare(password, hashPassword);
    if (checkEmail && !checkPassword) {
      return res.status(201).json(errorResponse("invalid Account"));
    } else {
      const accountVerify = checkEmail.rows[0];
      delete accountVerify.password;
      const jwtSecret = process.env.TOKEN_SECRET;
      const token = jwt.sign(accountVerify, jwtSecret, {
        expiresIn: 60 * 60 * 12,
      });
      res.status(200).json(successResponse("Signin success", token));
    }
  } catch (error) {
    res.status(500).json(errorResponse(error.message));
  }
};

module.exports = {register, signin};
