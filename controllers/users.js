const mongoose = require("mongoose");
const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Cookies = require("cookies");
const connUri = process.env.MONGO_LOCAL_CONN_URL;
module.exports = {
  add: (req, res) => {
    let result = {};
    let status = 201;
    const { username, email, password } = req.body;
    const user = new User({
      username: username,
      email: email,
      password: password
    }); 
    user.save((err, user) => {
      if (!err) {
        result.status = status;
        result.result = user;
      } else {
        status = 500;
        result.status = status;
        result.error = err;
      }
      res.status(status).send(result);
    });
  },
  login: (req, res) => {
    const { email, password } = req.body;
    let result = {};
    let status = 200;
    User.findOne({ email }, (err, user) => {
      if (!err && user) {
              bcrypt          //TODO we could compare passwords inside user model
          .compare(password, user.password)
          .then(match => {
            if (match) {
              status = 200;
              // Create a token
              const payload = {
                user: {
                  _id: user._id,
                  username: user.username,
                  role: user.role
                }
              };
              const options = {
                expiresIn: "1d",
                issuer: "https://mywebsite.com"
              };
              const secret = process.env.JWT_SECRET;
              const token = jwt.sign(payload, secret, options);
              new Cookies(req, res).set("access_token", token, {
                httpOnly: true,
                secure: false
              });
              result.token = token;
              result.status = status;
              result.result = user;
            } else {
              status = 401;
              result.status = status;
              result.error = `Authentication error`;
            }
            res.redirect("/user/" + user._id + "/dashboard");
          })
          .catch(err => {
            status = 500;
            result.status = status;
            result.error = err;
            res.status(status).send(result);
          });
      } else {
        status = 404;
        result.status = status;
        result.error = err;
        res.status(status).send(result);
      }
    });
  },
  getDashboard: (req, res) => {
    if (req.user._id === req.params.id) {
      User.findById({ _id: req.user._id }, (err, user) => {
        cleanedUser = {
          _id: user._id,
          username: user.username,
          accounts: user.accounts
        };
        res.render("dashboard", { user: cleanedUser });
      });
    } else {
      res.status(500).send("Error no user Id");
    }
  }
};
