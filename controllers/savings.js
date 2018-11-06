const mongoose = require("mongoose");
const Saving = require("../models/savings");
const User = require("../models/users");

module.exports = {
    create: (req, res) => {
        User.findById(req.user._id)
        .then((user)=>{
            console.log('User found')
            Saving.create({name:req.body.name, owner:{id:req.user._id}},(err, saving)=>{
                if(err){
                    res.status(500).send({error:err, message:'Can\'t create saving'});
                }
                console.log('saving created')
                console.log(saving)
                user.savings.push(saving)
                saving.save();
                res.redirect('/saving/' + saving._id);
            })
               })
        .catch((err)=>{
            res.status(500).send({error:err, message:'User not found'});
        })
    }, 
    show: (req, res)=>{
        Savings.findById(req.params.id)
        .then((savinh)=>{
            //check if req.user is saving account owner
                if(String(saving.owner.id) === req.user._id){
                console.log('saving owner match')
                res.render('saving', {saving:saving})
            }else{
                res.status(401).send("Unhautorized")
            }
        })
        .catch((err)=>{
            res.status(500).send('Saving not found')
        })
    }
}