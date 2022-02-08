const Category = require('../models/category');
const User = require('../models/user');
const Payment = require('../models/payment');

exports.category = async (req, res, next) => {
  const { name, _id, target } = req.body;
  const newCategory = await new Category({ name });
  await newCategory.save();
  const user = await User.findById({ _id });
  user[target].push(newCategory._id);
  console.log(user);
  await user.save();
  res.json({ msg: 'category created' });
};
exports.payment = async (req, res, next) => {};
exports.login = async (req, res, next) => {};
