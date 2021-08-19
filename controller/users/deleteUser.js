const { User } = require("../../models/");

module.exports = async (req, res) => {
  

  try {
    const { id } = req.params;
    const user = await User.findOne({
      where: {
        id: id,
      },
    });

    if (user == null) {
      return res.status(404).json({
        status: "not exist",
        message: "user not exists",
      });
    }

    if (id != req.userId.id) {
      return res.status(403).json({
        status: "forbidden",
        message: "forbidden",
      });
    }

    User.destroy({
      where: { id: id },
    });

    return res.json({
      status: "success",
      data: {
        id: id,
      },
    });
  } catch (error) {}
};
