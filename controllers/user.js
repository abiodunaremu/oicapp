const User = require("../models/user");
const Subscriber = require("../models/subscriber");
const altarCall = require("../models/altarcall");

exports.createUser = async (req, res) => {
  if (!req.body.firstName || !req.body.lastName || !req.body.email) {
    return res.status(422).json({
      firstName: "firstname is required"+req.body.firstName,
      lastName: "lastname is required"+req.body.lastName,
      email: "email is required"+req.body.email,
      gender: "gender is required"+req.gender
    });
  }
  const user = new User(req.body);
  User.create(user, function (err, user) {
    if (err) {
      return res.status(403).send(err);
    }
    res.json(user);
    
  });
};

exports.readUser = async (req, res) => {
  User.read(function (err, user) {
    if (err) {
      return res.status(403).send(err);
    }
    res.json(user);
  });
};

exports.updateUser = async (req, res) => {
  const id = req.params.userId;
  User.update(id, new User(req.body), function (err, user) {
    if (err) {
      return res.status(403).send(err);
    }
    res.json(user);
  });
};

exports.deleteUser = async (req, res) => {
  const id = req.params.userId;
  User.delete(id, function (err, user) {
    if (err) {
      return res.status(403).send(err);
    }
    res.json(user);
  });
};

exports.createSubscribers = async (req, res) => {
  if (!req.body.email) {
    return res.status(422).json({
      email: "email is required" + req.body.email
    });
  }
  const subscriber = new Subscriber(req.body);
  Subscriber.create(subscriber, function (err, subscriber) {
    if (err) {
      return res.status(403).send(err);
    }
    res.json(subscriber);
  });
};

exports.createaltarCalls = async (req, res) => {
  if (!req.body.email) {
    return res.status(422).json({
      email: "email is required" + req.body.email
    });
  }
  const altarCall = new altarCall(req.body);
  altarCall.create(altarCall, function (err, altarCall) {
    if (err) {
      return res.status(403).send(err);
    }
    res.json(altarCall);
  });
};
