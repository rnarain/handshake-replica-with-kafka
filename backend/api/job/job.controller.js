const {
  createJob,
  getJobsByStudentID,
  getJobsByCompanyID,
  deleteJob,
  getApplicantListByJobID,
  changeApplicationStatus,
  applyForJob
} = require("./job.service");

const url = require('url');
var multer = require('multer')
var storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, '../Frontend/public/Uploads/Resumes')
  },
  filename(req, file, cb) {
    cb(null, file.originalname)
  }
})
var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "application/pdf" || "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      cb(null, true);
    } else {
      cb(null, false);
      console.log(file.mimetype);
      return cb({
        success: 0,
        data: "Only pdfs and text documents allowed"
      });
    }
  }
}).single('file');

module.exports = {
  createJob: (req, res) => {
    createJob(req.body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror"
        });
      }
      return res.status(201).json({
        success: 1,
        data: results
      });
    });
  },

  getJobsByStudentID: (req, res) => {
    const id = req.params.id;
    getJobsByStudentID(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results
      });
    });
  },

  getJobsByCompanyID: (req, res) => {
    const id = req.params.id;
    // return res.json({
    //   success: 0,
    //   data: "ID cannot be null"
    // });

    getJobsByCompanyID(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results
      });
    });
  },

  getApplicantListByJobID: (req, res) => {
    const id = req.params.id;
    // return res.json({
    //   success: 0,
    //   data: "ID cannot be null"
    // });

    getApplicantListByJobID(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results
      });
    });
  },

  deleteJob: (req, res) => {
    const id = req.params.id;
    deleteJob(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (results.affectedRows == 0) {
        console.log(results);
        return res.json({
          success: 0,
          message: "Record Not Found"
        });
      }
      return res.json({
        success: 1,
        message: "Job deleted successfully"
      });
    });
  },

  changeApplicationStatus: (req, res) => {
    changeApplicationStatus(req.body, (err, results) => {
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

  applyForJob: (req, res) => {
    upload(req, res, function (err) {
      if (err) {
        return res.status(500).json(err);
      }

      const queryObject = url.parse(req.url, true).query;
      const data = {
        studentID: queryObject.studentID,
        jobID: queryObject.jobID,
        resumeURL:  "/Uploads/Resumes/" +req.file.originalname,
      }
      applyForJob(data, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            message: "Database connection errror"
          });
        }
        return res.status(201).json({
          success: 1,
          data: results
        });
      });
    });
  },

}


