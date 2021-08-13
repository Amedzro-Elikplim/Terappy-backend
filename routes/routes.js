const express = require("express");
const route = express.Router();
const client = require("../controllers/Client");
const therapist = require("../controllers/Therapist");
const admin = require("../controllers/Admin");
const {verifyToken, verifyAdminRole} = require("../middleware/auth");

route.post("/admin/register", admin.Register);
route.post("/admin/login", admin.Login);
route.get("/admin/client/reviews", [verifyToken, verifyAdminRole], admin.ClientReviews);
route.get("/admin/therapist/reviews", [verifyToken, verifyAdminRole], admin.TherapistReviews);
route.delete("/admin/client/delete/:id", [verifyToken, verifyAdminRole], admin.DeleteClient);
route.delete("/admin/therapist/delete/:id", [verifyToken, verifyAdminRole], admin.DeleteTherapist);
route.get("/admin/client/all", [verifyToken, verifyAdminRole], admin.AllClients);
route.get("/admin/therapist/all",[verifyToken, verifyAdminRole], admin.AllTherapists);

route.post("/client/register", client.Register);
route.post("/client/login", client.Login);
route.post("/client/review", verifyToken, client.ClientReview);
route.get("/client/me",verifyToken, client.Me);

route.post("/therapist/register", therapist.Register);
route.post("/therapist/login", therapist.Login);
route.post("/therapist/review", verifyToken, therapist.TherapistReview);
route.post("/therapist/profile", verifyToken, therapist.Profile);
route.get("/therapist/me", verifyToken, therapist.Me);

module.exports = route;
