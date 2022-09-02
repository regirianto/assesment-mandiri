const db = require("../manager/infra.manager");
const {errorResponse, successResponse} = require("../utils/Response");
const jwt = require("jsonwebtoken");
const {queryBlog} = require("../manager/dbQuery");
const getAllblog = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM blog");
    res.status(200).json(successResponse("Success get all blog", result.rows));
  } catch (error) {
    res.status(500).json(errorResponse(error.message));
  }
};

const createBlog = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader.replace("Bearer ", "");
    const decodeToken = jwt.decode(token);
    const {title, body} = req.body;
    const img = req.file;

    const result = await db.query(
      queryBlog.insertBlog[
        (title,
        body,
        `/images/${img.filename}`,
        decodeToken.id,
        new Date(),
        null)
      ]
    );
    res.status(201).json(successResponse("Success Create Blog", result.rows));
  } catch (error) {
    res.status(500).json(errorResponse(error.message));
  }
};

const deleteBlog = async (req, res) => {
  try {
    const {id} = req.params;
    const getBlogById = await db.query(queryBlog.getBlogByID, [id]);
    const blog = getBlogById.rows[0];
    if (!blog) {
      return res.status(404).json(errorResponse("Blog not found"));
    }
    const authHeader = req.headers.authorization;
    const token = authHeader.replace("Bearer ", "");
    const decodeToken = jwt.decode(token);
    if (blog.user_id != decodeToken.id) {
      return res.status(400).json(errorResponse("Unauthorized"));
    }

    const result = await db.query(queryBlog.deleteBlog, [id]);
    if (result.rowCount == 0)
      return res
        .status(404)
        .json(errorResponse(`Post with ID ${id} not found`));

    res.status(200).json(successResponse(`Success Delete Post`, result.rows));
  } catch (error) {
    res.status(500).json(errorResponse(error.message));
  }
};

const updateBlog = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader.replace("Bearer ", "");
    const decodeToken = jwt.decode(token);
    const {title, body} = req.body;
    const {id} = req.params;
    const img = req.file;

    const getBlogById = await db.query(queryBlog.getBlogByID, [id]);
    const blog = getBlogById.rows[0];
    if (!blog) {
      return res.status(404).json(errorResponse("Blog not found"));
    }
    if (blog.user_id != decodeToken.id) {
      return res.status(400).json(errorResponse("Unauthorized"));
    }

    if (img) {
      const result = await db.query(queryBlog.updateBlogWithImg, [
        title,
        body,
        new Date(),
        `/images/${img.filename}`,
        id,
      ]);
      return res
        .status(201)
        .json(successResponse("Success Upated Blog", result.rows));
    } else {
      const result = await db.query(queryBlog.updateBlogWithoutImg, [
        title,
        body,
        new Date(),
        id,
      ]);
      return res
        .status(201)
        .json(successResponse("Success Upated Blog", result.rows));
    }
  } catch (error) {
    res.status(500).json(errorResponse(error.message));
  }
};

const getBlogByuser = async (req, res) => {
  try {
    const idUser = req.params.id;
    const result = await db.query(
      "SELECT b.title FROM blog AS b JOIN users on b.user_id =$1",
      [idUser]
    );
    return res
      .status(201)
      .json(successResponse("Success Get All Blog", result.rows));
  } catch (error) {
    res.status(500).json(errorResponse(error.message));
  }
};

module.exports = {
  createBlog,
  deleteBlog,
  getAllblog,
  updateBlog,
  getBlogByuser,
};
