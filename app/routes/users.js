'use strict';

var traceur = require('traceur');
var User = traceur.require(__dirname + '/../models/user.js');  //__dirname is the directory you're in right now; bring in our user class

exports.login = (req, res)=>{
  User.login(req.body.username, user => {  //this inputs user into the function in user.js
    res.render('users/dashboard', {user:user});
  });
};
