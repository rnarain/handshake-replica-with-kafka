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
  updateStudentSkills

//   login,
//   getUserByUserId,
//   getUsers,
//   updateUsers,
//   deleteUser
} = require("./student.controller");

let checkAuth = passport.authenticate('jwt', { session: false });
// router.get("/", checkToken, getUsers);
 router.post("/createStudent",checkAuth, createStudent);
 router.get("/getStudentDetails/:id",checkAuth, getStudentDetails);
 router.get("/getAllStudents", getAllStudents);

 router.post("/updateStudentName", updateStudentName);
 router.post("/updateStudentSkills", updateStudentSkills);
//  router.post("/updateContactInformation", updateContactInformation);
 router.post("/updateStudentObjective", updateStudentObjective);
 router.post("/addUpdateStudentEducation", addUpdateStudentEducation);
 router.post("/addUpdateStudentExperience", addUpdateStudentExperience);
 router.post("/updateStudentProfilePic/:id", updateStudentProfilePic);
 


 router.post("/login", login);

// router.get("/:id", checkToken, getUserByUserId);
// router.post("/login", login);
// router.patch("/", checkToken, updateUsers);
// router.delete("/", checkToken, deleteUser);

module.exports = router;