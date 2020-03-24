const router = require("express").Router();
const passport = require('passport');



// const { checkToken } = require("../../auth/token_validation");
const {
  createStudent,
  login,
  getStudentDetails,
  updateStudentName,
  getAllStudents,
  updateStudentProfilePic,
  updateStudentObjective,
  addUpdateStudentEducation,
  addUpdateStudentExperience,
  updateStudentSkills,
  updateContactInformation

//   login,
//   getUserByUserId,
//   getUsers,
//   updateUsers,
//   deleteUser
} = require("./student.controller");

let checkAuth = passport.authenticate('jwt', { session: false });
// router.get("/", checkToken, getUsers);
 router.post("/createStudent", createStudent);
 router.get("/getStudentDetails/:id",checkAuth, getStudentDetails);
 router.get("/getAllStudents", checkAuth,getAllStudents);

 router.post("/updateStudentName", checkAuth, updateStudentName);
 router.post("/updateStudentSkills", checkAuth, updateStudentSkills);
  router.post("/updateContactInformation", checkAuth,updateContactInformation);
 router.post("/updateStudentObjective", checkAuth ,updateStudentObjective);
 router.post("/addUpdateStudentEducation", checkAuth ,addUpdateStudentEducation);
 router.post("/addUpdateStudentExperience", checkAuth ,addUpdateStudentExperience);
 router.post("/updateStudentProfilePic/:id", checkAuth ,updateStudentProfilePic);
 


 router.post("/login", login);

// router.get("/:id", checkToken, getUserByUserId);
// router.post("/login", login);
// router.patch("/", checkToken, updateUsers);
// router.delete("/", checkToken, deleteUser);

module.exports = router;