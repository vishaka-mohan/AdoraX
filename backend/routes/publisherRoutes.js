const router = require("express").Router();

const {
  postPublisherController,
  extractTagsController,
  publisherLogin,
  adSlotController,
  fetchAdSlots,
  renderAd,
  deployContract
} = require("../controllers/publisherController");
router.post("/publisherRegister", postPublisherController);
router.post("/publisherLogin", publisherLogin);
router.post("/adSlot", adSlotController);
router.post("/allSlots", fetchAdSlots);
router.post("/renderAd", renderAd);
router.post("/deployContract", deployContract);
// router.post("/tags", extractTagsController);
module.exports = router;
