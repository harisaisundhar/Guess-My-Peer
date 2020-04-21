  var print = require('readline-sync');
  var fs = require("fs");

  function Inp(data, y, n) {
    this.data = data;
    this.tru = y;
    this.fal = n;
  }
 
  function play() {
    while (temp.tru && temp.fal) {
      if (ask(temp.data)) {
        temp = temp.tru;
      } else {
        temp = temp.fal;
      }
    }
    if (ask("Is it you " + temp.data + "?")) {
        console.log("Mass ah !");
    } else {
        train(temp);
    }
  }

  function ask(question) {
    var answer = print.question(question + " (y/n): ").toUpperCase();
    if(answer.charAt(0) == "Y"){
        return true;
    } else {
        return false;
    }
  }

  function train(temp) {
    var guess = temp.data;
    var answer = print.question("Ok, Who are you? ");
    var question = print.question("Suggest a question to distinguish yourself " + guess + " from a " + answer + ".\n");
    temp.data = question;
    temp.tru = new Inp(answer);
    temp.fal = new Inp(guess);
    console.log("Nandrigal");
    console.log ("Great! Now I know about you " + answer);
    console.log("Another Try");
    var data = JSON.stringify(root, null, 2);
    fs.writeFileSync('data.json', data);
  }

  var data = fs.readFileSync('data.json');
  var root = JSON.parse(data);
  var temp;
  
  console.log('Welcome to the game buddies!');
  
  while (ask("Do you want to play?")) {
    temp = root;
    play();
  }