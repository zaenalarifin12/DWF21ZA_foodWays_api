const { User } = require("../../models");

module.exports = async (req, res) => {
  const users = await User.findAll({
    attributes: [
      "id",
      "email",
      "fullName",
      "phone",
      "location",
      "image",
      "role",
    ],
  });

  return res.json({
    status: "success",
    data: {
      users: users,
    },
  });
};
