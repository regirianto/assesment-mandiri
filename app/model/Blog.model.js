const Blog = (id, title, user_id, created_at, updated_at) => {
  return {
    id,
    title,
    user_id,
    created_at,
    updated_at,
  };
};

module.exports = Blog;
