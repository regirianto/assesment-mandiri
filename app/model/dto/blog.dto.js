const Blog = require("../Blog.model");
const BlogDto = (result, index = 0) => {
  return Blog(
    result.rows[index].id,
    result.rows[index].title,
    result.rows[index].body,
    result.rows[index].img,
    result.rows[index].created_at,
    result.rows[index].updated_at
  );
};

module.exports = BlogDto;
