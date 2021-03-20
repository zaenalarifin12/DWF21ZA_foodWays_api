const { Product } = require("../../models");

module.exports = async (req, res) => {
  const { userId } = req.params;

  const products = await Product.findAll({
    where: {
      userId: userId,
    },
    attributes: ["id", "title", "price", "image"],
  });

  return res.json({
    status: "success",
    data: {
      products: products,
    },
  });
};
