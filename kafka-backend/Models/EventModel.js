const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var eventSchema = new Schema({
    date : {type : Date , required : true},
    time : {type : String , required : true},
    name : {type : String , required : true},
    description : {type : String , required : true},
    companyID : {type : String , required : true},
    companyName : {type : String , required : true},
    majorsEligible : {type : String , required : true},
    location : {type : String , required : true},
    participants : [
        {
            studentID : {type : String , required : true} ,
            studentName :{type : String , required : true} 
        }
    ]
}
    ,
    {
        versionKey: false
    });


module.exports = mongoose.model('event', eventSchema);