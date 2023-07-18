const express = require("express");
const router = express.Router();
const isAdvertiserLoggedIn = require("../middleware/isAdvertiserLoggedIn");
const fileUpload = require("express-fileupload");
const upload = require("../config/multer");

const {
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
} = require("../controllers/advertiserController");

router.post("/advertiserLogin", advertiserLogin);
router.post("/advertiserRegister", advertiserRegister);
router.get("/viewMarketplace", viewMarketplace);
router.get("/applyFilter", isAdvertiserLoggedIn, applyFilter);
router.get("/viewPublisherSlot", isAdvertiserLoggedIn, viewPublisherSlot);
router.post("/placeBid", isAdvertiserLoggedIn, placeBid);
router.post("/logout", isAdvertiserLoggedIn, logout);
router.post(
  "/addNewProduct",
  upload.single("file"),
  addNewProduct,
  //sendNotification
);
router.get("/allProducts",  allProducts);

router.get("/testupload", testupload);

//router.post("/notification", sendNotification);

//router.post('/updateDocs', updateDocs);

module.exports = router;
