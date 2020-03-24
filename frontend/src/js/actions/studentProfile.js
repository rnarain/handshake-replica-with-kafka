import {GET_STUDENT_DATA, CHANGE_NAME ,CHANGE_OBJECTIVE ,CHANGE_CONTACT_INFORMATION ,CHANGE_EDUCATION,CHANGE_EXPERIENCE,
CHANGE_SKILLS  } from "../constants/action-types";

export function getStudentData(payload) {
  console.log("dispatching the getStudentData action")
  return { type: GET_STUDENT_DATA, payload };
}

export function changename(payload) {
  console.log("dispatching the change name action")
  return { type: CHANGE_NAME, payload };
}

export function changeObjective(payload) {
    console.log("dispatching the change objective action")
    return { type: CHANGE_OBJECTIVE, payload };
  }

  export function changeContactInformation(payload) {
    console.log("dispatching the change contact information action")
    return { type: CHANGE_CONTACT_INFORMATION, payload };
  }

  export function changeEducation(payload) {
    console.log("dispatching the change education action")
    return { type: CHANGE_EDUCATION, payload };
  }

  export function changeExperience(payload) {
    console.log("dispatching the change experience action")
    return { type: CHANGE_EXPERIENCE, payload };
  }

  export function changeSkills(payload) {
    console.log("dispatching the change skills action")
    return { type: CHANGE_SKILLS, payload };
  }