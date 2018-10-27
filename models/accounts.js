const Schema = require("mongoose").Schema;

const accountSchema = new Schema({
  name: { type: String, required: true, trim: true },
  total_amount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  owner: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  }
});

module.exports = mongoose.model("Account", accountSchema);
