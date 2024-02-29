const Listing = require("./models/listing");
const Review = require("./models/review");
const expressError = require("./utils/expressError.js");
const {listingSchema, reviewSchema} =require("./schema.js");
const review = require("./models/review.js");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;  
    req.flash("error", "you must be logged in to create listing");
    return res.redirect("/login");
  }
  next();
};


module.exports.saveRedirectUrl = (req, res, next)=>{
  if(req.session.redirectUrl){
    res.locals.saveRedirectUrl = req.session.redirectUrl;
  }
  next();
};

module.exports.isOwner = async (req,res,next)=>{
  let { id } = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner.equals(res.locals.curntUser._id)){
      req.flash("error", "you have not permission to edit to this");
      return res.redirect(`/listing/${id}`);
    }
    next();
};

module.exports.validateListing = (req, res, next) =>{
  let {error} = listingSchema.validate(req.body);
    if(error){
      let errMsg = error.details.map((el)=>el.message).join(",");
        throw new expressError(400, error);
    }else{
      next();
    }
};

module.exports.validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new expressError(400, error);
  } else {
    next();
  }
};

module.exports.isReviewOthrer = async (req,res,next)=>{
  let { id, reviewId } = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.curntUser._id)){
      req.flash("error", "you did not create this review");
      return res.redirect(`/listing/${id}`);
    }
    next();
};