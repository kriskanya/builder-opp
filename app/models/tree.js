'use strict';

// var users = global.nss.db.collection('users');
var trees = global.nss.db.collection('trees');
// var users = global.nss.db.collection('users');
var Mongo = require('mongodb');
var _ = require('lodash');



class Tree{
  constructor(userId){
    this.userId = userId;    //this is a mongoid object
    this.height = 0;
    this.isHealthy = true;
    this.isChopped = false;
  }

  grow(){
    if(!this.isChopped){
    this.height += _.random(0,2);
    this.isHealthy = _.random(0,100) !== 71;
    }
  }

  chop(){
    if(this.height >= 24){
    this.isChopped = true;
    }
  }

  save(fn){
    trees.save(this, ()=>fn());  //you are trying to save something, and it may take a long time for the database to call you back when
    //you finish saving it; the db will call this function back; once the db calls me, I'm going to call the function 'fn' that was passed in
  }

  getClass(){  //this is an instance method, meaning it's a function you run on the instance itself
    var classes = [];
    if(this.height === 0){
      classes.push('seed');
    } else if(this.height < 12){
      classes.push('sapling');
    } else if(this.height < 24){
      classes.push('treenager');
    } else{
      classes.push('adult');
    }

    if(!this.isHealthy){
      classes.push('dead');
    } else{
      classes.push('alive');
    }

    if(this.isChopped){
      classes.push('stump');
    }

    return classes.join(' ');  //takes the array, turns it into a string, and inserts a space between all the values

  }

  static findByTreeId(treeId, fn){
    treeId = Mongo.ObjectID(treeId);
    trees.findOne({_id:treeId}, (e, tree)=>{
      tree = _.create(Tree.prototype, tree);  //instead of thinking he's an Object, he now thinks he's a tree
      fn(tree);

    });  //find the tree based on it's id; once it's found, do the callback function
  }


  static findAllByUserId(userId, fn){
    userId = Mongo.ObjectID(userId);
    trees.find({userId:userId}).toArray((e,objs)=>{
      var forest = objs.map(o=>_.create(Tree.prototype, o));  //creates a new prototype
      fn(forest);
    });
  }

  static plant(userId, fn){
    userId = Mongo.ObjectID(userId);  //the string comes in from req.body, the string turns into an object id
      var tree = new Tree(userId);  //you are creating a new tree object, passing in the parameters for the userId
      trees.save(tree, ()=>{    //save the tree, once it's saved...
        fn(tree);  //the callback function wanted me to call it back and give it a tree
    });

  }
}

//   addWood(userId, fn){
//     userId = Mongo.ObjectID(userId);  //the string comes in from req.body, the string turns into an object id
//     users.findOne({_id:userId}, (e, user)=>{
//       user.wood += 50;
//       console.log(user);
//       user.save(user, ()=>{
//         fn(user);
//       });
//   });
// }

module.exports = Tree;
