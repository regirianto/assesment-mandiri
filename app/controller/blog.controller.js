const db = require("../manager/infra.manager");
const {errorResponse, successResponse} = require("../utils/Response");

const createBlog = async (req, res) => {
  try {
    const {title} = req.body;
    const result = await db.query(
      "INSERT INTO blog (title,user_id,created_at,updated_at) VALUES ($1,$2,$3,$4) RETURNING *",
      [title, 1, new Date(), null]
    );
    res.status(201).json(successResponse("Success Create Blog", result.rows));
  } catch (error) {
    res.status(500).json(errorResponse(error.message));
  }
};

const deleteBlog = async (req, res) => {
  try {
    const {id} = req.params;
    const result = await db.query("DELETE FROM blog WHERE id=$1 RETURNING *", [
      id,
    ]);
    if (result.rowCount == 0)
      return res
        .status(404)
        .json(errorResponse(`Post with ID ${id} not found`));

    res.status(200).json(successResponse(`Success Delete Post`, result.rows));
  } catch (error) {
    res.status(500).json(errorResponse(error.message));
  }
};

module.exports = {createBlog, deleteBlog};
