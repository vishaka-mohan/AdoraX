const mongoose = require("mongoose");

const publisherSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  landingUrl: {
    type: String,
    required: true,
  },
  additionalUrl: {
    type: [String],
  },
  tags: {
    type: [String],
  },
  address: {
    type: String,
  },
  adSlots: {
    type: [
      {
        ipfsHash: String,
        contractAddress: String,
      },
    ],
  },
  targetDemographic: {
    type: String,
  },
  targetCountry: {
    type: String,
  },
  basicTags: {
    type: String,
  },
});

module.exports = mongoose.model("Publisher", publisherSchema);
