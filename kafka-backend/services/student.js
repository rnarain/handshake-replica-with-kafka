const Student = require('../Models/StudentModel');

function handle_request(msg, callBack) {
  console.log(msg);
  if (msg.path === "get_student_details") {
    Student.findById(msg.id, (error, result) => {
      if (error) {
        callBack(error);
      }
      console.log(result);
      return callBack(null, result);
    });
  }
  else if (msg.path === "create_student") {
    let data = msg.data;
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
      education: {
        college: data.college,
        yearOfPassing: data.yearOfPassing,
        major: data.major,
        yearOfStarting: null,
        gpa: 0,
        degreeType: null
      },
      experience:
      {
        company: null,
        location: null,
        startDate: null,
        endDate: null,
        title: null,
        description: null
      }
    });

    Student.findOne({ email: data.email }, (error, user) => {
      if (error) {
        callBack(error);
      }
      if (user) {
        return callBack("User already exists");
      }
      else {
        newStudent.save((error, data) => {
          if (error) {
            callBack(error);
          }
          console.log(data);
          return callBack(null, data);
        })
      }
    })
  }
  else if (msg.path === "student_login") {
    let data = msg.data;
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
  }
  else if (msg.path === "update_student_name") {
    let data = msg.data;
    var newData = {
      fname: data.fname,
      lname: data.lname
    }
    Student.update({ _id: data.id }, newData, { upsert: false }, (error, results) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results);
    }
    );
  }
  else if (msg.path === "update_student_profile_pic") {
    let data = msg.data;
    Student.update({ _id: data.id }, { profilePicURL: data.profilePicURL }, { upsert: false }, (error, results) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results);
    }
    );
  }
  else if (msg.path === "update_objective") {
    let data = msg.data;
    Student.update({ _id: data.id }, { careerObjective: data.careerObjective, }, { upsert: false }, (error, results) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results);
    }
    );
  }
  else if (msg.path === "add_education") {
    let data = msg.data;
    let newData = {
      college: data.college,
      major: data.major,
      yearOfStarting: data.yearOfStarting,
      yearOfPassing: data.yearOfPassing,
      gpa: data.gpa,
      degreeType: data.degreeType,
    }
    Student.update({ _id: data.id }, { $push: { education: newData } }, { upsert: false }, (error, results) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results);
    }
    );
  }
  else if (msg.path === "update_education") {
    let data = msg.data;
    Student.update({ _id: data.id, 'education._id': data.educationId },
      {
        "$set":
        {
          'education.$.college': data.college,
          'education.$.major': data.major,
          'education.$.yearOfStarting': data.yearOfStarting,
          'education.$.yearOfPassing': data.yearOfPassing,
          'education.$.gpa': data.gpa,
          'education.$.degreeType': data.degreeType,
        }
      }, (error, results) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  }
  else if (msg.path === "delete_education") {
    let data = msg.data;
    Student.update({ _id: data.id },
      { "$pull": { 'education': { _id: data.educationId } } },
      (error, result) => {

        if (error) {
          callBack(error);
        }
        return callBack(null, result);
      });
  }
  else if (msg.path === "add_experience") {
    let data = msg.data;
    let newData = {
      company: data.company,
      location: data.location,
      startDate: data.startDate,
      endDate: data.endDate,
      title: data.title,
      description: data.description
    }
    Student.update({ _id: data.id }, { $push: { experience: newData } }, { upsert: false }, (error, results) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results);
    }
    );
  }
  else if (msg.path === "update_experience") {
    let data = msg.data;
    Student.update({ _id: data.id, 'experience._id': data.experienceId },
      {
        "$set":
        {
          'experience.$.company': data.company,
          'experience.$.location': data.location,
          'experience.$.startDate': data.startDate,
          'experience.$.endDate': data.endDate,
          'experience.$.title': data.title,
          'experience.$.description': data.description
        }
      }, (error, results) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  }
  else if (msg.path === "delete_experience") {
    let data = msg.data;
    Student.update({ _id: data.id },
      { "$pull": { 'experience': { _id: data.experienceId } } },
      (error, result) => {

        if (error) {
          callBack(error);
        }
        return callBack(null, result);
      });
  }
  else if (msg.path === "update_skills") {
    let data = msg.data;
    Student.update({ _id: data.id }, { skills: data.skills }, { upsert: false }, (error, results) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results);
    }
    );
  }
  else if (msg.path === "update_student_contact_information") {
    let data = msg.data;
    let newData = {
      email: data.email,
      phone: data.phone
    }
    Student.update({ _id: data.id }, newData, { upsert: false }, (error, results) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results);
    }
    );
  }
  else if (msg.path === "get_all_student_except_self") {
    Student.find({ _id: { $ne: msg.id } },
      (error, results) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  }
};

exports.handle_request = handle_request;