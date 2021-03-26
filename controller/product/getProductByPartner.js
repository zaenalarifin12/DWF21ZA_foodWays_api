const { Product } = require("../../models");
const { productFindAllByUserId } = require("../../repositories/product");

module.exports = async (req, res) => {
  const { userId } = req.params;

  const products = await productFindAllByUserId(req, userId);

  return res.json({
    status: "success",
    data: {
      products: products,
    },
  });
};
