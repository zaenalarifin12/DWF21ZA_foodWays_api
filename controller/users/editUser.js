const { User } = require("../../models");
const { userById } = require("../../repositories/user");
const Joi = require("joi");
const bcrypt = require("bcrypt");

module.exports = async (req, res) => {
  try {
    const { password, fullName, phone, location } = req.body;

    const hashStrength = 10;

    let encrypPassword;

    const schema = Joi.object({
      password: Joi.string().min(8).max(40).trim().allow(null),
      fullName: Joi.string().min(4).max(100).required(),
      phone: Joi.string(),
      location: Joi.string().required(),
    });

    const { error } = schema.validate({ password, fullName, phone, location });

    if (error) {
      return res.status(400).json({
        message: "error validation",
        error: {
          message: error.details[0].message,
        },
      });
    }

    const userId = req.userId.id;

    //  image null and password null
    if (req.files.image == undefined && password == undefined) {
      console.log("1================================");

      await User.update(
        {
          fullName: fullName,
          phone: phone,
        },
        {
          where: {
            id: userId,
          },
        }
      );
    }
    //  image null and password exist
    else if (req.files.image == undefined && password != undefined) {
      console.log("2================================");
      encrypPassword = await bcrypt.hash(password, hashStrength);

      await User.update(
        {
          password: encrypPassword,
          fullName: fullName,
          phone: phone,
        },
        {
          where: {
            id: userId,
          },
        }
      );
    }
    //  image exist and password null
    else if (password == undefined && req.files.image != undefined) {
      console.log("3================================");
      const image = req.files.image[0].filename;

      await User.update(
        {
          fullName: fullName,
          phone: phone,
          image: image,
        },
        {
          where: {
            id: userId,
          },
        }
      );
    }
    //  image exist and password exist
    else {
      console.log("4================================");
      const image = req.files.image[0].filename;

      encrypPassword = await bcrypt.hash(password, hashStrength);

      await User.update(
        {
          password: encrypPassword,
          fullName: fullName,
          phone: phone,
          image: image,
          location: location,
        },
        {
          where: {
            id: userId,
          },
        }
      );
    }

    const user = await userById(req, userId);

    return res.json({
      status: "success",
      message: {
        user: user,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
