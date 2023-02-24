const router = require("express").Router();

const User = require("../models/User");

// Reg

router.post("/reg", async (req, res) => {
  try {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

// Login

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({username: req.body.username});
    console.log(req.body)
    !user && res.status(400).json("wrong username or password");

    const validate = await User.findOne({ password: req.body.password });
    !validate && res.status(400).json("Wrong username or password");
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
