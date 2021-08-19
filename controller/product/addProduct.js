const { Product } = require("../../models");
const { User } = require("../../models");
const { productById } = require("../../repositories/product");
const Joi = require("joi");

module.exports = async (req, res) => {
  try {
    const id = await req.userId.id;

    const { title, price } = req.body;

    const schema = Joi.object({
      title: Joi.string().min(5).max(40).required(),
      price: Joi.number().required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: "validation failed",
        error: {
          message: error.details[0].message,
        },
      });
    }

    const image = req.files.image[0].filename;

    const newProduct = await Product.create({
      title: title,
      price: price,
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
