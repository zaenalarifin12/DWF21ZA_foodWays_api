const { Product } = require("../../models");
const { User } = require("../../models");
const { productFindAll } = require("../../repositories/product");

module.exports = async (req, res) => {
  let products = await productFindAll(req);
  
  return res.json({
    status: "success",
    products: products,
  });
};
