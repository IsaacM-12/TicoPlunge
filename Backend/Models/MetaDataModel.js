const mongoose = require("mongoose");

const metadataSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  phone: {
    type: String,
    required: false,
  },
  height: {
    type: Number,
    required: false,
  },
  weight: {
    type: Number,
    required: false,
  },
  birthday: {
    type: Date,
    required: false,
  },
});

const Metadata = mongoose.model("Metadata", metadataSchema);

module.exports = { Metadata };
