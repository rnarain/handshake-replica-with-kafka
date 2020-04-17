const Job = require('../Models/JobModel');

function handle_request(msg, callBack) {
  console.log(msg);
  if (msg.path === "create_job") {
    let data=msg.data;
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
  }
  else if (msg.path === "get_jobs_by_student_id") {
    Job.find({ 'jobApplicants.studentID': { $ne: msg.id } }, (error, result) => {
        if (error) {
          callBack(error);
        }
        console.log(result);
        return callBack(null, result);
      });
  }
  else if (msg.path === "get_jobs_by_company_id") {
    Job.find({ companyID: msg.id }, (error, result) => {
        if (error) {
          callBack(error);
        }
        console.log(result);
        return callBack(null, result);
      });
  }
  else if (msg.path === "get_applicant_list_by_job_id") {
    Job.findOne({ _id: msg.id }, (error, result) => {
        if (error) {
          callBack(error);
        }
        console.log(result);
        return callBack(null, result.jobApplicants);
      });
  }
  else if (msg.path === "change_application_status") {
    let data = msg.data;
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
  }
  else if (msg.path === "get_applied_jobs_by_student_id") {
    Job.find({ 'jobApplicants.studentID': msg.id }, (error, result) => {
        if (error) {
          callBack(error);
        }
        console.log(result);
        return callBack(null, result);
      });
  }
  else if (msg.path === "apply_for_job") {
    let data = msg.data;
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
  }
};

exports.handle_request = handle_request;