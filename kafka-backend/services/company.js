const Company = require('../Models/CompanyModel');
const Student = require("../Models/StudentModel");

function handle_request(msg, callBack) {
  console.log(msg);
  if (msg.path === "create_company") {
    let data=msg.data;
    var newCompany = new Company({
        name: data.name,
        email: data.email,
        phone : data.phone,
        password : data.password,
        city : data.city,
        description : data.description,
      })
      Company.findOne({ email: data.email }, (error, user) => {
        if (error) {
          callBack(error);
        }
        if (user) {
          return callBack("User already exists");
        }
        else {
          newCompany.save((error, data) => {
            if (error) {
              callBack(error);
            }
            console.log(data);
            return callBack(null, data);
          })
        }
      })
  }
  else if (msg.path === "company_login") {
    let data=msg.data;
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
  }
  else if (msg.path === "get_company_profile_details") {
    Company.find({ _id: msg.id }, (error, result) => {
        if (error) {
          callBack(error);
        }
        console.log(result);
        return callBack(null, result);
      });
  }
  else if (msg.path === "update_company_details") {
    let data=msg.data;
    var newData = {
        name: data.name,
        description: data.description,
        city : data.city,
        email: data.email,
        phone : data.phone
      }
  
      Company.update({ _id: data.id }, newData, { upsert: false }, (error, results) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
      );
  }
  else if (msg.path === "update_company_profile_pic") {
    let data=msg.data;
    Company.update({ _id: data.id }, { profilePicURL: data.profilePicURL }, { upsert: false }, (error, results) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
      );
  }
  else if (msg.path === "get_all_students") {
    Student.find({},
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