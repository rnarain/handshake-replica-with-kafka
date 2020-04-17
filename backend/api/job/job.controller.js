var kafka = require('../../kafka/client');
const url = require('url');
var multer = require('multer')
var storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, '../frontend/public/Uploads/Resumes')
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
    const payload = {
      path: 'create_job',
      data: req.body
    }
    kafka.make_request('job', payload, (err, results) => {
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
    // createJob(req.body, (err, results) => {
    //   if (err) {
    //     console.log(err);
    //     return res.status(500).json({
    //       success: 0,
    //       message: "Database connection errror"
    //     });
    //   }
    //   return res.status(201).json({
    //     success: 1,
    //     data: results
    //   });
    // });
  },

  getJobsByStudentID: (req, res) => {
    const id = req.params.id;
    const payload = {
      path: 'get_jobs_by_student_id',
      id:id
    }
    kafka.make_request('job', payload, (err, results) => {
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
    // getJobsByStudentID(id, (err, results) => {
    //   if (err) {
    //     console.log(err);
    //     return;
    //   }
    //   return res.json({
    //     success: 1,
    //     data: results
    //   });
    // });
  },

  getJobsByCompanyID: (req, res) => {
    const id = req.params.id;
    const payload = {
      path: 'get_jobs_by_company_id',
      id:id
    }
    kafka.make_request('job', payload, (err, results) => {
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
    // getJobsByCompanyID(id, (err, results) => {
    //   if (err) {
    //     console.log(err);
    //     return;
    //   }
    //   return res.json({
    //     success: 1,
    //     data: results
    //   });
    // });
  },

  getApplicantListByJobID: (req, res) => {
    const id = req.params.id;
    const payload = {
      path: 'get_applicant_list_by_job_id',
      id:id
    }
    kafka.make_request('job', payload, (err, results) => {
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

    // getApplicantListByJobID(id, (err, results) => {
    //   if (err) {
    //     console.log(err);
    //     return;
    //   }
    //   return res.json({
    //     success: 1,
    //     data: results
    //   });
    // });
  },

  changeApplicationStatus: (req, res) => {
    const payload = {
      path: 'change_application_status',
      data: req.body
    }
    kafka.make_request('job', payload, (err, results) => {
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
    // changeApplicationStatus(req.body, (err, results) => {
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
  getAppliedJobsByStudentID: (req, res) => {
    const id = req.params.id;
    const payload = {
      path: 'get_applied_jobs_by_student_id',
      id:id
    }
    kafka.make_request('job', payload, (err, results) => {
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
    // getAppliedJobsByStudentID(id,(err, results) => {
    //   if (err) {
    //     console.log(err);
    //     return;
    //   }
    //   return res.json({
    //     success: 1,
    //     data: results
    //   });
    // });
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
        name:queryObject.name
      }
      const payload = {
        path: 'apply_for_job',
        data: data
      }
      kafka.make_request('job', payload, (err, results) => {
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
    })
    //   applyForJob(data, (err, results) => {
    //     if (err) {
    //       console.log(err);
    //       return res.status(500).json({
    //         success: 0,
    //         message: "Database connection errror"
    //       });
    //     }
    //     return res.status(201).json({
    //       success: 1,
    //       data: results
    //     });
    //   });
    // });
  },

}


