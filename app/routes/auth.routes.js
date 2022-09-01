const express = require("express");
const {register, signin} = require("../controller/auth.controller");

const router = express.Router();

router.post("/signup", register);
router.post("/signin", signin);

module.exports = router;
