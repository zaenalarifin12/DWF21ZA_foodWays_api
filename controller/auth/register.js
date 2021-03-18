const bcrypt = require("bcrypt");
const { User } = require("../../models");
const Joi = require("joi");

module.exports = async (req, res) => {
  const { email, password, fullName, gender, phone, role } = req.body;

  const schema = Joi.object({
    email: Joi.string().min(5).max(40).required().email(),
    password: Joi.string().min(8).max(40).trim().required(),
    fullName: Joi.string().min(4).max(100).required(),
    gender: Joi.string().min(2).required(),
    phone: Joi.string(),
    role: Joi.string(),
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
      where: { email, email },
    });

    if (user) {
      return res.status(409).json({
        status: "error",
        message: "user already exist",
      });
    }

    const encrypPassword = await bcrypt.hash(password, 10);

    const data = {
      email: email,
      password: encrypPassword,
      fullName: fullName,
      gender: gender,
      phone: phone,
      role: role,
    };

    const createUser = await User.create(data);

    return res.json({
      status: "success",
      data: {
        user: {
          fullName: createUser.fullName,
          token: "ini token",
          role: createUser.role,
        },
      },
    });
  } catch (error) {}
};
