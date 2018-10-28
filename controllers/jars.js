const mongoose = require("mongoose");
const Jar = require("../models/jars");
const User = require("../models/users");

module.exports = {
    create: (req, res) => {
        User.findById(req.user._id)
        .then((user)=>{
            console.log('User found')
            Jar.create({name:req.body.name, owner:{id:req.user._id}},(err, jar)=>{
                if(err){
                    res.status(500).send({error:err, message:'Can\'t create jar'});
                }
                console.log('jar created')
                console.log(jar)
                user.jars.push(jar)
                jar.save();
                res.redirect('/jar/' + jar._id);
            })
               })
        .catch((err)=>{
            res.status(500).send({error:err, message:'User not found'});
        })
    }, 
    show: (req, res)=>{
        Jar.findById(req.params.id)
        .then((jar)=>{
            //check if req.user is jar owner
            console.log('jar owner id: ' + jar.owner.id)
            console.log(req.user)
            if(String(jar.owner.id) === req.user._id){
                console.log('jar owner match')
                res.render('jar', {jar:jar})
            }else{
                res.status(401).send("Unhautorized")
            }
        })
        .catch((err)=>{
            res.status(500).send('Jar not found')
        })
    }
}