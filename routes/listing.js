const express = require("express");
const router = express.Router();
const wrapAsycn = require("../utils/wrapAsycn.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

router
  .route("/")
  .get(wrapAsycn(listingController.index))
  .post(
    isLoggedIn, 
    upload.single('listing[image]'),
     validateListing,
    wrapAsycn(listingController.createListing)
  );

// new route
router.get("/new", isLoggedIn, listingController.renderNewform);

router
  .route("/:id")
  .get(wrapAsycn(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single('listing[image]'),
    validateListing,
    wrapAsycn(listingController.updateListing)
  )
  .delete(isLoggedIn, isOwner, wrapAsycn(listingController.destroyListing));

// edit route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsycn(listingController.editForm)
);

module.exports = router;
