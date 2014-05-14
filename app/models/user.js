'use strict';

var users = global.nss.db.collection('users');

class User{
  constructor(username){
    this.username = username;
    this.wood = 0;
    this.cash = 0;
  }  //the purpose of a constructor is to create a brand new thing

  static login(username, fn){
    username = username.trim().toLowerCase();
    users.findOne({username:username}, (e,user)=>{  //we are finding the username entered
      if(user){    //if the user name entered exists, return run User.login with user as the parameter
        fn(user);
      }else{
        user = new User(username);  //calling the constructor, which creates objects
        users.save(user, (e, u)=>{
          fn(user);
        });
      }
    });

  }
}

module.exports = User;
