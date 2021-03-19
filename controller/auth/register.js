require("dotenv").config();

const bcrypt = require("bcrypt");
const { User } = require("../../models");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

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
        message: "validation failed",
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
        status: "register failed",
        message: "email already registered",
      });
    }

    const hashStrength = 10;
    const encrypPassword = await bcrypt.hash(password, hashStrength);

    const data = {
      email: email,
      password: encrypPassword,
      fullName: fullName,
      gender: gender,
      phone: phone,
      role: role,
    };

    const createUser = await User.create(data);

    const { JWT_SECRET } = process.env;

    const token = jwt.sign({ id: createUser.id }, JWT_SECRET);

    return res.json({
      status: "success",
      data: {
        user: {
          fullName: createUser.fullName,
          token: token,
          role: createUser.role,
        },
      },
    });
  } catch (error) {}
};
