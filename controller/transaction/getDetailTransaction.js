const db = require("../../models");
const Transaction = db.transaction;

module.exports = async (req, res) => {
  const { id } = req.params;

  const transaction = await Transaction.findOne({
    where: {
      id: id,
    },
  });

  if (transaction == null) {
    return res.json({
      status: "error not found",
      message: "transaction not found",
    });
  }

  return res.json({
    status: "success",
    data: {
      transaction: transaction,
    },
  });
};
