const { User } = require("../../models/");

module.exports = async (req, res) => {
  const { id } = req.params;

  try {
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
