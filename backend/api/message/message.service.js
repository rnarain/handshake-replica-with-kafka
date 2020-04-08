const Message = require("../../Models/MessageModel");

module.exports = {
  // createMessage: (data, callBack) => {
  //   // var newStudent = new Student({
  //   //   fname: data.fname,
  //   //   lname: data.lname,
  //   //   email: data.email,
  //   //   password: data.password,
  //   //   phone: null,
  //   //   dob: null,
  //   //   skills: null,
  //   //   careerObjective: null,
  //   //   profilePicURL: null,
  //   //   education: {
  //   //     college: data.college,
  //   //     yearOfPassing: data.yearOfPassing,
  //   //     major: data.major,
  //   //     yearOfStarting: null,
  //   //     gpa: 0,
  //   //     degreeType: null
  //   //   },
  //   //   experience: 
  //   //     {
  //   //       company: null,
  //   //       location: null,
  //   //       startDate: null,
  //   //       endDate: null,
  //   //       title: null,
  //   //       description: null
  //   //     }
  //   // });

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

  // login: (data, callBack) => {
  //   Student.findOne({ email: data.email }, (error, user) => {
  //     if (error) {
  //       callBack(error);
  //     }
  //     if (user) {
  //       return callBack(null, user);
  //     }
  //     return callBack("No such user found");
  //   }
  //   );
  // },

  getMessages: (id, callBack) => {
    Message.find({$or: [{'user1.id': id}, {'user2.id': id}] }, (error, result) => {
      if (error) {
        callBack(error);
      }
      console.log(result);
      return callBack(null, result);
    });
  },

  addMessage: (data, callBack) => {
    console.log(data);
    var newChat = {
      from : data.from,
      to : data.to,
      chat : data.chat,
      time : new Date().toISOString()
    }
    Message.update({ _id: data.id }, {$push : { chats: newChat } }, { upsert: false }, (error, results) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results);
    }
    );
  },

  createMessage: (data, callBack) => {
    Message.findOne({ 
      $or : [
        { 
          $and : [{'user1.id': data.user1.id}, {'user2.id': data.user2.id}]
        },
        { 
          $and : [{'user1.id': data.user2.id}, {'user2.id': data.user1.id}]
        }
      ]
    }, (error, message) => {
      if (error) {
        callBack(error);
      }
      if (message) {
        return callBack(null);
      }
      else
      {
        var newMessage = new Message({
          user1: data.user1,
          user2: data.user2,
          chats: []
        });
        newMessage.save((error, data) => {
          if (error) {
            callBack(error);
          }
          console.log(data);
          return callBack(null, data);
        })
      }
  })
},

  // updateStudentSkills: (data, callBack) => {
  //   Student.update({ _id: data.id }, { skills: data.skills }, { upsert: false }, (error, results) => {
  //     if (error) {
  //       callBack(error);
  //     }
  //     return callBack(null, results);
  //   }
  //   );
  // },

  // updateStudentObjective: (data, callBack) => {
  //   Student.update({ _id: data.id }, { careerObjective: data.careerObjective, }, { upsert: false }, (error, results) => {
  //     if (error) {
  //       callBack(error);
  //     }
  //     return callBack(null, results);
  //   }
  //   );
  // },

  // addUpdateStudentEducation: (data, callBack) => {
  //   let newData = {
  //     college: data.college,
  //     major: data.major,
  //     yearOfStarting: data.yearOfStarting,
  //     yearOfPassing: data.yearOfPassing,
  //     gpa: data.gpa,
  //     degreeType: data.degreeType,
  //   }
  //   Student.update({ _id: data.id }, { education: newData }, { upsert: false }, (error, results) => {
  //     if (error) {
  //       callBack(error);
  //     }
  //     return callBack(null, results);
  //   }
  //   );
  // },

  // addUpdateStudentExperience: (data, callBack) => {
  //   let newData = {
  //     company: data.company,
  //     location: data.location,
  //     startDate: data.startDate,
  //     endDate: data.endDate,
  //     title: data.title,
  //     description: data.description
  //   }
  //   Student.update({ _id: data.id }, { experience: newData }, { upsert: false }, (error, results) => {
  //     if (error) {
  //       callBack(error);
  //     }
  //     return callBack(null, results);
  //   }
  //   );
  // },

  // getAllStudents: (callBack) => {
  //   Student.find({},
  //     (error, results) => {
  //       if (error) {
  //         callBack(error);
  //       }
  //       return callBack(null, results);
  //     }
  //   );
  // },

  // updateStudentProfilePic: (data, callBack) => {
  //   Student.update({ _id: data.id }, { profilePicURL: data.profilePicURL }, { upsert: false }, (error, results) => {
  //     if (error) {
  //       callBack(error);
  //     }
  //     return callBack(null, results);
  //   }
  //   );
  // },

  // updateContactInformation: (data, callBack) => {
  //   let newData = {
  //     email: data.email,
  //     phone: data.phone
  //   }
  //   Student.update({ _id: data.id }, newData, { upsert: false }, (error, results) => {
  //     if (error) {
  //       callBack(error);
  //     }
  //     return callBack(null, results);
  //   }
  //   );
  // }
}
