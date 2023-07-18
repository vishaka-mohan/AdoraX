const MongoClient = require("mongodb").MongoClient;
const mongoose = require("mongoose");
const Advertiser = require("../models/advertiser");
const Product = require("../models/product");
const Publisher = require("../models/publisher");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
const cloud_name = process.env.CLOUD_NAME;
const cloud_api_key = process.env.CLOUD_API_KEY;
const cloud_api_secret = process.env.CLOUD_API_SECRET;
const Blob = require("node-blob");
//const ethers = require("ethers");
//const PK = process.env.ADMIN_PK;
const axios = require("axios");
const comparisonEndpoint = process.env.NLP_SERVICE + "/compare";
var currProd
//const Pkey = `0x${PK}`;
//const signer = new ethers.Wallet(Pkey);
//const PushAPI = require("@pushprotocol/restapi");
cloudinary.config({
  cloud_name: cloud_name,
  api_key: cloud_api_key,
  api_secret: cloud_api_secret,
});

const { Web3Storage } = require("web3.storage");
const client = new Web3Storage({ token: process.env.API_KEY });
var FileAPI = require("file-api"),
  File = FileAPI.File,
  FileList = FileAPI.FileList,
  FileReader = FileAPI.FileReader;
  function compare( a, b ) {
    if ( a.score < b.score ){
      return 1;
    }
    if ( a.score > b.score ){
      return -1;
    }
    return 0;
  }

const advertiserRegister = async (req, res) => {
  console.log("hello");
  console.log(req.body);

  Advertiser.find({ address: req.body.address })
    .then(async (foundAdvertiser) => {
      console.log("here");
      if (foundAdvertiser.length == 0) {
        console.log("heree");
        const aid = new mongoose.Types.ObjectId();

        const advertiserObj = {
          aid: aid,
          name: req.body.name,
          description: req.body.description,
          address: req.body.address,
          domain: req.body.domain,
        };
        console.log("printing advertiser obj");
        console.log(advertiserObj);
        const advertiserEntity = new Advertiser(advertiserObj);
        advertiserEntity.save().then((newAdvertiser) => {
          console.log(
            `Registered ${newAdvertiser.aid} : ${newAdvertiser.name}`
          );
          res.json({
            status: "successful",
            message: `registered succesfully`,
          });
        });
      } else {
        console.log("hererere");
        res.json({
          status: "error",
          error: "address already exists",
        });
      }
    })
    .catch((err) => {
      res.json(err);
    });
};

const logout = (req, res) => {
  console.log(req.cookies);
  if (req.cookies.authToken) {
    res.clearCookie("authToken");
    res.json({ status: "success", msg: "Logout successful" });
  } else {
    res.json({ status: "error", mag: "Unable to log out" });
  }
};

const advertiserLogin = async (req, res) => {
  //login with name and password

  const address = req.body.address;
  console.log(req.body);
  Advertiser.find({ address: address })
    .then(async (foundAdvertiser) => {
      console.log("found");
      if (foundAdvertiser.length == 1) {
        const token = jwt.sign(
          {
            aid: foundAdvertiser[0].aid,
            name: foundAdvertiser[0].name,
            domain: foundAdvertiser[0].domain,
            address: req.body.address,
            isAdvertiser: true,
            isPublisher: false,
          },
          process.env.JWT_KEY,
          {
            expiresIn: "1h",
          }
        );
        console.log(token);

        res.cookie("authToken", token);
        res.json({
          status: "authenticated",
          token: token,
        });
      } else {
        res.clearCookie("authToken");
        return res.json({ status: "error", error: "Invalid user" });
      }
    })
    .catch((err) => {
      res.json(err);
    });
};

const addNewProduct = async (req, res) => {
  const pid = new mongoose.Types.ObjectId();
  console.log(req.body);
  console.log(req.file);
  var array = req.body.category.split(",");
  const result = await cloudinary.uploader.upload(req.file.path);
  console.log(result);

  var allProds = await Product.find({ address: req.body.address[0] });
  var compName = await Advertiser.find({ address: req.body.address[0]})
  console.log(allProds);

  const productObj = {
    pid: pid,
    name: req.body.name,
    description: req.body.description,
    address: req.body.address[0],
    picture: result.url,
    //picture : "https://res.cloudinary.com/dpsmilpng/image/upload/v1669211155/lipstick_cafvk3.jpg",
    category: array,
    demographic: req.body.demographic,
    tag_line: req.body.tag_line,
    url: req.body.url,
  };
  let newProduct = new Product(productObj);
  await newProduct.save();

  res.json({
    name: compName[0].name,
    allProds: allProds,
    message: "succesfully posted",
  });
};

