const User = require("../models/userModel");

exports.signup = async (req, res) => {
  const { username, password } = req.body;

  const exitedUser = await User.findOne({ username });
  if (exitedUser) {
    return res.status(400).json({ message: "User already exists" });
  }
  const newUser = new User({
    username,
    password,
  });
  await newUser.save().then((result) => {
    res.status(200).send({ result });
  });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user || user.password !== password) {
    return res.status(404).send({ message: "not valid usernamae or password" });
  }
  req.session.user = username;
  res.status(200).send({ message: "login successfull" });
};

exports.logout = async (req, res) => {
  req.session.destroy();
  res.json({ message: "Logout successful" });
};
