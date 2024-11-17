"use strict";
const Models = require("../models");

//LOGIN, find user and check password
const loginUser = (req, res) => {
  const { email, password } = req.body;

  console.log("userController - loginUser", req.body);

  //find user by email
  Models.User.findOne({ where: { email } })
    .then((foundUser) => {
      if (foundUser) {
        //check if password is correct
        if (foundUser.password === password) {
          res.status(200).json({ result: "success", data: foundUser });
        } else {
          res.status(401).json({ result: "Password is incorrect :(" });
        }
      } else {
        res
          .status(404)
          .json({ result: "Email not found. Create a free account!" });
      }
    })
    .catch((err) => {
      console.log("userController - loginUser:", err);
      res.status(500).json({ result: "Error", error: err.message });
    });
};

//SIGNUP - create new user if username and email does not exist
const signupUser = (req, res) => {
  const { username, email, password } = req.body;

  console.log("userController - signupUser");

  // check if email exists
  Models.User.findOne({ where: { email } })
    .then((existingUser) => {
      if (existingUser) {
        return res.status(400).json({ result: "That email already in use." });
      }

      // create new user
      Models.User.create({ username, email, password })
        .then((newUser) => {
          // welcome message to greet on successful signup
          res.status(201).json({
            result: `Welcome to Cinnefiles, ${newUser.username}!`,
            data: newUser,
          });
        })
        .catch((err) => {
          console.log("userController - signupUser:", err);
          res.status(500).json({
            result: "Error",
            error: `Failed to create user. Please try again later. Error: ${err.message}`,
          });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        result: "Error",
        error: `Error while checking email availability. Error: ${err.message}`,
      });
    });
};

//GET all users from database
const getAllUsers = (req, res) => {
  console.log("userController - getAllUsers");

  Models.User.findAll()
    .then((users) => {
      if (users.length > 0) {
        res.status(200).json({
          result: "success",
          data: users,
        });
      } else {
        // if no users are found
        res.status(404).json({
          result: "No users found.",
        });
      }
    })
    .catch((err) => {
      console.log("userController - getAllUsers:", err);
      res.status(500).json({
        result: "Error",
        error: `Failed to fetch users. Please try again later. Error: ${err.message}`,
      });
    });
};

module.exports = {
  loginUser,
  signupUser,
  getAllUsers,
};
