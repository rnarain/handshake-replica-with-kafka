const jwt = require('jsonwebtoken');
const { secret } = require('../../config/configValues');
var kafka = require('../../kafka/client');

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
  login: (req, res) => {
    const body = req.body;
    const data = {
      data: body,
      path: 'company_login'
    }
    kafka.make_request('company', data, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database error"
        });
      }
      else {
        if (results.length == 0) {
          return res.json({
            success: 0,
            message: "email or password incorrect"
          });
        }
        if (compareSync(body.password, results.password)) {
          const payload = { _id: results._id, type: 1 , name:results.name , profilePicURL : results.profilePicURL };
          const token = jwt.sign(payload, secret, {
            expiresIn: 1008000
          });
          return res.json({
            success: 1,
            data: token,
            message: "Signin Successful"
          });
        }
        else {
          return res.status(200).json({
            success: 0,
            message: "email id or password incorrect"
          });
        }
      }

    });
  },

  getCompanyProfileDetails: (req, res) => {
    const id = req.params.id;
    const payload = {
      path: 'get_company_profile_details',
      id: id
    }
    kafka.make_request('company', payload, (err, results) => {
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
    // getCompanyProfileDetails(id, (err, results) => {
    //   if (err) {
    //     console.log(err);
    //     return res.status(500).json({
    //       success: 0,
    //       message: "Database connection errror"
    //     });
    //   }
    //   return res.status(200).json({
    //     success: 1,
    //     data: results
    //   });
    // });
  },

  updateCompanyDetails: (req, res) => {
    const body = req.body;
    const payload = {
      path: 'update_company_details',
      data: body
    }
    kafka.make_request('company', payload, (err, results) => {
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
    // updateCompanyDetails(body, (err, results) => {
    //   if (err) {
    //     console.log(err);
    //     return res.status(500).json({
    //       success: 0,
    //       message: "Database connection errror"
    //     });
    //   }
    //   return res.status(200).json({
    //     success: 1,
    //     data: results
    //   });
    // })
  },


  getAllStudents: (req, res) => {
    const payload = {
      path: 'get_all_students'
    }
    kafka.make_request('company', payload, (err, results) => {
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
    // getAllStudents((err, results) => {
    //   if (err) {
    //     console.log(err);
    //     return res.status(500).json({
    //       success: 0,
    //       message: "Database connection errror"
    //     });
    //   }
    //   return res.status(200).json({
    //     success: 1,
    //     data: results
    //   });
    // });
  },

  updateCompanyProfilePic: (req, res) => {
    upload(req, res, function (err) {
      if (err) {
        return res.status(500).json(err);
      }
      console.log(req.file.mimetype)
      const data = {
        profilePicURL: "/Uploads/Profile-Pic/" + req.file.originalname,
        id: req.params.id
      }

    const payload = {
      path: 'update_company_profile_pic',
      data: data
    }
    kafka.make_request('company', payload, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror"
        });
      }
      return res.status(200).json({
        success: 1,
        data: data.profilePicURL
      });
    });
    //   updateCompanyProfilePic(data, (err, results) => {
    //     if (err) {
    //       console.log(err);
    //       return res.status(500).json({
    //         success: 0,
    //         message: "Database connection errror"
    //       });
    //     }
    //     return res.status(200).json({
    //       success: 1,
    //       data: data.profilePicURL
    //     });
    //   });
    // });
  });
},

}