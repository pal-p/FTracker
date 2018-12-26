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
    },
    getNew: (req, res)=>{
        res.render('account_create')
    },
    delete: (req,res)=>{
            Account.findOne({_id: req.params.id,'owner.id': req.user._id },(err,acc)=>{
                if(err){
                    res.status(500).send({'message':'Error occured while deleting Account'});
                }
              if(acc){
                acc.remove();
                res.status(200).send();
              }
              else{
                  res.status(404).send('No Account with Id exists');
              }
            
          });
    },
    chkAccountNameExists: (req,res)=>{
        Account.findOne({name: req.query.acc_name},(err,acc)=>{
            if(err){
                res.status(500).send({'message':'Error occured during Account name exists check'});
            }
            if(acc){
                res.status(200).send({'acc_exists': 1});
            }
            else{
                res.status(200).send({'acc_exists': 0});
            }
        });
    }

}