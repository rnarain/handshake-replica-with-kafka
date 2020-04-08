const Company = require("../../Models/CompanyModel");

module.exports = {
  createCompany: (data, callBack) => {
    var newCompany = new Company({
      name: "Google",
      email: data.email,
      phone : "123",
      password : "123456",
      city : "San Jose",
      description : "Desc",
    })
  },

  //   Student.findOne({ email: data.email }, (error, user) => {
  //     if (error) {
  //       callBack(error);
  //     }
  //     if (user) {
  //       return callBack("User already exists");
  //     }
  //     else {
  //       newStudent.save((error, data) => {
  //         if (error) {
  //           callBack(error);
  //         }
  //         console.log(data);
  //         return callBack(null, data);
  //       })
  //     }
  //   })
  // },

  login: (data, callBack) => {
    console.log(data);
    Company.findOne({ email: data.email }, (error, user) => {
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

//   getStudentProfileDetails: (id, callBack) => {
//     Student.find({ _id: id }, (error, result) => {
//       if (error) {
//         callBack(error);
//       }
//       console.log(result);
//       return callBack(null, result);
//     });
//   },

//   updateStudentName: (data, callBack) => {
//     var newData = {
//       fname: data.fname,
//       lname: data.lname
//     }
//     Student.update({ _id: data.id }, newData, { upsert: false }, (error, results) => {
//       if (error) {
//         callBack(error);
//       }
//       return callBack(null, results);
//     }
//     );
//   },

//   updateStudentSkills: (data, callBack) => {
//     Student.update({ _id: data.id }, { skills: data.skills }, { upsert: false }, (error, results) => {
//       if (error) {
//         callBack(error);
//       }
//       return callBack(null, results);
//     }
//     );
//   },

//   updateStudentObjective: (data, callBack) => {
//     Student.update({ _id: data.id }, { careerObjective: data.careerObjective, }, { upsert: false }, (error, results) => {
//       if (error) {
//         callBack(error);
//       }
//       return callBack(null, results);
//     }
//     );
//   },

//   addEducation: (data, callBack) => {
//     let newData = {
//       college: data.college,
//       major: data.major,
//       yearOfStarting: data.yearOfStarting,
//       yearOfPassing: data.yearOfPassing,
//       gpa: data.gpa,
//       degreeType: data.degreeType,
//     }
//     Student.update({ _id: data.id }, { $push : { education: newData }  }, { upsert: false }, (error, results) => {
//       if (error) {
//         callBack(error);
//       }
//       return callBack(null, results);
//     }
//     );
//   },

//   updateEducation: (data, callBack) => {
//     Student.update({ _id : data.id , 'education._id' : data.educationId}, 
//     { "$set": 
//       {
//         'education.$.college': data.college,
//         'education.$.major': data.major,
//         'education.$.yearOfStarting': data.yearOfStarting,
//         'education.$.yearOfPassing': data.yearOfPassing,
//         'education.$.gpa': data.gpa,
//         'education.$.degreeType': data.degreeType,
//       }  
//     },  (error, results) => {
//       if (error) {
//         callBack(error);
//       }
//       return callBack(null, results);
//     }
//     );
//   },
//   deleteEducation: (data, callBack) => {
//       Student.update({ _id: data.id },
//         { "$pull": { 'education': { _id : data.educationId } } },
//         (error, result) => {
     
//       if (error) {
//         callBack(error);
//       }
//       return callBack(null, result);
//     });
//   },
//   addExperience: (data, callBack) => {
//     let newData = {
//       company: data.company,
//       location: data.location,
//       startDate: data.startDate,
//       endDate: data.endDate,
//       title: data.title,
//       description: data.description
//     }
//     Student.update({ _id: data.id }, { $push : { experience: newData }  }, { upsert: false }, (error, results) => {
//       if (error) {
//         callBack(error);
//       }
//       return callBack(null, results);
//     }
//     );
//   },

//   updateExperience :(data,callBack)=>{

//     Student.update({ _id : data.id , 'experience._id' : data.experienceId}, 
//     { "$set": 
//       {
//         'experience.$.company': data.company,
//         'experience.$.location': data.location,
//         'experience.$.startDate': data.startDate,
//         'experience.$.endDate': data.endDate,
//         'experience.$.title': data.title,
//         'experience.$.description': data.description
//       }  
//     },  (error, results) => {
//       if (error) {
//         callBack(error);
//       }
//       return callBack(null, results);
//     }
//     );
//   },
  
//   deleteExperience: (data, callBack) => {
//     Student.update({ _id: data.id },
//       { "$pull": { 'experience': { _id : data.experienceId } } },
//       (error, result) => {
   
//     if (error) {
//       callBack(error);
//     }
//     return callBack(null, result);
//   });
// },
//   getAllStudents: (id,callBack) => {
//     Student.find({_id: {$ne: id}},
//       (error, results) => {
//         if (error) {
//           callBack(error);
//         }
//         return callBack(null, results);
//       }
//     );
//   },

//   updateStudentProfilePic: (data, callBack) => {
//     Student.update({ _id: data.id }, { profilePicURL: data.profilePicURL }, { upsert: false }, (error, results) => {
//       if (error) {
//         callBack(error);
//       }
//       return callBack(null, results);
//     }
//     );
//   },

//   updateContactInformation: (data, callBack) => {
//     let newData = {
//       email: data.email,
//       phone: data.phone
//     }
//     Student.update({ _id: data.id }, newData, { upsert: false }, (error, results) => {
//       if (error) {
//         callBack(error);
//       }
//       return callBack(null, results);
//     }
//     );
//   }
}
