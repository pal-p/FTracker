const mongoose = require("mongoose");
const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Cookies = require("cookies");

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
        user.verifyPassword(password, function(err, isMatch){
          if(err){ //error is password comparison
            status = 500;
            result.status = status;
            result.error = "Invalid email and password";
            res.status(status).send(result);
          }
          //successful comparison hash === password
          if(isMatch){
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
              //send response
            res.status(status).send(result);

          }else{
            status = 401;
            result.status = status;
            result.error = "Invalid email and password";
              //send response
            res.status(status).send(result);

          }
        })

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
      User.findById( req.user._id ).populate("accounts").populate("savings").exec((err, user) => {
        if(err){
          res.status(500).send(err)
        }else{
          let cleanedUser = {
            _id: user._id,
            username: user.username,
            accounts: user.accounts,
            savings: user.savings
          };
          res.render("dashboard", { user: cleanedUser });
        }
      })
    }else{
      res.status(401).send('Unhautorized')
    }
  } 
}
