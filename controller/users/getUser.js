const { User } = require("../../models");

module.exports = async (req, res) => {
  
  if (req.query.role != undefined) {
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
      where: {
        role: req.query.role,
      },
    });

    return res.json({
      status: "success",
      data: {
        users: users,
      },
    });
  }



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
