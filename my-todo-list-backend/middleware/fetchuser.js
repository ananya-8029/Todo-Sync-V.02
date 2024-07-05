require('dotenv').config({ path: '.env.local' });
const jwt = require("jsonwebtoken");
const secretkey = process.env.JWT_SECRET;

const fetchuser = (req, res, next) => {
  try {
  //Get the user from the jwt token and add id to the req object
  const token = req.header('auth-token');
  if (!token) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
    const data = jwt.verify(token, secretkey);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
};

module.exports = fetchuser;