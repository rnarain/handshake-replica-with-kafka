const router = require("express").Router();
// const { checkToken } = require("../../auth/token_validation");
const {
  applyForJob,
  getAppliedJobsByStudentID
  
} = require("./jobApplication.controller");
// router.get("/", checkToken, getUsers);s
 router.post("/applyForJob", applyForJob);
 router.get("/getAppliedJobsByStudentID/:id",getAppliedJobsByStudentID);


// router.get("/:id", checkToken, getUserByUserId);
// router.post("/login", login);
// router.patch("/", checkToken, updateUsers);
// router.delete("/", checkToken, deleteUser);

module.exports = router;