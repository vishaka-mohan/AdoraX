const axios = require("axios");

const jwt = require("jsonwebtoken");
module.exports = (req, resp, next) => {
  try {
    const token = req.cookies.authToken;
    const decoded = jwt.verify(token, process.env.JWT_KEY); //stores the token and verifies if same
    req.userData = decoded; //created new field use thhis to check if admin or Not.
    
    if (decoded.isAdvertiser === true) {
     
      var response = {
        Authenticated: true,
        isAdvertiser: true,
        isPublisher: false,
        aid: decoded.aid,
        name: decoded.name,
      }
      const authStatus = response.Authenticated;
      const isAdvertiser = response.isAdvertiser;
      if (authStatus === true && isAdvertiser === true) {
        //fetching the userData object from auth service
        req.userData = response;
        next();
      } else {
        return res.json({
          message: "Unauthorized Access",
        });
      }
    } 
  } catch (error) {
    console.log(error);
    return resp.json({
      Authenticated: false,
      isAdvertiser: false,
      isPublisher: false,
    });
  }
};
