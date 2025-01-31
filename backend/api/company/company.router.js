const router = require("express").Router();
const passport = require('passport');



// const { checkToken } = require("../../auth/token_validation");
const {
  login,
   updateCompanyProfilePic,
   updateCompanyDetails,
  // updateContactInformation,
   getAllStudents,
   getCompanyProfileDetails
} = require("./company.controller");

let checkAuth = passport.authenticate('jwt', { session: false });
// router.get("/", checkToken, getUsers);
//  router.post("/createStudent", createStudent);
//  router.get("/getStudentDetails/:id", getStudentDetails);
  router.get("/getAllStudents",checkAuth , getAllStudents);

//  router.post("/updateStudentName", checkAuth, updateStudentName);
//  router.post("/updateStudentSkills", checkAuth, updateStudentSkills);
//   router.post("/updateContactInformation", checkAuth,updateContactInformation);
//  router.post("/updateStudentObjective", checkAuth ,updateStudentObjective);
//  router.post("/addEducation", checkAuth ,addEducation);
//  router.post("/updateEducation", checkAuth ,updateEducation);
//  router.post("/deleteEducation", checkAuth ,deleteEducation); 
//  router.post("/addExperience", checkAuth ,addExperience);
//  router.post("/deleteExperience", checkAuth ,deleteExperience);
//  router.post("/updateExperience", checkAuth ,updateExperience);
//  router.post("/updateStudentProfilePic/:id", checkAuth ,updateStudentProfilePic);
 


 router.post("/login", login);
 router.get("/getCompanyProfileDetails/:id",  getCompanyProfileDetails);
 router.post("/updateCompanyDetails", checkAuth, updateCompanyDetails);
 router.post("/updateCompanyProfilePic/:id" ,checkAuth ,updateCompanyProfilePic);



// router.get("/:id", checkToken, getUserByUserId);
// router.post("/login", login);
// router.patch("/", checkToken, updateUsers);
// router.delete("/", checkToken, deleteUser);

module.exports = router;