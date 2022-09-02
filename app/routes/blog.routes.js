const express = require("express");
const {
  createBlog,
  deleteBlog,
  getAllblog,
  updateBlog,
  getBlogByuser,
} = require("../controller/blog.controller");
const isLogin = require("../middleware/auth.middleware");
const {uploadSingle} = require("../middleware/multer");
const router = express.Router();

router.get("/", isLogin, getAllblog);
router.post("/", isLogin, uploadSingle, createBlog);
router.delete("/:id", isLogin, deleteBlog);
router.put("/:id", isLogin, uploadSingle, updateBlog);
router.get("/user/:id", isLogin, getBlogByuser);

module.exports = router;
