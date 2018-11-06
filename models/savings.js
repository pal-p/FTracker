const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const savingSchema = new Schema({
  name: { type: String, required: true, unique: true, trim: true },
  total_amount: { type: Number, default: 0 },
  goal: {type: Number, min: 0.01},
  createdAt: { type: Date, default: Date.now },
  asEndingDate: {type: Boolean, required:true, default: false},
  endsOn: Date,
  owner: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  }
});

module.exports = mongoose.model("Saving", savingSchema);
