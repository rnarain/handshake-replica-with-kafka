const router = require("express").Router();
const passport = require('passport');



// const { checkToken } = require("../../auth/token_validation");
const {
  createMessage,
    getMessages,
    addMessage


} = require("./message.controller");

let checkAuth = passport.authenticate('jwt', { session: false });
// router.get("/", checkToken, getUsers);
//  router.post("/createStudent", createStudent);
 router.get("/getMessages/:id", getMessages);
//  router.get("/getAllStudents", checkAuth,getAllStudents);

 



// router.get("/:id", checkToken, getUserByUserId);
// router.post("/login", login);
// router.patch("/", checkToken, updateUsers);
// router.delete("/", checkToken, deleteUser);

module.exports = router;