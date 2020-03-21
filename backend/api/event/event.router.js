const router = require("express").Router();
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
// router.get("/", checkToken, getUsers);s
 router.post("/createEvent", createEvent);
 router.post("/registerForEvent", registerForEvent);

//  router.get("/getJobsByStudentID/:id",getJobsByStudentID);
  router.get("/getEventsByCompanyID/:id",getEventsByCompanyID);
  router.get("/getAllEventRegistrationsByStudentID/:id",getAllEventRegistrationsByStudentID);
  router.get("/getAllEventsByStudentID/:id",getAllEventsByStudentID);

//  router.post("/applyForJob",applyForJob);
  router.get("/getParticpantListByEventID/:id",getParticpantListByEventID);
//  router.delete("/deleteJob/:id",deleteJob);
//  router.post("/changeApplicationStatus",changeApplicationStatus);



// router.get("/:id", checkToken, getUserByUserId);
// router.post("/login", login);
// router.patch("/", checkToken, updateUsers);
// router.delete("/", checkToken, deleteUser);

module.exports = router;