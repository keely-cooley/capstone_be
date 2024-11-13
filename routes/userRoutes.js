const express = require("express");
const userRouter = express.Router();
const Controllers = require("../controllers");

//POST http://localhost:8083/login
userRouter.post("/login", (req, res) => {
  console.log("login", req.body)
  Controllers.userController.loginUser(req, res);
});

// POST http://localhost:8083/signup
userRouter.post("/signup", (req, res) => {
  Controllers.userController.signupUser(req, res);
});

//GET http://localhost:8083/users
userRouter.get("/users", (req, res) => {
  Controllers.userController.getAllUsers(req, res);
});

module.exports = userRouter;
