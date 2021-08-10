const express = require("express");
const route = express.Router();
const user = require("../controllers/User");
const therapist = require('../controllers/Therapist');

route.post("/user/register", user.Register);
route.post("/user/login", user.Login);
route.post("/user/review/:id", user.UserReview);
route.get("/user/reviews", user.AllReviews);
route.post("/therapist/register", therapist.Register);
route.post("/therapist/login", therapist.Login);
route.post("/therapist/review/:id", therapist.TherapistReview);
route.get("/therapist/reviews", therapist.AllReviews);


module.exports = route;