const express = require("express");
const router = express.Router();

require("dotenv").config({ path: ".env.local" });
//Connecting to Users Schema
User = require("../models/Users");
const bcrypt = require("bcryptjs");

//json web token
const jwt = require("jsonwebtoken");
const secretkey = process.env.JWT_SECRET;

//middleware
const fetchuser = require("../middleware/fetchuser");
const checkrecentlogin = require("../middleware/checkrecentlogin");

const localStorage = require("localStorage");

//Route1: Creating a user using: POST: "api/auth/createuser". Sign up a new user
router.post("/createuser", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // checking whether the user exist or not
    const checkEmail = await User.findOne({ email: email });

    //user exist
    if (checkEmail) {
      res
        .status(400)
        .json({ error: "The user with this email already exist." });
    } else {
      // user does not exists

      //bcrypt is used to securely store our password
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(password, salt);
      //secPass will be a hash value that contains the user's password and salt
      const newuser = await User.create({
        name: name,
        email: email,
        password: secPass,
      });

      const data = {
        newuser: {
          id: newuser.id,
        },
      };
      //creating and returning a json web token of the user created
      const authtoken = jwt.sign(data, secretkey);
      res.json({ authtoken });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Intern Server Error" });
  }
});

//Route2: Authenticate a User using: POST: "api/auth/login". Checking for the right credentials.
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  //checking whether the user has logged in couple of minutes ago
  try {
    //checking whether user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(500)
        .json({ error: "Please try to login with correct credentials" });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res
        .status(500)
        .json({ error: "Please try to login with correct credentials" });
    }

    const data = {
      user: {
        id: user.id,
      },
    };

    //creating and returning a json web token of the user logged in
    const signinToken = jwt.sign(data, secretkey, { expiresIn: 3600 });
    res.json({ authToken: signinToken, user: user });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server errr");
  }
});

//Route 3: Get logged in User Details using: POST "/api/auth/getuser".Login required
//adding a middleware to get user details:fetchuser
router.get("/getuser", fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");

    if (!user) {
      // If user is not found, send a 404 response and return
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server error");
  }
});

module.exports = router;
