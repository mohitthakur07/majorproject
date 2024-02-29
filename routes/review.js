const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsycn = require("../utils/wrapAsycn.js");
const expressError = require("../utils/expressError.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {validateReview, isLoggedIn, isReviewOthrer} = require("../middleware.js");

const reviewController = require("../controllers/reviews.js");

//   add review route

router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsycn(reviewController.createReview)
);

// delete review route
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewOthrer,
  wrapAsycn(reviewController.destroyReview)
);

module.exports = router;