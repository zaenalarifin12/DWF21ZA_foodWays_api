const { User } = require("../../models");

module.exports = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      where: { email: email },
    });

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "user not found",
      });
    }

    // compare password nya 
    // jika password salah
    

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