const viewMarketplace = async (req, res) => {
  //display all publisher spaces
  console.log(req.query)
  
  currProd = req.query.prod
  console.log(currProd)
   
    //product = await Product.findById(currProd)
  
  //var scores =  product[0].scores
  //scores.sort(compare)
  var allPubs = await Publisher.find({});
  console.log(allPubs)
  res.json({
    data: allPubs,
  });
};

const applyFilter = async (req, res) => {
  //display selected publisher spaces
  //to add in publisher document - demographic, country, basic tag(1 word like technology, sports, news)
  console.log('applying filter')
  console.log(req.query)
  var response = req.query
  var filter = {}
  
  if(response.hasOwnProperty('demographic')){
    console.log("hiii")
    if(response.demographic !== '')
    filter.targetDemographic = response.demographic

  }
  if(response.hasOwnProperty('country')){
    if(response.country !== '')
    filter.targetCountry = response.country
  }
  if(response.hasOwnProperty('basicTag')){
    if(response.basicTag !== '')
    filter.basicTags = response.basicTag
  }


console.log(filter)

  
  var allPubs = await Publisher.find(filter);
  console.log(allPubs.length)
  var currProduct = await Product.findOne({_id :  mongoose.Types.ObjectId(currProd)})
  
  var i = 0
  var allPubs1 = JSON.parse(JSON.stringify(allPubs))

  while(i < allPubs1.length){

    var score = await axios.post(comparisonEndpoint, {
      data: JSON.stringify({pubTags : allPubs1[i].tags, advTags : currProduct.category}),
    });

    
    allPubs1[i].score = score.data.score
    console.log(allPubs1[i].score)
    i++
  }
  
  
  
  console.log(allPubs1)
  allPubs1.sort(compare)

  res.json({
    data : allPubs1
  })

}


const viewPublisherSlot = async (req, res) => {
  //display single publisher slot
  var individualPub = await Publisher.find({ pid: req.body.pid });
  res.json({
    data: individualPub,
  });
};

const placeBid = async (req, res) => {};

const testupload = async (req, res) => {
  var pubobj = {
    name: "abc",
    size: "5x4",
    position: "left of screen",
  };
  var files = makeFileObjects(pubobj, "file1.json");
  console.log(files);
  var cid = storeFiles(files);
  console.log("content saved on: ", cid);
};

const allProducts = async (req, res) => {
  console.log('hey')
  console.log(req.query.address);
  var allProds = await Product.find({ address: req.query.address });
  var compName = await Advertiser.find({ address: req.query.address})
  console.log(allProds);
  res.json({
    name: compName[0].name,
    allProds: allProds,
  });
};

// const sendNotification = async (req, res) => {
//   try {
//     console.log(req.body);
//     const receiverAddress = req.body.receiverAddress;
//     const senderAddress = req.body.senderAddress;
//     const bid = req.body.bid;
//     const CAIP_ADDRESS = `eip155:5:${receiverAddress}`;
//     const apiResponse = await PushAPI.payloads.sendNotification({
//       signer,
//       type: 3, // target
//       identityType: 2, // direct payload
//       notification: {
//         title: `BID LOG`,
//         body: `BID LOG`,
//       },
//       payload: {
//         title: `BID LOG`,
//         body: `Bid of amount ${bid} by address ${senderAddress}`,
//         cta: "",
//         img: "",
//       },
//       recipients: CAIP_ADDRESS, // recipient address
//       channel: "eip155:5:0x24F64cdc93003787a23AEcaCd0482B89A9E645a1", // your channel address
//       env: "staging",
//     });
//     console.log("Sent notification");

//     res.json({
//       status: "success",
//     });
//   } catch (err) {
//     console.log("Error ", err);
//   }
// };

module.exports = {
  advertiserRegister,
  advertiserLogin,
  addNewProduct,
  viewMarketplace,
  applyFilter,
  viewPublisherSlot,
  placeBid,
  logout,
  testupload,
  allProducts,
  //sendNotification,
};
