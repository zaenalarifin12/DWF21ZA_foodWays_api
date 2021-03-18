const { User } = require("../../models/");

module.exports = async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: {
      id: id,
    },
  });

  if (user) {
    User.destroy({
      where: { id: id },
    });

    return res.json({
      status: "success",
      data: {
        id: id,
      },
    });
  } else {
    return res.status(404).json({
      status: "not exist",
      message: "user not exists",
    });
  }
};
