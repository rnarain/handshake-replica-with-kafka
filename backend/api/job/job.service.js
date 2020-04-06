const pool = require("../../config/database");
const Job = require("../../Models/JobModel");

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
    Job.find({ 'jobApplicants.studentID':{$ne: id}}, (error, result) => {
      if (error) {
        callBack(error);
      }
      console.log(result);
      return callBack(null, result);
    });

  },

   getJobsByCompanyID: (id,callBack) => {
    Job.find({ companyID: id }, (error, result) => {
      if (error) {
        callBack(error);
      }
      console.log(result);
      return callBack(null, result);
    });
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
  getAppliedJobsByStudentID: (id,callBack) => {
    Job.find({ 'jobApplicants.studentID': id }, (error, result) => {
      if (error) {
        callBack(error);
      }
      console.log(result);
      return callBack(null, result);
    });
  },
  
  applyForJob: (data, callBack) => {
    let newApplication = {
      studentID: data.studentID,
      studentName: data.name,
      status: 0,
      applicationDate: new Date().toISOString(),
      resumeURL: data.resumeURL
    }
    Job.update({ _id: data.jobID },  { $push: { jobApplicants: newApplication  } }, { upsert: false }, (error, results) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results);
    }
    );
  },
}