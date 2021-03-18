const { User } = require("../../models");
const Joi = require("joi");

module.exports = async (req, res) => {
  const { email, password } = req.body;

  const schema = Joi.object({
    email: Joi.string().email().max(40).required(),
    password: Joi.string().min(8).max(40),
  });

  try {
    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: "error validation",
        error: {
          message: error.details[0].message,
        },
      });
    }

    const user = await User.findOne({
      where: { email: email },
      attributes: ["id", "email", "fullName", "gender", "phone", "role"],
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
