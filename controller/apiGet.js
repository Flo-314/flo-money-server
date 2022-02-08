/* eslint-disable no-underscore-dangle */
const e = require('connect-flash');
const User = require('../models/user');

exports.user = async (req, res) => {
  const { _id } = req.body;
  const user = await User.findOne({ _id }).populate({
    path: 'income outcome',
    populate: {
      path: 'payments',
    },
  });

  res.json({ user });
};
