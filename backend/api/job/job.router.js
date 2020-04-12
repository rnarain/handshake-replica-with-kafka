const router = require("express").Router();
// const { checkToken } = require("../../auth/token_validation");
const {
  createJob,
  getJobsByStudentID,
  getJobsByCompanyID,
  deleteJob,
  getApplicantListByJobID,
  changeApplicationStatus,
  applyForJob,
  getAppliedJobsByStudentID
//   login,
//   getUserByUserId,
//   getUsers,
//   updateUsers,
//   deleteUser
} = require("./job.controller");

const passport = require('passport');
let checkAuth = passport.authenticate('jwt', { session: false });

 router.post("/createJob", checkAuth ,createJob);
 router.get("/getJobsByStudentID/:id",checkAuth ,getJobsByStudentID);
 router.get("/getJobsByCompanyID/:id",checkAuth,getJobsByCompanyID);
 router.post("/applyForJob",checkAuth,applyForJob);
 router.get("/getApplicantListByJobID/:id",checkAuth,getApplicantListByJobID);
 router.get("/getAppliedJobsByStudentID/:id",checkAuth,getAppliedJobsByStudentID);

//  router.delete("/deleteJob/:id",deleteJob);
 router.post("/changeApplicationStatus",checkAuth,changeApplicationStatus);



// router.get("/:id", checkToken, getUserByUserId);
// router.post("/login", login);
// router.patch("/", checkToken, updateUsers);
// router.delete("/", checkToken, deleteUser);

module.exports = router;