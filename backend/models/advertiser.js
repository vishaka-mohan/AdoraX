const mongoose = require("mongoose");

//company schema
const AdvertiserSchema = mongoose.Schema({
  aid: {
    type: mongoose.Schema.Types.ObjectId,
  },

  name: {
    type: String,
  },
  
  description: {
    type: String,
  },

  address: {
    type: String,
  },
  
  domain: {
    type: String,
  },
});

module.exports = mongoose.model("Advertiser", AdvertiserSchema);
