const router = require("express").Router();
const passport = require('passport');

// const { checkToken } = require("../../auth/token_validation");
const {
  createEvent,
  getAllEventsByStudentID,
   getEventsByCompanyID,
  // deleteJob,
   getParticpantListByEventID,
   getAllEventRegistrationsByStudentID,
   registerForEvent
  // changeApplicationStatus,
  // applyForJob
//   login,
//   getUserByUserId,
//   getUsers,
//   updateUsers,
//   deleteUser
} = require("./event.controller");

let checkAuth = passport.authenticate('jwt', { session: false });

// router.get("/", checkToken, getUsers);s
 router.post("/createEvent", checkAuth ,createEvent);
 router.post("/registerForEvent", checkAuth , registerForEvent);

//  router.get("/getJobsByStudentID/:id",getJobsByStudentID);
  router.get("/getEventsByCompanyID/:id",checkAuth , getEventsByCompanyID);
  router.get("/getAllEventRegistrationsByStudentID/:id",checkAuth, getAllEventRegistrationsByStudentID);
  router.get("/getAllEventsByStudentID/:id",checkAuth,getAllEventsByStudentID);

//  router.post("/applyForJob",applyForJob);
  router.get("/getParticpantListByEventID/:id",checkAuth , getParticpantListByEventID);
//  router.delete("/deleteJob/:id",deleteJob);
//  router.post("/changeApplicationStatus",changeApplicationStatus);



// router.get("/:id", checkToken, getUserByUserId);
// router.post("/login", login);
// router.patch("/", checkToken, updateUsers);
// router.delete("/", checkToken, deleteUser);

module.exports = router;