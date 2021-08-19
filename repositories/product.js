const { Product, User } = require("../models");
exports.productById = async (req, id) => {
  let product = null;

  let productFromDb = await Product.findOne({
    where: {
      id: id,
    },
    attributes: ["id", "title", "price", "image"],
    include: [
      {
        model: User,
        as: "user",
        attributes: ["id", "fullName", "email", "phone", "location"],
      },
    ],
  }).then((p) => {
    const url = req.protocol + "://" + req.get("host") + "/uploads/";

    if (p != null) {
      product = {
        id: p.id,
        title: p.title,
        price: p.price,
        image: url + p.image,
        user: {
          id: p.user.id,
          fullName: p.user.id,
          email: p.user.email,
          phone: p.user.phone,
          location: p.user.location,
        },
      };
    }
  });

  return product;
};

exports.productFindAll = async (req) => {
  let products = null;

  const productsFromDB = await Product.findAll({
    attributes: ["id", "title", "price", "image"],
    include: [
      {
        model: User,
        as: "user",
        attributes: ["id", "fullName", "email", "phone"],
      },
    ],
    order: [["createdAt", "DESC"]],
  }).then((product) => {
    const url = req.protocol + "://" + req.get("host") + "/uploads/";

    products = product.map((p) => ({
      id: p.id,
      title: p.title,
      price: p.price,
      image: url + p.image,
      user: {
        id: p.user.id,
        fullName: p.user.fullName,
        email: p.user.email,
        phone: p.user.phone,
      },
    }));
  });

  return products;
};

exports.productFindAllByUserId = async (req, user_id) => {
  let products = null;

  await Product.findAll({
    where: {
      userId: user_id,
    },
    attributes: ["id", "title", "price", "image"],
    order: [["createdAt", "DESC"]],
  }).then((product) => {
    const url = req.protocol + "://" + req.get("host") + "/uploads/";

    products = product.map((p) => ({
      id: p.id,
      title: p.title,
      price: p.price,
      image: url + p.image,
    }));
  });

  return products;
};
