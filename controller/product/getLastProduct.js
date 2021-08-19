const { Product } = require("../../models");
const { User } = require("../../models");

module.exports = async (req, res) => {
  try {
    const { userId } = req.params;

    let product = null;

    let productFromDb = await Product.findOne({
      attributes: ["id", "title", "price", "image"],
      where: {
        userId: userId,
      },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "fullName", "email", "phone", "location"],
        },
      ],
      order: [["createdAt", "DESC"]],
    }).then((p) => {
      const url = req.protocol + "://" + req.get("host") + "/uploads/";

        if (p != null) {
          product = {
            id: p.id,
            title: p.title,
            price: p.price,
            image: url + p.image,
            user: {
              id: p.user.id,
              fullName: p.user.id,
              email: p.user.email,
              phone: p.user.phone,
              location: p.user.location,
            },
          };
        }
    });

    return res.json({
      status: "success",
      data: {
        product: product,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
