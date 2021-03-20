const { Product } = require("../../models");
const { User } = require("../../models");

module.exports = async (req, res) => {
  


  try {
    const id = await req.userId.id;
    const image = req.files.image[0].filename;

    const newProduct = await Product.create({
      ...req.body,
      image: image,
      userId: id,
    });

    const product = await Product.findOne({
      where: {
        id: newProduct.id,
      },
      attributes: ["id", "title", "price", "image"],
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
      data: {
        product: product,
      },
    });
  } catch (error) {}
};
