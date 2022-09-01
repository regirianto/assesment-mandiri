const db = require("../manager/infra.manager");
const UserDto = require("../model/dto/user.dto");
const {successResponse, errorResponse} = require("../utils/Response");

const getAllUsers = async (req, res) => {
  try {
    const result = await db.query("SELECT* FROM users");
    const allUsers = [];
    for (let i = 0; i < result.rows.length; i++) {
      allUsers.push(UserDto(result, i));
    }
    res.status(200).json(successResponse("success", allUsers));
    return result.rows;
  } catch (error) {
    res.status(400).json(errorResponse(error.message));
  }
};

module.exports = getAllUsers;
