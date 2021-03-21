const { Transaction } = require("../../models");

module.exports = async (req, res) => {
  try {
    const { id } = req.params;

    const oldTransaction = await Transaction.findOne({
      where: {
        id: id,
      },
    });

    if (oldTransaction == null) {
      return res.status(404).json({
        status: "not found",
        message: "transaction not found",
      });
    }

    const transaction = await Transaction.destroy({
      where: {
        id: id,
      },
    });

    return res.json({
      status: "success",
      data: {
        id: 1,
      },
    });
  } catch (error) {}
};
