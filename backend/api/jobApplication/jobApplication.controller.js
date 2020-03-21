const {
  applyForJob,
  getAppliedJobsByStudentID
    
  } = require("./jobApplication.service");
  
  module.exports = {
    applyForJob: (req, res) => {
      applyForJob(req.body, (err, results) => {
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

    getAppliedJobsByStudentID: (req, res) => {
      const id = req.params.id;
      // return res.json({
      //   success: 0,
      //   data: "ID cannot be null"
      // });

      getAppliedJobsByStudentID(id,(err, results) => {
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
}