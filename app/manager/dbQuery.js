const queryBlog = {
  insertBlog:
    "INSERT INTO blog (title,body,img,user_id,created_at,updated_at) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
  getBlogByID: "SELECT * FROM blog WHERE id=$1 LIMIT 1",
  deleteBlog: "DELETE FROM blog WHERE id=$1 RETURNING *",
  updateBlogWithImg:
    "UPDATE blog SET title=$1 ,body=$2,updated_at=$3 ,img=$4 WHERE id=$5 RETURNING *",
  updateBlogWithoutImg:
    "UPDATE blog SET title=$1 ,body=$2,updated_at=$3 WHERE id=$4 RETURNING *",
};

module.exports = {queryBlog};
