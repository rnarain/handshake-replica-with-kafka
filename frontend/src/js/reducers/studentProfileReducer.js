import {GET_STUDENT_DATA, CHANGE_NAME ,CHANGE_OBJECTIVE ,CHANGE_CONTACT_INFORMATION ,CHANGE_EDUCATION,CHANGE_EXPERIENCE,
  CHANGE_SKILLS  } from "../constants/action-types";
const initialState = {
    fname : null,
    lname : null,
    email : null,
    phone : null,
    dob : null,
    skills : null,
    careerObjective : null,
    profilePicURL : null,
    education : 
        {
            college : null,
            yearOfPassing : null,
            major : null,
            yearOfStarting : null,
            gpa : null,
            degreeType : null
        },
    experience : {
      company : null,
      location : null,
      startDate : null,
      endDate : null,
      title : null,
      description : null
    },
};

function studentProfileReducer(state = initialState, action) {
    if(action.type === GET_STUDENT_DATA){
        console.log(action.payload);
        return Object.assign({}, state, action.payload);
    }
    else if(action.type === CHANGE_NAME){
      console.log(action.payload);
      return Object.assign({}, state, {
          fname: action.payload.fname,
          lname: action.payload.lname
      });
    }
    else if(action.type === CHANGE_OBJECTIVE){
      console.log(action.payload);
      return Object.assign({}, state, {
        careerObjective: action.payload.careerObjective,
      });
    }
    else if(action.type === CHANGE_CONTACT_INFORMATION){
      console.log(action.payload);
      return Object.assign({}, state, {
          email: action.payload.email,
          phone: action.payload.phone
      });
    }
    else if(action.type === CHANGE_EDUCATION){
      console.log(action.payload);
      return Object.assign({}, state, {
          education:{
            college : action.payload.college,
            yearOfPassing : action.payload.yearOfPassing,
            major : action.payload.major,
            yearOfStarting : action.payload.yearOfStarting,
            gpa : action.payload.gpa,
            degreeType : action.payload.degreeType
          } 
      });
    }
    else if(action.type === CHANGE_EXPERIENCE){
      console.log(action.payload);
      return Object.assign({}, state, {
        experience: {
          company :action.payload.company ,
          location :action.payload.location ,
          startDate :action.payload.startDate ,
          endDate :action.payload.endDate ,
          title :action.payload.title ,
          description: action.payload.description,
        }
      });
    }
    else if(action.type === CHANGE_SKILLS){
      console.log(action.payload);
      return Object.assign({}, state, {
          skills: action.payload.skills
      });
    }
    return state;
  }
  
export default studentProfileReducer;