const Job = require("../../Models/JobModel");

module.exports = {

  createJob: (data, callBack) => {
    var newJob = new Job({
      companyID: data.companyID,
      companyName: data.companyName,
      location: data.location,
      postedDate: new Date().toISOString(),
      deadLineDate: data.deadLineDate,
      salary: data.salary,
      description: data.description,
      category: data.category,
      title: data.title,
      jobApplicants: []
    });

    newJob.save((error, data) => {
      if (error) {
        callBack(error);
      }
      console.log(data);
      return callBack(null, data);
    })
  },
  getJobsByStudentID: (id, callBack) => {
    Job.find({ 'jobApplicants.studentID': { $ne: id } }, (error, result) => {
      if (error) {
        callBack(error);
      }
      console.log(result);
      return callBack(null, result);
    });

  },

  getJobsByCompanyID: (id, callBack) => {
    Job.find({ companyID: id }, (error, result) => {
      if (error) {
        callBack(error);
      }
      console.log(result);
      return callBack(null, result);
    });
  },


  getApplicantListByJobID: (id, callBack) => {
    Job.findOne({ _id: id }, (error, result) => {
      if (error) {
        callBack(error);
      }
      console.log(result);
      return callBack(null, result.jobApplicants);
    });
  },

  changeApplicationStatus: (data, callBack) => {
    Job.update({ _id : data.id , 'jobApplicants.studentID' : data.studentID}, 
    { "$set": 
      {
        'jobApplicants.$.status': data.status,
      }  
    }, (error, results) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results);
    }
    );
  },
  getAppliedJobsByStudentID: (id, callBack) => {
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
    Job.update({ _id: data.jobID }, { $push: { jobApplicants: newApplication } }, { upsert: false }, (error, results) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results);
    }
    );
  },
}