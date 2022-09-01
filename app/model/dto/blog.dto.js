const Blog = require("../Blog.model");
const BlogDto = (result, index = 0) => {
  return Blog(
    result.rows[index].id,
    result.rows[index].name,
    result.rows[index].province_id,
    result.rows[index].created_at,
    result.rows[index].updated_at
  );
};

module.exports = BlogDto;
