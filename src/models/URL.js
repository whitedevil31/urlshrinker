const mongoose = require("mongoose");
const short = require("shortid");

const URL = new mongoose.Schema({
  longUrl: { type: String, required: true },
  shortUrls: { type: String, required: true, default: short.generate },
  count: { type: Number, required: true, default: 0 },
});

module.exports = mongoose.model("URL", URL);
