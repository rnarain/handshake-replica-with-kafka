const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var studentSchema = new Schema({
        email : String,
        phone : String,
        password : String,
        fname : String,
        lname : String,
        dob : Date,
        skills : String,
        careerObjective : String,
        profilePicURL : String,
        education : [ 
            {
                college : String,
                major : Number,
                yearOfStarting : String,
                yearOfPassing : Date,
                gpa : String,
                degreeType : Number
            }
        ],
        experience : [ 
            {
                company : String,
                location : String,
                startDate : Date,
                endDate : Date,
                title : String,
                description :String 
            }
        ]
    }
    ,
{
    versionKey: false
});


module.exports = mongoose.model('student', studentSchema);