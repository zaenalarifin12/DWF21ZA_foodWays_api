const { Product } = require("../../models");
const { User } = require("../../models");

module.exports = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findOne({
      where: {
        id: productId,
      },
      attributes: ["id", "title", "price", "image"],

      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "fullName", "email", "phone", "location"],
        },
      ],
    });

    if (product == null) {
      return res.status(404).json({
        status: "not found",
        message: "product not found",
      });
    }

    return res.json({
      status: "success",
      data: {
        product: product,
      },
    });
  } catch (error) {}
};
