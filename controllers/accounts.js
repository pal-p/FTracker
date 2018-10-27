const mongoose = require("mongoose");
const Account = require("../models/accounts");
const User = require("../models/users");

module.exports = {
    create: (req, res) => {
        const { name, total_amount } = req.body;
        User.findById(req.user._id)
        .then((user)=>{
            Account.create({name:name, total_amount:total_amount},(err, account)=>{
                if(err){
                    res.status(500).send({error:err, message:'Can\'t create account'});
                }
                account.owner.id = req.user._id;
                account.save()
                user.accounts.push(account)
                user.save();
                res.redirect('/user/' + user._id + '/dashboard');
            })
               })
        .catch((err)=>{
            res.status(500).send({error:err, message:'User not found'});
        })
    const user = new Account({
      name:name,
      total_amount:total_amount
    }); 
    }
}