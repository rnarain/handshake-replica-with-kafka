const pool = require("../../config/database");
const Student = require("../../Models/StudentModel");


// 0 - student 1- employer
module.exports = {

  // new
  createStudent: (data, callBack) => {

    console.log(data);
    var newStudent = new Student({
      fname: data.fname,
      lname: data.lname,
      email: data.email,
      password: data.password,
      phone: null,
      dob: null,
      skills: null,
      careerObjective: null,
      profilePicURL: null,
      education: [{
        college: data.college,
        yearOfPassing: data.yearOfPassing,
        major: data.major,
        yearOfStarting: null,
        gpa: 0,
        degreeType: null
      }]

    });

    newStudent.save((error, data) => {
      if (error) {
        callBack(error);
      }
      console.log(data);
      return callBack(null, data);
    })
  },

  login: (data, callBack) => {
    Student.findOne({ email: data.email }, (error, user) => {
      if (error) {
        callBack(error);
      }
      if (user) {
        return callBack(null, user);
      }
      return callBack("No such user found");
    }
    );
  },

  getStudentProfileDetails: (id, callBack) => {
    Student.find({ studentID: id }, (error, result) => {
      if (error) {
        callBack(error);
      }
      console.log(result);
      return callBack(null, result);
    });
  },

  updateStudentName: (data, callBack) => {
    console.log(data);
    pool.query(
      `UPDATE studentprofile SET fname=? ,lname=? where studentID = ?`,
      [
        data.fname,
        data.lname,
        data.id
      ],
      (error, results) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  updateStudentSkills: (data, callBack) => {
    console.log(data);
    pool.query(
      `UPDATE studentprofile SET skills=? where studentID = ?`,
      [
        data.skills,
        data.id
      ],
      (error, results) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },



  updateStudentObjective: (data, callBack) => {
    console.log(data);
    pool.query(
      `UPDATE studentprofile SET careerObjective=? where studentID = ?`,
      [
        data.careerObjective,
        data.id
      ],
      (error, results) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  addUpdateStudentEducation: (data, callBack) => {
    if (data.educationID == "" || data.educationID == null) {
      console.log("update");
      pool.query(
        `insert into education(studentID,college,major,yearOfStarting,yearOfPassing,gpa,degreeType ) values(?,?,?,?,?,?,?)`,
        [
          data.id,
          data.college,
          data.major,
          data.yearOfStarting,
          data.yearOfPassing,
          data.gpa,
          data.degreeType,
        ],
        (error, results) => {
          if (error) {
            callBack(error);
          }
          return callBack(null, results);
        }
      );
    }

    else {
      pool.query(
        `Update education SET studentID=?,college=?,major=?,yearOfStarting=?,yearOfPassing=?,gpa=?,degreeType=?  where educationID = ?`,
        [
          data.id,
          data.college,
          data.major,
          data.yearOfStarting,
          data.yearOfPassing,
          data.gpa,
          data.degreeType,
          data.educationID,
        ],
        (error, results) => {
          if (error) {
            callBack(error);
          }
          return callBack(null, results);
        }
      );
    }
  },

  addUpdateStudentExperience: (data, callBack) => {
    if (data.experienceID == "" || data.experienceID == null) {
      pool.query(
        `insert into experience(studentID,company,location,startDate,endDate,title,description ) values(?,?,?,?,?,?,?)`,
        [
          data.id,
          data.company,
          data.location,
          data.startDate,
          data.endDate,
          data.title,
          data.description,
        ],
        (error, results) => {
          if (error) {
            callBack(error);
          }
          return callBack(null, results);
        }
      );
    }

    else {
      pool.query(
        `Update experience SET studentID=?,company=?,location=?,startDate=?,endDate=?,title=?,description=? where experienceID = ?`,
        [
          data.id,
          data.company,
          data.location,
          data.startDate,
          data.endDate,
          data.title,
          data.description,
          data.experienceID,
        ],
        (error, results) => {
          if (error) {
            callBack(error);
          }
          return callBack(null, results);
        }
      );
    }
  },

  getAllStudents: (callBack) => {
    pool.query(
      `SELECT * FROM studentprofile as SP
          LEFT Join education as ed ON SP.studentID = ed.studentID
          LEFT Join experience as ex ON SP.studentID = ex.studentID`,
      [
      ],
      (error, results) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getCompanyProfileDetails: (id, callBack) => {
    pool.query(
      `select * from companyprofile as CP INNER JOIN account as AC on CP.accountID = AC.accountID where CP.companyID= ? `,
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
  },
  updateCompanyProfilePic: (data, callBack) => {
    console.log(data);
    pool.query(
      `UPDATE companyprofile SET profilePicURL=? where companyID = ?`,
      [
        data.profilePicURL,
        data.id
      ],
      (error, results) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, data.profilePicURL);
      }
    );
  },

  updateStudentProfilePic: (data, callBack) => {
    console.log(data);
    pool.query(
      `UPDATE studentprofile SET profilePicURL=? where studentID = ?`,
      [
        data.profilePicURL,
        data.id
      ],
      (error, results) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, data.profilePicURL);
      }
    );
  },

  updateCompanyDetails: (data, callBack) => {
    console.log(data);
    pool.query(
      `UPDATE companyprofile SET name=? , description = ? , city= ? where companyID = ?`,
      [
        data.name,
        data.description,
        data.city,
        data.companyID
      ],
      (error, results) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  updateContactInformation: (data, callBack) => {
    console.log(data);
    pool.query(
      `UPDATE account SET email=? , phone = ?  where accountID = ?`,
      [
        data.email,
        data.phone,
        data.accountID
      ],
      (error, results) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
}
