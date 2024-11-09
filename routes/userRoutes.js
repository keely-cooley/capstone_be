const express = require('express');
const userRouter = express.Router();
const Controllers = require('../controllers')

//localhost:8083/login
userRouter.post("/login", (req, res) => {
    Controllers.userController.loginUser(req, res);
  });
  
  // localhost:8083/signup
  userRouter.post("/signup", (req, res) => {
    Controllers.userController.signupUser(req, res);
  });
  
  module.exports = userRouter;