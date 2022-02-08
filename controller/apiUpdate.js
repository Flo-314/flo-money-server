const Category = require('../models/category');
const Payment = require('../models/payment');

exports.category = async (req, res) => {
  const { name, _id } = req.body;
  const category = await Category.findById({ _id });
  category.name = name;
  await category.save();
  res.json({ msg: 'category name edited' });
};
exports.payment = async (req, res) => {
  const { ammount, toFrom, isMonthly, _id } = req.body;
  let payment = await Payment.findById({ _id });
  payment = { ammount, toFrom, isMonthly };
  await payment.save();
  res.json({ msg: 'payment name edited' });
};
