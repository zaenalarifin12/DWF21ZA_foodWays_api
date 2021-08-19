
const { userById } = require("../../repositories/user");

module.exports = async (req, res) => {
  try {
    const user = await userById(req, req.params.userId);

    return res.json({
      status: "success",
      data: {
        user: user,
      },
    });
  } catch (error) {}
};
