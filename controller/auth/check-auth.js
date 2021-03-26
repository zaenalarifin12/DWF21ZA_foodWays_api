const { User } = require("../../models");

module.exports = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.userId.id,
      },
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
