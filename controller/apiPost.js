/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
const Category = require('../models/category');
const User = require('../models/user');
const Payment = require('../models/payment');

exports.category = async (req, res) => {
  const { name, _id, target } = req.body;
  // crea nueva categoria
  const newCategory = await new Category({ name });
  await newCategory.save();

  const user = await User.findById({ _id });
  // busca donde poner categoria, income outcome.
  user[target].push(newCategory._id);
  await user.save();
  res.json({ msg: 'category created' });
};

exports.payment = async (req, res) => {
  const { ammount, toFrom, isMonthly, _id } = req.body;
  // crea nueva categoria

  const newPayment = await new Payment({ ammount, toFrom, isMonthly });
  await newPayment.save();

  const user = await Category.findById({ _id });
  // busca donde poner categoria, income outcome.
  user.payments.push(newPayment._id);
  await user.save();
  res.json({ msg: 'category created' });
};
exports.login = async (req, res, next) => {};
