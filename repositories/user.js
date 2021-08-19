const { User } = require("../models");
exports.userById = async (req, id) => {
  let user = null;

  let userFromDb = await User.findOne({
    where: {
      id: id,
    },
  }).then((u) => {
    const url = req.protocol + "://" + req.get("host") + "/uploads/";

    const checkImage = u.image == null ? u.image : url + u.image;

    user = {
      id: u.id,
      email: u.email,
      fullName: u.fullName,
      phone: u.phone,
      location: u.location,
      image: checkImage,
      role: u.role,
    };
  });

  return user;
};
