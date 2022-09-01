const express = require("express");
const {createBlog, deleteBlog} = require("../controller/blog.controller");
const router = express.Router();

router.post("/", createBlog);
router.delete("/:id", deleteBlog);

module.exports = router;
