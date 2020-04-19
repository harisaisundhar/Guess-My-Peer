function Node(data, y, n) {
    this.data = data;
    this.yes = y;
    this.no = n;
  }
  
  var readlineSync = require('readline-sync');
  var fs = require("fs");

  var words = ["That's great!", "You know my peers!", "Let's play again!", "One more try!"];
  var word = words[Math.floor(Math.random() * words.length)];  

  var thanks = ["Thanks!", "Nice one!"];
  var thank = thanks[Math.floor(Math.random() * words.length)];

  var playAgain = ["Let's play again!", "That was fun, let's play again!"]
  var playAgainLoad = playAgain[Math.floor(Math.random() * words.length)];
  
  var tree = fs.readFileSync('data.json');
  var root = JSON.parse(tree);
  var node;
  
  console.log('Welcome to the game buddies!');
  
  // Play the game
  while (ask("Do you want to play?")) {
    node = root;
    play();
  }
  
  function play() {
    while (node.yes && node.no) {
      if (ask(node.data)) {
        node = node.yes;
      } else {
        node = node.no;
      }
    }
    if (!ask("Is it " + node.data + "?")) {
      train(node);
    } else {
      console.log(word);
    }
  }
  
  function ask(question) {
    var answer = readlineSync.question(question + " (y/n): ").toUpperCase();
    return (answer.charAt(0) == "Y");
  }

  function train(node) {
    var guess = node.data;
    var answer = readlineSync.question("Ok, Who are you? ");
    var question = readlineSync.question("Suggest a yes/no question to distinguish yourself " + guess + " from a " + answer + ".\n");
    node.data = question;
    if (ask("Answer for a " + answer + ": " + question)) {
      node.yes = new Node(answer);
      node.no = new Node(guess);
      console.log(thank);
      console.log ("Great! Now I know about " + answer + "s !");
      console.log(playAgainLoad);
    } else {
      node.yes = new Node(guess);
      node.no = new Node(answer);
    }
    var tree = JSON.stringify(root, null, 2);
    fs.writeFileSync('data.json', tree);
  }