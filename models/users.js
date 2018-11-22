const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const environment = process.env.NODE_ENV;
const stage = require("../config")[environment.trim()];

// schema maps to a collection
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: "String",
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: "String",
    required: true,
    trim: true
  },
  email: {
    type: "String",
    required: true,
    trim: true
  },
  role: {
    type: String,
    enum: ['Client', 'Admin'],
    default : 'Client'
  }, 
  accounts: [
    {
       type: mongoose.Schema.Types.ObjectId,
       ref: "Account",
    }
]
, 
  savings: [
    {
       type: mongoose.Schema.Types.ObjectId,
       ref: "Saving",
    }
]
});

// encrypt password before save
userSchema.pre("save", function(next) {
  const user = this;
  console.log(user)
  if (!user.isModified || !user.isNew) {
    // don't rehash if it's an old user
    next();
  } else {
    bcrypt.hash(user.password, stage.saltingRounds, function(err, hash) {
      if (err) {
        console.log('error hashing')
        console.log("Error hashing password for user", user.username);
        next(err);
      } else {
        console.log(hash)
        user.password = hash;
                next();
      }
    });
  }
});

userSchema.methods.verifyPassword = function(password, callback){
  bcrypt.compare(password, this.password, (err, isMatch)=>{
    if(err){
      callback(err, null)
    }
    callback(null, isMatch)
  });
  
}

module.exports = mongoose.model("User", userSchema);
