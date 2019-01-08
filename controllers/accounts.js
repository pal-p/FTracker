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
        var accId = req.params.id;
        var userLoggedId = req.user._id;
            Account.findOne({_id: accId,'owner.id': userLoggedId },(err,acc)=>{
                if(err){
                    res.status(500).send({'message':'Error occured while deleting Account'});
                }
              if(acc){
                User.findById(userLoggedId)
        .then((user)=>{
                acc.remove();
                user.accounts.remove(accId);
                user.save();
                res.status(200).send();
            })
        .catch((err)=>{
            res.status(500).send({error:err, message:'User not found'});
        })
              }
              else{
                  res.status(404).send('No Account with Id exists');
              }
            
          });
    },
    chkAccountNameExists: (req,res)=>{
        Account.findOne({name: req.query.acc_name, 'owner.id': req.user._id},(err,acc)=>{
            console.log(req.user._id);
            if(err){
                res.status(500).send({'message':'Error occured during Account name exists check'});
            }
            if(acc){
                res.status(200).send({'acc_exists': 1});
                console.log(acc)
            }
            else{
                res.status(200).send({'acc_exists': 0});
            }
        });
    }

}