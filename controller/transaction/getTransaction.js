const db = require("../../models");
const Transaction = db.transaction;

module.exports = async (req, res) => {
  const { userId } = req.params;

  const trasactions = await Transaction.findAll({
    where: {
      userId: userId,
    },
  });

  return res.json({
    status: "success",
    data: {
      transaction: trasactions,
    },
  });
};
