'use strict';

var traceur = require('traceur');
var Tree = traceur.require(__dirname + '/../models/tree.js');  //__dirname is the directory you're in right now; bring in our user class

exports.plant = (req, res)=>{
  Tree.plant(req.body.userId, tree=>{
    res.render('trees/tree', {tree:tree});
  });
};

exports.forest = (req, res)=>{
  Tree.findAllByUserId(req.query.userId, trees=>{
    res.render('trees/forest', {trees:trees});
  });
};

exports.grow = (req, res)=>{
  Tree.findByTreeId(req.params.treeId, tree=>{  //find the tree in the db
    tree.grow();  //make the tree grow
    tree.save(()=>{
      res.render('trees/tree', {tree:tree});
    });  //save the tree to the database
  });
};

exports.chop = (req, res)=>{
  Tree.findByTreeId(req.params.treeId, tree=>{
    tree.chop();
    tree.save(()=>{
      res.render('trees/tree', {tree:tree});
    });  //save the tree to the database, passes tree to game.js so it can render
  });
};
