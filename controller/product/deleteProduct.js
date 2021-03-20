const { User } = require("../../models");
const { Product } = require("../../models");

module.exports = async (req, res) => {
    
  try {
    const productId = req.params.productId;

    const product = await Product.findOne({
      where: {
        id: productId,
      },
    });

    if (product == null) {
      return res.status(404).json({
        status: "product not found",
        message: "product not found",
      });
    }

    const destroyProduct = await Product.destroy({
      where: {
        id: productId,
      },
    });

    return res.json({
      status: "success",
      data: {
        id: productId,
      },
    });
  } catch (error) {}
};
