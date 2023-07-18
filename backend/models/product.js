const mongoose = require("mongoose");

//company schema
const ProductSchema = mongoose.Schema({
  pid: {
    type: mongoose.Schema.Types.ObjectId,
  },
  address : {
    type : String
  },

  name: {
    type: String,
  },
  
  description: {
    type: String,
  },

  picture : {
    type : String
  },

  category : {
    type : [String]
  },

  demographic : {
    type : String
  },

  tag_line : {
    type : String
  },
  
  url: {
    type: String,
  },
});

module.exports = mongoose.model("Product", ProductSchema);
