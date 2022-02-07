const dotenv = require('dotenv');

dotenv.config();

const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const User = require('../models/user');

const strategy = new LocalStrategy((username, password, done) => {
  User.findOne({ username }, (err, user) => {
    if (err) {
      return done(err);
    }

    if (!user) {
      return done(null, false, { message: 'Incorrect username' });
    }

    bcrypt.compare(password, user.password, function (errr, res) {
      if (errr) {
        done(errr);
      }
      if (res !== false) {
        return done(null, user);
      }
      return done(null, false, { message: 'Incorrect password' });
    });
    return done(err);
  });
});

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.secretkey;

const jwtStrategry = new JwtStrategy(opts, (jwtPayload, done) => {
  User.findOne({ username: jwtPayload.username }, function (err, user) {
    if (err) {
      return done(err, false);
    }
    if (user) {
      return done(null, user);
    }
    return done(null, false);
    // or you could create a new account
  });
});

const serializeUser = (user, done) => {
  done(null, user.id);
};
const deserializeUser = (id, done) => {
  User.findById(id, function (err, user) {
    done(err, user);
  });
};

exports.jwtStrategry = jwtStrategry;
exports.strategy = strategy;
exports.deserializeUser = deserializeUser;
exports.serializeUser = serializeUser;
