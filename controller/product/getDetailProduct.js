const { Product } = require("../../models");
const { User } = require("../../models");
const { productById } = require("../../repositories/product");

module.exports = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await productById(req, productId);

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
