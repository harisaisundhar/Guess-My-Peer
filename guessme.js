function Node(data, y, n) {
    this.data = data;
    this.yes = y;
    this.no = n;
  }
  
  var readlineSync = require('readline-sync');
  var fs = require("fs");
  
  var tree = fs.readFileSync('tree.json');
  var root = JSON.parse(tree);
  var node;
  
  console.log('Welcome to the game buddies!');
  
  // Play the game
  while (ask("Do you want to play?")) {
    node = root;
    play();
  }
  