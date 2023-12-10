const mongoose = require("mongoose");

const ContentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String },
  contentType: { type: String, required: true },
  contentUrl: { type: String, required: true },
  tag: { type: String },
  subject: { type: String },
});

module.exports = mongoose.model("Content", ContentSchema);