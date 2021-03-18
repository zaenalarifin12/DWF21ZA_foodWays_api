const db = require("../../models");
const Product = db.product;
const User = db.user;

module.exports = async (req, res) => {
  const products = await Product.findAll({
    attributes: ["id", "title", "price"],
    include: [
      {
        model: User,
        as: "user",
        attributes: ["id", "fullName", "email", "phone"],
      },
    ],
  });

  return res.json({
    status: "success",
    products: products,
  });
};
