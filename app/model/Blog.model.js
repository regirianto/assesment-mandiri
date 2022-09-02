const Blog = (id, title, body, img, user_id, created_at, updated_at) => {
  return {
    id,
    title,
    body,
    img,
    user_id,
    created_at,
    updated_at,
  };
};

module.exports = Blog;
