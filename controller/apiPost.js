/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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
  res.json({ msg: 'payment created' });
};
exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (user !== null) {
    if (bcrypt.compareSync(password, user.password) === true) {
      const opts = {};
      opts.expiresIn = 1800;
      const secret = process.env.secretkey;
      const token = jwt.sign({ username }, secret, opts);
      return res.status(200).json({
        userId: user._id,
        token,
      });
    }
    return res.status(401);
  }
  return res.status(401).json({ message: 'Auth Failed' });
};

exports.user = async (req, res) => {
  const { _id } = req.body;
  const user = await User.findOne({ _id }).populate({
    path: 'income outcome projections',
    populate: {
      path: 'payments',
    },
  });
  console.log(user, req.body);
  if (user) {
    const data = { incomes: user.income, outcomes: user.outcome, projections: user.projections };
    res.json({ data });
  }
};
