const { User } = require("../../models");

module.exports = async (req, res) => {
  try {
    let users;
    if (req.query.role != undefined) {
      const usersFromDb = await User.findAll({
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
      }).then((user) => {
        const url = req.protocol + "://" + req.get("host") + "/uploads/";

        users = user.map((u) => ({
          id: u.id,
          email: u.email,
          fullName: u.fullName,
          phone: u.phone,
          location: u.location,
          image: url + u.image,
          role: u.role,
        }));
      });

      return res.json({
        status: "success",
        data: {
          users: users,
        },
      });
    }

    const usersFromDb = await User.findAll({
      attributes: [
        "id",
        "email",
        "fullName",
        "phone",
        "location",
        "image",
        "role",
      ],
    }).then((user) => {
      const url = req.protocol + "://" + req.get("host") + "/uploads/";

      users = user.map((u) => ({
        id: u.id,
        email: u.email,
        fullName: u.fullName,
        phone: u.phone,
        location: u.location,
        image: url + u.image,
        role: u.role,
      }));
    });

    return res.json({
      status: "success",
      data: {
        users: users,
      },
    });
  } catch (error) {}
};
