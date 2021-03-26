const { User } = require("../../models");
const { userById } = require("../../repositories/user");
const Joi = require("joi");
const bcrypt = require("bcrypt");

module.exports = async(req, res) => {
  try {
    const { password, fullName, gender, phone, location } = req.body;

    const schema = Joi.object({
      //   email: Joi.string().min(5).max(40).required().email(),
      password: Joi.string().min(8).max(40).trim().required().allow(null),
      fullName: Joi.string().min(4).max(100).required(),
      gender: Joi.string().min(2).required(),
      phone: Joi.string(),
      role: Joi.string(),
      location: Joi.string().required(),
    });

    const userId = req.userId.id;

    // jika gambarnya kosong 
    // jika passwordnya kosong
    // jika gambar dan password isi
    // jika gambar isi dan password kosong
    // jika gambar kosong dan password isi

    if(req.files.image != "undefined"){
      const image = req.files.image[0].filename;


      const hashStrength = 10;
      const encrypPassword = await bcrypt.hash(password, hashStrength);

      
      const editUser = await User.update(
        {
          password: encrypPassword,
          fullName: fullName,
          gender: gender,
          phone: phone,
          image: image,
        },
        {
          where: {
            id: userId,
          },
        }
      );
    }else{
      const hashStrength = 10;
      const encrypPassword = await bcrypt.hash(password, hashStrength);
      
      const editUser = await User.update(
        {
          password: encrypPassword,
          fullName: fullName,
          gender: gender,
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
    
    // const user = await userById(req, userId);
    
    // return res.json({
    //   status: "success",
    //   message: {
    //     user: user,
    //   },
    // });
  } catch (error) {
    console.log(error);
  }
};
