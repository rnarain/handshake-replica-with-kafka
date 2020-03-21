const {
    createStudent,
    login,
    getStudentProfileDetails,
    getEducationDetails,
    getExperienceDetails,
    getAccountDetails,
    updateStudentName,
    updateCompanyProfilePic,
    updateStudentProfilePic,
    updateStudentObjective,
    addUpdateStudentEducation,
    addUpdateStudentExperience,
    updateStudentSkills,
    updateCompanyDetails,
    updateContactInformation,
    getAllStudents,
    getCompanyProfileDetails
  } = require("./account.service");


  let studentObj ={
    accountInfo :"",
    studentprofile : "",
    education : "",
    experience : "",
  }
  const { hashSync, genSaltSync, compareSync } = require("bcrypt");
  //const { sign } = require("jsonwebtoken");
  const url = require('url');
var multer = require('multer')
var storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, '../Frontend/public/Uploads/Profile-Pic')
  },
  filename(req, file, cb) {
    cb(null, file.originalname)
  }
})
var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    console.log(file.mimetype)
    if (file.mimetype == "image/png" || "image/jpg" || "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      console.log(file.mimetype);
      return cb({
        success: 0,
        data: "Only images allowed"
      });
    }
  }
}).single('file');


  module.exports = {
    createStudent: (req, res) => {
      const body = req.body;
      const salt = genSaltSync(10);
      body.password = hashSync(body.password, salt);
      createStudent(body, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            message: "Database connection errror"
          });
        }
        return res.status(200).json({
          success: 1,
          data: results,
          message : "Sign up Successful"
        });
      });
    },
    login: (req, res) => {
      const body = req.body;
      login(body, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            message : "Database error"
          });
        }
        else{
          if(results.length ==0){
            return res.json({
              success: 0,
              message : "email or password incorrect"
            });
          }
          if(compareSync(body.password ,results[0].password)){
            // localStorage.setItem('id', results[0].studentID);
            // localStorage.setItem('type', results[0].type);
          // res.cookie('cookie',results[0].studentID,{maxAge: 900000, httpOnly: false, path : '/'});
            return res.json({
              success: 1,
              data: results,
              message : "Signin Successful"
            });
          }
          else{
            return res.status(200).json({
              success: 0,
              message: "email id or password incorrect"
            });
          }
        }
        
      });
    },
    getStudentDetails : (req,res)=>{
      const id = req.params.id;
      
      getStudentProfileDetails(id,(err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        studentObj.studentprofile = results;
        getAccountDetails(results[0].accountID,(err, Accresults) => {
        if (err) {
          console.log(err);
          return;
        }
        studentObj.accountInfo = Accresults;
      });
      });
      getExperienceDetails(id,(err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        studentObj.experience = results;
      });
      getEducationDetails(id,(err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        studentObj.education = results;
      });

      


      return res.json({
        success: 1,
        data: studentObj
      });
    },

    updateStudentName: (req, res) => {
      const body = req.body;
      updateStudentName(body, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            message: "Database connection errror"
          });
        }
        return res.status(200).json({
          success: 1,
          data: results
        });
      });
    },

    updateStudentSkills: (req, res) => {
      const body = req.body;
      updateStudentSkills(body, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            message: "Database connection errror"
          });
        }
        return res.status(200).json({
          success: 1,
          data: results
        });
      });
    },

    updateStudentObjective: (req, res) => {
      const body = req.body;
      updateStudentObjective(body, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            message: "Database connection errror"
          });
        }
        return res.status(200).json({
          success: 1,
          data: results
        });
      });
    },

   addUpdateStudentEducation: (req, res) => {
      const body = req.body;
      addUpdateStudentEducation(body, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            message: "Database connection errror"
          });
        }
        return res.status(200).json({
          success: 1,
          data: results
        });
      });
    },

    addUpdateStudentExperience: (req, res) => {
      const body = req.body;
      addUpdateStudentExperience(body, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            message: "Database connection errror"
          });
        }
        return res.status(200).json({
          success: 1,
          data: results
        });
      });
    },
  
    getAllStudents: (req, res) => {
      getAllStudents((err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            message: "Database connection errror"
          });
        }
        return res.status(200).json({
          success: 1,
          data: results
        });
      });
    },

    updateCompanyProfilePic: (req, res) => {
      upload(req, res, function (err) {
        if (err) {
          return res.status(500).json(err);
        }
        console.log(req.file.mimetype)
        const data = {
          profilePicURL: "/Uploads/Profile-Pic/" +req.file.originalname,
          id:req.params.id
        }
        updateCompanyProfilePic(data, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            message: "Database connection errror"
          });
        }
        return res.status(200).json({
          success: 1,
          data: results
        });
      });
    });
    },

    updateStudentProfilePic: (req, res) => {
      upload(req, res, function (err) {
        if (err) {
          return res.status(500).json(err);
        }
        console.log(req.file.mimetype)
        const data = {
          profilePicURL: "/Uploads/Profile-Pic/" +req.file.originalname,
          id:req.params.id
        }
        updateStudentProfilePic(data, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            message: "Database connection errror"
          });
        }
        return res.status(200).json({
          success: 1,
          data: results
        });
      });
    });
    },


    getCompanyProfileDetails : (req,res)=>{
      const id = req.params.id;
      
      getCompanyProfileDetails(id,(err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            message: "Database connection errror"
          });
        }
        return res.status(200).json({
          success: 1,
          data: results
        });
      });
    },
    updateCompanyDetails: (req, res) => {
      const body = req.body;
      updateCompanyDetails(body, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            message: "Database connection errror"
          });
        }
        updateContactInformation (body, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: 0,
              message: "Database connection errror"
            });
          }
          return res.status(200).json({
            success: 1,
            data: results
          });
        })
      });
    },

    updateContactInformation: (req, res) => {
      const body = req.body;
        updateContactInformation (body, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: 0,
              message: "Database connection errror"
            });
          }
          return res.status(200).json({
            success: 1,
            data: results
          });
        })
    },

    
}