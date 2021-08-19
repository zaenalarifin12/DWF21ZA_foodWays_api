const { Product } = require("../../models");
const { User } = require("../../models");

module.exports = async (req, res) => {
  try {
    let products;
    const productsFromDB = await Product.findAll({
      attributes: ["id", "title", "price", "image"],
        where: { userId: req.userId.id },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "fullName", "email", "phone"],
        },
      ],
      order: [["createdAt", "DESC"]],
    }).then((product) => {
      const url = req.protocol + "://" + req.get("host") + "/uploads/";

      products = product.map((p) => ({
        id: p.id,
        title: p.title,
        price: p.price,
        image: url + p.image,
      }));
    });

    return res.json({
      status: "success",
      data: {
        products: products,
      },
    });
  } catch (error) {}
};
