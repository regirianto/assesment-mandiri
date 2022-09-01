const successResponse = (message, data) => {
  const response = {
    message,
    data,
  };

  return response;
};
const errorResponse = (message, data = null) => {
  const response = {
    message,
    data,
  };

  return response;
};

module.exports = {errorResponse, successResponse};
