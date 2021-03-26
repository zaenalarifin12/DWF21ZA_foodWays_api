const { Product } = require("../../models");
const { User } = require("../../models/");
const { productById } = require("../../repositories/product");

module.exports = async (req, res) => {
  try {
    const productId = req.params.productId;

    const image = req.files.image[0].filename;

    const oldProduct = await productById(req, productId)
    

    if (oldProduct == null) {
      return res.status(404).json({
        status: "failed",
        message: "product not found",
      });
    }

    if (oldProduct.user.id != req.userId.id) {
      return res.status(403).json({
        status: "forbidden",
        message: "forbidden",
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

    const product = await productById(req, oldProduct.id);

    return res.json({
      status: "success",
      message: {
        product: product,
      },
    });
  } catch (error) {
    //   console.log(error);
  }
};
