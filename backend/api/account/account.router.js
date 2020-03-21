const router = require("express").Router();
// const { checkToken } = require("../../auth/token_validation");
const {
  createStudent,
  login,
  getStudentDetails,
  updateStudentName,
  getAllStudents,
  getCompanyProfileDetails,
  updateCompanyProfilePic,
  updateStudentProfilePic,
  updateCompanyDetails,
  updateContactInformation,
  updateStudentObjective,
  addUpdateStudentEducation,
  addUpdateStudentExperience,
  updateStudentSkills

//   login,
//   getUserByUserId,
//   getUsers,
//   updateUsers,
//   deleteUser
} = require("./account.controller");
// router.get("/", checkToken, getUsers);
 router.post("/createStudent", createStudent);
 router.get("/getStudentDetails/:id", getStudentDetails);
 router.get("/getCompanyProfileDetails/:id", getCompanyProfileDetails);
 router.get("/getAllStudents", getAllStudents);

 router.post("/updateStudentName", updateStudentName);
 router.post("/updateStudentSkills", updateStudentSkills);
 router.post("/updateContactInformation", updateContactInformation);
 router.post("/updateStudentObjective", updateStudentObjective);
 router.post("/addUpdateStudentEducation", addUpdateStudentEducation);
 router.post("/addUpdateStudentExperience", addUpdateStudentExperience);
 router.post("/updateCompanyDetails", updateCompanyDetails);
 router.post("/updateCompanyProfilePic/:id", updateCompanyProfilePic);
 router.post("/updateStudentProfilePic/:id", updateStudentProfilePic);
 


 router.post("/login", login);

// router.get("/:id", checkToken, getUserByUserId);
// router.post("/login", login);
// router.patch("/", checkToken, updateUsers);
// router.delete("/", checkToken, deleteUser);

module.exports = router;