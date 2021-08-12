const express = require("express");
const route = express.Router();
const user = require("../controllers/User");
const therapist = require("../controllers/Therapist");
const admin = require("../controllers/Admin");
const verifyToken = require("../middleware/auth");

route.post("/admin/register", admin.Register);
route.post("/admin/login", admin.Login);
route.get("/admin/user/reviews", admin.UserReviews);
route.get("/admin/therapist/reviews", admin.TherapistReviews);

route.post("/user/register", user.Register);
route.post("/user/login", user.Login);
route.post("/user/review", verifyToken, user.UserReview);
route.get("/user/me",verifyToken, user.Me);

route.post("/therapist/register", therapist.Register);
route.post("/therapist/login", therapist.Login);
route.post("/therapist/review", verifyToken, therapist.TherapistReview);
route.post("/therapist/profile", verifyToken, therapist.Profile);
route.get("/therapist/me", verifyToken, therapist.Me);

module.exports = route;
