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
      // password: Joi.string().trim(),
      fullName: Joi.string().max(100).required(),
      phone: Joi.string(),
      location: Joi.string().required(),
    });

    const { error } = schema.validate({ fullName, phone, location });

    if (error) {
      return res.status(400).json({
        message: "error validation",
        error: {
          message: error.details[0].message,
        },
      });
    }

    const userId = req.userId.id;

    // console.log("===============");
    // console.log(req.files);
    // console.log(req.files == null);
    // console.log(req.files != null);
    // console.log("===============");
    // console.log(password);
    // console.log(password == null);
    // console.log(password != null);
    // console.log("===============");
    //  image null and password null

    // if (req.files != null && password != null) {
    //   console.log("4================================");
      const newImage = req.files.image[0].filename;

      encrypPassword = await bcrypt.hash(password, hashStrength);

      await User.update(
        {
          password: encrypPassword,
          fullName: fullName,
          phone: phone,
          image: newImage,
          location: location,
        },
        {
          where: {
            id: userId,
          },
        }
      );
    // }
    // //  image null and password exist
    // else if (req.files == null && password != null) {
    //   console.log("2================================");
    //   encrypPassword = await bcrypt.hash(password, hashStrength);

    //   await User.update(
    //     {
    //       password: encrypPassword,
    //       fullName: fullName,
    //       phone: phone,
    //       location: location,
    //     },
    //     {
    //       where: {
    //         id: userId,
    //       },
    //     }
    //   );
    // }
    // // // //  image exist and password null
    // else if (req.files != null && password == null) {
    //   console.log("3================================");

    //   console.log(req.files != null);
    //   console.log(req.files.image);
    //   const newImage = req.files.image[0].filename;

    //   await User.update(
    //     {
    //       fullName: fullName,
    //       phone: phone,
    //       image: newImage,
    //       location: location,
    //     },
    //     {
    //       where: {
    //         id: userId,
    //       },
    //     }
    //   );
    // }
    // // //  image exist and password exist
    // else {
    //   await User.update(
    //     {
    //       fullName: fullName,
    //       phone: phone,
    //       location: location,
    //     },
    //     {
    //       where: {
    //         id: userId,
    //       },
    //     }
    //   );
    // }

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
