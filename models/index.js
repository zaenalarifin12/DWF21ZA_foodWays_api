"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.user = require("./user")(sequelize, Sequelize);
db.product = require("./product")(sequelize, Sequelize);
db.order = require("./order")(sequelize, Sequelize);
db.transaction = require("./transaction")(sequelize, Sequelize);

db.user.hasMany(db.product, {
  foreignKey: "userId",
  as: "products",
});

db.product.belongsTo(db.user, {
  foreignKey: "userId",
  as: "user",
});
/////////////////////////////////////////////
db.product.hasMany(db.order, {
  foreignKey: "productId",
  as: "products",
});

db.order.belongsTo(db.product, {
  foreignKey: "productId",
  as: "products",
});
//////////////////////////////////////////////
db.user.hasMany(db.transaction, {
  foreignKey: "userId",
  as: "users",
});

db.transaction.belongsTo(db.user, {
  foreignKey: "userId",
  as: "users",
});

db.transaction.hasMany(db.order, {
  foreignKey: "transactionId",
  as: "transactions",
});

db.order.belongsTo(db.transaction, {
  foreignKey: "transactionId",
  as: "transactions",
});

module.exports = db;
