'use strict'
const Models = require("../models")

//LOGIN, find user and check password
const loginUser = (req, res) => {
    const { emailId, password } = req.body;

    console.log('loginController - login user', req.body)

    //find user by emailId
    Models.User.findOne({ where: { emailId } })
    .then((foundUser) => {
        if (foundUser) {
            //check if password is correct
            if (foundUser.password === password) {
                res.status(200).json({result: "success"});
            } else {
                res.status(401).json({result: "Password is incorrect :("});
            } 
        } else {
            res.status(404).json({result: "Email not found. Create a free account!" })
        }
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({ result: "Error", error: err.message });
    });
};

//SIGNUP - create new user if username and email does not exist
const signupUser = (req, res) => {
    const { username, emailId, password } = req.body;
  
    // check if email exists
    Models.User.findOne({ where: { emailId } })
      .then((existingUser) => {
        if (existingUser) {
          return res.status(400).json({ result: "Email already in use." });
        }
  
        // create new user
        Models.User.create({ username, emailId, password })
          .then((newUser) => {
            // welcome message to greet on successful signup
            res.status(201).json({
              result: `Welcome to Cinnefiles, ${newUser.username}!`,
              data: newUser,
            });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({ 
                result: "Error", 
                error: `Failed to create user. Please try again later. Error: ${err.message}` ,
            });
          });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ 
            result: "Error", 
            error: `Error while checking email availability. Error: ${err.message}` ,
        });
      });
  };

module.exports = {
    loginUser,
    signupUser
}