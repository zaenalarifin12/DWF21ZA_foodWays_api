const { Product } = require("../../models");
const { User } = require("../../models/");

module.exports = async (req, res) => {
  try {

    const productId = req.params.productId;

    const image = req.files.image[0].filename;

    const oldProduct = await Product.findOne({
      where: {
        id: productId,
      },
    });

    if (oldProduct == null) {
      return res.status.json({
        status: "failed",
        message: "product not found",
      });
    }

    const editProduct = await Product.update(
      {
        title: req.body.title,
        price: req.body.price,
        image: image,
      },
      {
        where: {
          id: oldProduct.id,
        },
      }
    );
    

    const product = await Product.findOne({
      where: {
        id: productId,
      },

      atrributes: ["id", "title", "price", "image"],
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "fullName", "email", "phone", "location"],
        },
      ],
    });

    return res.json({
      status: "success",
      message: {
        product: product,
      },
    });
  } catch (error) {}
};
