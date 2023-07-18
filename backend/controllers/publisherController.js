const Publisher = require("../models/publisher");
const axios = require("axios");
const { convert } = require("html-to-text");
const jwt = require("jsonwebtoken");
const publisher = require("../models/publisher");
const fs = require('fs')
const solc = require('solc')
const Web3 = require("web3");


// setup a http provider
const web3 = new Web3(new Web3.providers.HttpProvider("https://rpc.chiadochain.net"));


const keywordExtractionEndpoint = process.env.NLP_SERVICE + "/keywords";
const extractTagsController = async (url) => {
  axios
    .get(url)
    .then(async (response) => {
      const htmlData = response.data;
      //the API takes fixed size input (1024 tokens, hence need to truncate)
      //check how to truncate
      const text = convert(htmlData, {
        wordwrap: 130,
      });

      const keywords = await axios.post(keywordExtractionEndpoint, {
        data: text,
      });

      return keywords.data.keywords;
    })
    .catch(function (err) {
      // console.error(err.response.status);
      // console.error(err.response.data.data);
      res.status(err.response.status).json({
        status: "failure",
        message: err.response.data,
      });
    });
};

const postPublisherController = (req, res) => {
    console.log('hello')
  Publisher.find({ name: req.body.name })
    .then((foundPublishers) => {
      if (foundPublishers.length == 0) {
        axios.get(req.body.landingUrl).then((response) => {
          const htmlData = response.data;
          const text = convert(htmlData, {
            wordwrap: 130,
          });
          axios
            .post(keywordExtractionEndpoint, {
              data: text,
            })
            .then((keywords) => {
              const publisherObj = {
                name: req.body.name,
                landingUrl: req.body.landingUrl,
                additionalUrl: req.body.additionalUrl,
                tags: keywords.data.keywords,
                address: req.body.address,
                targetDemographic: req.body.target_demographic,
                targetCountry: req.body.target_country,
                basicTags: req.body.basic_tags,
              };

              const publisherEntity = new Publisher(publisherObj);
              publisherEntity.save().then((newPublisher) => {
                console.log(`Publisher ${newPublisher.name} added`);
                res.status(201).json({
                  status: "success",
                  message: newPublisher,
                });
              });
              console.log(publisherEntity);
            });
        });
      } else {
        console.log(`Publisher ${req.body.name} already exists!`);
        res.status(400);
        throw "Pubisher already registered";
      }
    })

    .catch((err) => {
      console.log("err");
      res.json({
        status: "error",
        message: err,
      });
    });
};

const publisherLogin = async (req, res) => {
  //login with name and password

  const address = req.body.address;
  console.log(req.body);
  Publisher.find({ address: address })
    .then(async (foundPublisher) => {
      console.log("Found Publisher ");
      console.log(foundPublisher);
      if (foundPublisher.length == 1) {
        const token = jwt.sign(
          {
            aid: foundPublisher[0].name,
            name: foundPublisher[0].landingUrl,
            domain: foundPublisher[0].additionalUrl,
            address: req.body.address,
            isAdvertiser: false,
            isPublisher: true,
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
      console.log(err);
      res.json(err);
    });
};

const adSlotController = (req, res) => {
  console.log(req.body);
  publisher
    .updateOne(
      { address: req.body.address },
      { $push: { adSlots: {"ipfsHash" : req.body.ipfs_url} } }
    )
    .then((data) => {
      console.log(data);
      res.json({
        message: "succesfully posted",
      });
    })
    .catch((err) => {
      res.json({
        message: "Failure",
      });
    });
};

const fetchAdSlots = (req, res) => {
  console.log(req.body);
  publisher
    .find({ address: req.body.address })
    .then((foundPublisher) => {
      if (foundPublisher.length == 1) {
        console.log(foundPublisher);
        res.json({
          status: "success",
          adSlots: foundPublisher[0].adSlots,
        });
      } else {
        console.log("gr");
        res.json({
          status: "error",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: "error",
      });
    });
};

const renderAd = (req, res) => {
  console.log("rendering ad");
  const hashId = req.body.hashId;
  console.log(req.body);
  //based on hashId, retrieve the product details of max bidder, url of product website
  const name = "Eyeliner";
  const pictureUrl =
    "http://res.cloudinary.com/dpsmilpng/image/upload/v1669221648/gn9xhxr4siatwd7ltlkx.jpg";
  const description = "Smudge proof, waterproof sharp eye-liner";

  //from hash ID, retrieve height,width

  const height = "300px";
  const width = "300px";

  res.json({
    name: name,
    pictureUrl: pictureUrl,
    description: description,
    height: height,
    width: width,
    siteUrl: "#",
  });
};

const deployContract = async(req, res) => {

    var fileContent = fs.readFileSync("./contracts/YuuAuction.sol").toString();
    //console.log(fileContent)

    var input = {
        language: "Solidity",
        sources: {
          "YuuAuction.sol": {
            content: fileContent,
          },
        },
      
        settings: {
          outputSelection: {
            "*": {
              "*": ["*"],
            },
          },
        },
      }

    var output = JSON.parse(solc.compile(JSON.stringify(input)));
    console.log("Output: ", output);

    var ABI = output.contracts["YuuAuction.sol"]["YuuAuction"].abi;
    var bytecode = output.contracts["YuuAuction.sol"]["YuuAuction"].evm.bytecode.object;
    //console.log("Bytecode: ", bytecode);
    console.log("ABI: ", ABI);

    
    contract = new web3.eth.Contract(ABI);
    let defaultAccount = req.body.address;
    
    console.log("Accounts:", req.body.address); 
    //web3.eth.personal.unlockAccount(defaultAccount, '85c6b766ce6fadbc1fed1fa38a10a6318a41c658b243db05f5de00aaacea02e9', 1000);
    const signPromise = web3.eth.accounts.signTransaction(tx, privateKey);

    contract
        .deploy({ data: bytecode, 
            arguments: [ "bafybeigknunwfrcfrptx3psjphkhqa576jtruzhrbop7cmxckdnwh6btxm", 100] })
        .send({ from: defaultAccount, gas: 470000 })
        .on("receipt", (receipt) => { //event,transactions,contract address will be returned by blockchain
        console.log("Contract Address:", receipt.contractAddress);
        })
        
    
   



    res.json({
        message : "contract deployed"
    })
}

module.exports = {
  postPublisherController,
  extractTagsController,
  publisherLogin,
  adSlotController,
  fetchAdSlots,
  renderAd,
  deployContract
};
