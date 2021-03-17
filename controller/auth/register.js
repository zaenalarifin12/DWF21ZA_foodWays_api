const bcrypt = require("bcrypt");
const { User } = require("../../models");

module.exports = async (req, res) => {
  const { email, password, fullName, gender, phone, role } = req.body;

  try {
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
          token: "asasas",
          role: createUser.role,
        },
      },
    });
  } catch (error) {}
};
