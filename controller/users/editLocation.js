const { User } = require("../../models");
const { userById } = require("../../repositories/user");

module.exports = async (req, res) => {
  try {
    const { location } = req.body;

    const userId = req.userId.id;

    const editUser = await User.update(
      {
        location: location,
      },
      {
        where: {
          id: userId,
        },
      }
    );

    const user = await userById(req, userId);

    return res.json({
      status: "success",
      data: {
        user: user,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
