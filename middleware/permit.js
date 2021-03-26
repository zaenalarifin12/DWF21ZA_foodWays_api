const { User } = require("../models");

exports.permit = (role) => {
  return async (req, res, next) => {
    try {
      const  user  = await User.findOne({
        where: {
          id: req.userId.id,
        },
      });

      if (user && user.role == role) {
        next();
      } else {
        return res.status(403).json({
          message: "Forbidden",
        });
      }
    } catch (error) {
      // return res.status(403).json({
      //     message: "Forbidden",
      //   });
    }
  };
};
