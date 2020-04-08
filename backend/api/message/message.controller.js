const {
    createMessage,
    getMessages,
    addMessage
  } = require("./message.service");

  const jwt = require('jsonwebtoken');
  const { secret } = require('../../config/configValues');
  var kafka = require('../../kafka/client');
  
  const { hashSync, genSaltSync, compareSync } = require("bcrypt");
  //const { sign } = require("jsonwebtoken");
  const url = require('url');


  module.exports = {
    // createStudent: (req, res) => {
    //   const body = req.body;
    //   const salt = genSaltSync(10);
    //   body.password = hashSync(body.password, salt);
    //   createStudent(body, (err, results) => {
    //     if (err) {
    //       return res.status(400).json({
    //         success: 0,
    //         message: err
    //       });
    //     }
    //     return res.status(200).json({
    //       success: 1,
    //       data: results,
    //       message : "Sign up Successful"
    //     });
    //   });
    // },
    // login: (req, res) => {
    //   const body = req.body;
    //   login(body, (err, results) => {
    //     if (err) {
    //       console.log(err);
    //       return res.status(500).json({
    //         success: 0,
    //         message : "Database error"
    //       });
    //     }
    //     else{
    //       if(results.length ==0){
    //         return res.json({
    //           success: 0,
    //           message : "email or password incorrect"
    //         });
    //       }
    //       if(compareSync(body.password ,results.password)){
    //         const payload = { _id: results._id, type: 0};
    //         const token = jwt.sign(payload, secret, {
    //             expiresIn: 1008000
    //         });
    //         return res.json({
    //           success: 1,
    //           data: token,
    //           message : "Signin Successful"
    //         });
    //       }
    //       else{
    //         return res.status(200).json({
    //           success: 0,
    //           message: "email id or password incorrect"
    //         });
    //       }
    //     }
        
    //   });
    // },


    getMessages : (req,res)=>{
      const id = req.params.id;
      
      getMessages(id,(err, results) => {
        if (err) {
          console.log(err);
          return;
        }
          return res.json({
          success: 1,
          data: results
          });
      });
      // kafka.make_request('student',req.body,(err, results) => {
        //   if (err) {
        //     console.log(err);
        //     return;
        //   }
        //     return res.json({
        //     success: 1,
        //     data: results
        //     });
        // });
    },

      


    

    addMessage: (req, res) => {
      addMessage(req.body, (err, results) => {
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


    createMessage: (req, res) => {
      createMessage(req.body, (err, results) => {
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

  //   updateStudentSkills: (req, res) => {
  //     const body = req.body;
  //     updateStudentSkills(body, (err, results) => {
  //       if (err) {
  //         console.log(err);
  //         return res.status(500).json({
  //           success: 0,
  //           message: "Database connection errror"
  //         });
  //       }
  //       return res.status(200).json({
  //         success: 1,
  //         data: results
  //       });
  //     });
  //   },

  //   updateStudentObjective: (req, res) => {
  //     const body = req.body;
  //     updateStudentObjective(body, (err, results) => {
  //       if (err) {
  //         console.log(err);
  //         return res.status(500).json({
  //           success: 0,
  //           message: "Database connection errror"
  //         });
  //       }
  //       return res.status(200).json({
  //         success: 1,
  //         data: results
  //       });
  //     });
  //   },

  //  addUpdateStudentEducation: (req, res) => {
  //     const body = req.body;
  //     addUpdateStudentEducation(body, (err, results) => {
  //       if (err) {
  //         console.log(err);
  //         return res.status(500).json({
  //           success: 0,
  //           message: "Database connection errror"
  //         });
  //       }
  //       return res.status(200).json({
  //         success: 1,
  //         data: results
  //       });
  //     });
  //   },

  //   addUpdateStudentExperience: (req, res) => {
  //     const body = req.body;
  //     addUpdateStudentExperience(body, (err, results) => {
  //       if (err) {
  //         console.log(err);
  //         return res.status(500).json({
  //           success: 0,
  //           message: "Database connection errror"
  //         });
  //       }
  //       return res.status(200).json({
  //         success: 1,
  //         data: results
  //       });
  //     });
  //   },
  
  //   getAllStudents: (req, res) => {
  //     getAllStudents((err, results) => {
  //       if (err) {
  //         console.log(err);
  //         return res.status(500).json({
  //           success: 0,
  //           message: "Database connection errror"
  //         });
  //       }
  //       return res.status(200).json({
  //         success: 1,
  //         data: results
  //       });
  //     });
  //   },

  //   updateCompanyProfilePic: (req, res) => {
  //     upload(req, res, function (err) {
  //       if (err) {
  //         return res.status(500).json(err);
  //       }
  //       console.log(req.file.mimetype)
  //       const data = {
  //         profilePicURL: "/Uploads/Profile-Pic/" +req.file.originalname,
  //         id:req.params.id
  //       }
  //       updateCompanyProfilePic(data, (err, results) => {
  //       if (err) {
  //         console.log(err);
  //         return res.status(500).json({
  //           success: 0,
  //           message: "Database connection errror"
  //         });
  //       }
  //       return res.status(200).json({
  //         success: 1,
  //         data: results
  //       });
  //     });
  //   });
  //   },

  //   updateStudentProfilePic: (req, res) => {
  //     upload(req, res, function (err) {
  //       if (err) {
  //         return res.status(500).json(err);
  //       }
  //       console.log(req.file.mimetype)
  //       const data = {
  //         profilePicURL: "/Uploads/Profile-Pic/" +req.file.originalname,
  //         id:req.params.id
  //       }
  //       updateStudentProfilePic(data, (err, results) => {
  //       if (err) {
  //         console.log(err);
  //         return res.status(500).json({
  //           success: 0,
  //           message: "Database connection errror"
  //         });
  //       }
  //       return res.status(200).json({
  //         success: 1,
  //         data: results
  //       });
  //     });
  //   });
  //   },


  //   getCompanyProfileDetails : (req,res)=>{
  //     const id = req.params.id;
      
  //     getCompanyProfileDetails(id,(err, results) => {
  //       if (err) {
  //         console.log(err);
  //         return res.status(500).json({
  //           success: 0,
  //           message: "Database connection errror"
  //         });
  //       }
  //       return res.status(200).json({
  //         success: 1,
  //         data: results
  //       });
  //     });
  //   },
  //   updateCompanyDetails: (req, res) => {
  //     const body = req.body;
  //     updateCompanyDetails(body, (err, results) => {
  //       if (err) {
  //         console.log(err);
  //         return res.status(500).json({
  //           success: 0,
  //           message: "Database connection errror"
  //         });
  //       }
  //       updateContactInformation (body, (err, results) => {
  //         if (err) {
  //           console.log(err);
  //           return res.status(500).json({
  //             success: 0,
  //             message: "Database connection errror"
  //           });
  //         }
  //         return res.status(200).json({
  //           success: 1,
  //           data: results
  //         });
  //       })
  //     });
  //   },

  //   updateContactInformation: (req, res) => {
  //     const body = req.body;
  //       updateContactInformation (body, (err, results) => {
  //         if (err) {
  //           console.log(err);
  //           return res.status(500).json({
  //             success: 0,
  //             message: "Database connection errror"
  //           });
  //         }
  //         return res.status(200).json({
  //           success: 1,
  //           data: results
  //         });
  //       })
  //   },

    
}