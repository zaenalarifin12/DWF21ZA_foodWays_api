const { Product } = require("../../models");
const { User } = require("../../models");
const { productById } = require("../../repositories/product");

module.exports = async (req, res) => {
  try {
    const id = await req.userId.id;
    const image = req.files.image[0].filename;
    
    const newProduct = await Product.create({
      ...req.body,
      image: image,
      userId: id,
    });

    let product = await productById(req, newProduct.id);

    return res.json({
      status: "success",
      data: {
        product: product,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
