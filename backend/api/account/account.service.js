const pool = require("../../config/database");
// 0 - student 1- employer
module.exports = {

  createStudent: (data, callBack) => {
    pool.getConnection(function (err, connection) {
      connection.beginTransaction(() => {
        connection.query('insert into account(type, email, password) values(?,?,?)',
          [
            0,
            data.email,
            data.password
          ],
          (err, results) => {
            if (err) {          //Query Error (Rollback and release connection)
              connection.rollback(function () {
                return callBack(err);
              });
            }
            else {
              connection.query('select accountID from account where email = ? ',
                [
                  data.email,
                ],
                (err, result) => {
                  if (err) {          //Query Error (Rollback and release connection)
                    connection.rollback(function () {
                      return callBack(err);
                    });
                  }
                  else {
                    let accountID= result[0].accountID;
                    //insert in student profile
                        connection.query('insert into studentprofile(accountID, fname ,lname) values(?,?,?)',
                                  [
                                    accountID,
                                    data.fname,
                                    data.lname
                                  ],
                                  (err, results) => {
                                    if (err) {          //Query Error (Rollback and release connection)
                                      connection.rollback(function () {
                                        return callBack(err);
                                      });
                                    }
                                    else {
                                      //get studentID
                                            connection.query('select studentID from studentprofile where accountID = ? ',
                                        [
                                          accountID
                                        ],
                                        (err, results) => {
                                         
                                          if (err) {          //Query Error (Rollback and release connection)
                                            connection.rollback(function () {
                                              return callBack(err);
                                            });
                                        }
                                        else {
                                          let studentID = results[0].studentID;
                                          console.log(studentID);

                                          //insert into education table
                                          connection.query('insert into education(studentID,college,major,yearOfPassing ) values(?,?,?,?)',
                                                          [
                                                            studentID,
                                                            data.college,
                                                            data.major,
                                                            data.yearOfPassing
                                                          ],
                                          (err, results) => {
                                            if (err) {          //Query Error (Rollback and release connection)
                                              connection.rollback(function () {
                                                return callBack(err);
                                              });
                                            }
                                            else{
                                              connection.commit(function (err) {
                                                if (err) {
                                                  connection.rollback(function () {
                                                    connection.release();
                                                    //Failure
                                                    callBack(err);
                                                  });
                                                } else {
                                                  connection.release();
                                                  return callBack(null, results);
                                                  //Success
                                                }
                                              });
                                            }
                                          });
                                        }
                                      });
                                    }
                                  });
                                }
                              });
                            }

            });
        });
    });
  },


      // createStudent: (data, callBack) => {
      //   pool.query(
      //     `insert into account(type, email, password) 
      //               values(?,?,?)`,
      //     // `-- start a new transaction
      //     // START TRANSACTION;

      //     // -- insert into account
      //     // insert into account(type, email, password) values(?,?,?);

      //     // -- get accountID
      //     // SET @accountid = ( select accountID from  account where email = ? );

      //     // -- insert into 
      //     // insert into studentprofile(accountID, fname ,lname) 
      //     //               values(@accountid,?,?);

      //     // COMMIT;`,
      //     [
      //       0,
      //       data.email,
      //       data.password,
      //     ],
      //     (accounterror, accountresults) => {
      //       if (accounterror) {
      //         callBack(accounterror);
      //       }
      //       console.log(accountresults);
      //       return callBack(null,accountresults);
      //       // else {
      //       //   //create studentProfile & education
      //       //   pool.query(
      //       //     `insert into studentprofile(accountID, fname ,lname) 
      //       //               values(?,?,?)`,
      //       //     [
      //       //       accountresults.accountID,
      //       //       data.fname,
      //       //       data.lname
      //       //     ],
      //       //     (studenterror, studentresults) => {
      //       //       if (studenterror) {
      //       //         callBack(studenterror);
      //       //       }
      //       //       else {
      //       //         pool.query(
      //       //           `insert into education(studentID,college,major,yearOfPassing ) 
      //       //                     values(?,?,?,?)`,
      //       //           [
      //       //             studentresults.accountID,
      //       //             data.college,
      //       //             data.major,
      //       //             data.yearOfPassing
      //       //           ],
      //       //           (educationerror, educationresults) => {
      //       //             if (educationerror) {
      //       //               callBack(educationerror);
      //       //             }
      //       //             return callBack(null, educationresults);
      //       //           }
      //       //         );
      //       //       }
      //       //     }
      //       //   );
      //       // }
      //     }
      //   );
      // },

      login: (data, callBack) => {
        console.log(data);
        pool.query(
          `SELECT type FROM account where email = ? LIMIT 1`,
          [
            data.email,
          ],
          (error, results) => {
            if (error) {
              callBack(error);
            }
            else{
              if(results[0].type ==0 ){
                pool.query(
                  `SELECT SP.studentID as id,AC.password, AC.type FROM account As AC Join studentprofile AS SP on AC.accountID = SP.accountID where email = ?`,
                  [
                    data.email
                  ],
                  (error, result) => {
                    if (error) {
                      callBack(error);
                    }
                    return callBack(null, result);
                  }
                );
              }
              else{
                pool.query(
                  `SELECT CP.companyID as id,AC.password, AC.type FROM account As AC Join companyprofile AS CP on AC.accountID = CP.accountID where email = ?`,
                  [
                    data.email,
                  ],
                  (error, result) => {
                    if (error) {
                      callBack(error);
                    }
                  return callBack(null, result);
                }
                );
              }
            }
            //return callBack(null, results);
          }
        );
      },

      getStudentProfileDetails :(id,callBack)=>{
        pool.query(
          `select * from studentprofile where studentID= ? `,
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
      getEducationDetails :(id,callBack)=>{
        pool.query(
          `select * from education where studentID= ? `,
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
      getExperienceDetails :(id,callBack)=>{
        pool.query(
          `select * from experience where studentID= ? `,
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
      getAccountDetails :(accountID,callBack)=>{
        pool.query(
          `select * from account where accountID= ? `,
          [
            accountID
          ],
          (error, results) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results);
          }
        );
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
        if(data.educationID =="" || data.educationID == null){
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
       
       else{
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
        if(data.experienceID =="" || data.experienceID == null){
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
       
       else{
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

      getAllStudents :(callBack)=>{
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
      getCompanyProfileDetails :(id,callBack)=>{
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
      updateCompanyProfilePic :(data, callBack) => {
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

      updateStudentProfilePic :(data, callBack) => {
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

      updateCompanyDetails :(data, callBack) => {
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

      updateContactInformation :(data, callBack) => {
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
