const router = require("express").Router();
// const { checkToken } = require("../../auth/token_validation");
const {
  createJob,
  getJobsByStudentID,
  getJobsByCompanyID,
  deleteJob,
  getApplicantListByJobID,
  changeApplicationStatus,
  applyForJob
//   login,
//   getUserByUserId,
//   getUsers,
//   updateUsers,
//   deleteUser
} = require("./job.controller");
// router.get("/", checkToken, getUsers);s
 router.post("/createJob", createJob);
 router.get("/getJobsByStudentID/:id",getJobsByStudentID);
 router.get("/getJobsByCompanyID/:id",getJobsByCompanyID);
 router.post("/applyForJob",applyForJob);
 router.get("/getApplicantListByJobID/:id",getApplicantListByJobID);
 router.delete("/deleteJob/:id",deleteJob);
 router.post("/changeApplicationStatus",changeApplicationStatus);



// router.get("/:id", checkToken, getUserByUserId);
// router.post("/login", login);
// router.patch("/", checkToken, updateUsers);
// router.delete("/", checkToken, deleteUser);

module.exports = router;