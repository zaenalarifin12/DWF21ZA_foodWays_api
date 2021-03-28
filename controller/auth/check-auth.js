const { User } = require("../../models");

module.exports = async (req, res) => {
  try {
    let user;
    const userFromDb = await User.findOne({
      where: {
        id: req.userId.id,
      },
    }).then((u) => {
      const url = req.protocol + "://" + req.get("host") + "/uploads/";

      user = {
        id: u.id,
        email: u.email,
        fullName: u.fullName,
        phone: u.phone,
        location: u.location,
        image: url + u.image,
        role: u.role,
      };
    });

    if (user == null) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    return res.json({
      status: "success",
      message: "user valid",
      data: {
        user: user,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "server error",
    });
  }
};
