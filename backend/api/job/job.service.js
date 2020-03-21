const pool = require("../../config/database");

module.exports = {
  createJob: (data, callBack) => {
    pool.query(
      `insert into job(companyID,location,deadLineDate,salary,description,category,title	) 
                values(?,?,?,?,?,?,?)`,
      [
        data.companyID,
        data.location,
        data.deadLineDate,
        data.salary,
        data.description,
        data.category,
        data.title,
      ],
      (error, results, fields) => {
        console.log(results);
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getJobsByStudentID: (id,callBack) => {
    pool.query(
      `select cp.name,jb.companyID,jb.jobID,jb.location,jb.postedDate,jb.deadLineDate,jb.salary,jb.description,jb.category,jb.title 
      from job AS jb 
      INNER JOIN companyprofile AS cp 
      ON jb.companyID = cp.companyID 
      INNER JOIN jobapplication AS ja ON jb.jobID <> ja.jobID or ja.studentID <> ?
`,
      [
        id
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

   getJobsByCompanyID: (id,callBack) => {
    pool.query(
      `select companyID,jobID,location,postedDate,deadLineDate,salary,description,category,title 
      from job where companyID = ?
`,
      [
       id
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  deleteJob: (id, callBack) => {
    pool.query(
      `delete from job where jobID = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getApplicantListByJobID: (id,callBack) => {
    pool.query(
      `select JA.jobApplicationID,JA.studentID,JA.status,JA.applicationDate,JA.resumeURL,SP.fname,SP.lname from jobapplication JA INNER JOIN studentprofile SP ON SP.studentID = JA.studentID where jobID =? 
`,
      [
       id
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  changeApplicationStatus: (data, callBack) => {
    pool.query(
      `update jobapplication SET status=? where jobApplicationID= ?`,
      [
        data.status,
        data.jobApplicationID
      ],
      (error, results, fields) => {
        console.log(results);
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  applyForJob: (data, callBack) => {
    pool.query(
      `insert into jobapplication(jobID,studentID,status,resumeURL) 
                values(?,?,?,?)`,
      [
        data.jobID,
        data.studentID,
        0,
        data.resumeURL,
      ],
      (error, results, fields) => {
        console.log(results);
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
}