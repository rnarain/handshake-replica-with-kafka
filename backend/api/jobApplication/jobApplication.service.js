const pool = require("../../config/database");

module.exports = {
  applyForJob: (data, callBack) => {
    pool.query(
      `insert into job(companyID,location,postedDate,deadLineDate,salary,description,category,title	) 
                values(?,?,?,?,?,?,?,?)`,
      [
        data.companyID,
        data.location,
        data.postedDate,
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
  
  getAppliedJobsByStudentID: (id,callBack) => {
    pool.query(
      `select j.title,cp.name,ja.status,ja.applicationDate FROM jobapplication as ja 
        INNER JOIN job j ON ja.jobID = j.jobID 
        INNER JOIN companyprofile cp ON cp.companyID = j.companyID
        where ja.studentID=?
`,
      [
       id
      ],
      (error, results) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  }
}