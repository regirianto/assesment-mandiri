const User = require("../User.model");
const UserDto = (result, index = 0) => {
  return User(
    result.rows[index].id,
    result.rows[index].name,
    result.rows[index].email
  );
};

module.exports = UserDto;
