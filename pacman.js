// Setup initial game stats
var score = 0;
var lives = 4;
var powerPellet = 4;


// Define your ghosts here
var inky = {
  menu_option: '1',
  name: 'Inky',
  colour: 'Red',
  character: 'Shadow',
  edible: false
};

var blinky = {
  menu_option: '2',
  name: 'Blinky',
  colour: 'Cyan',
  character: 'Speedy',
  edible: false
};

var pinky = {
  menu_option: '3',
  name: 'Pinky',
  colour: 'Pink',
  character: 'Bashful',
  edible: false
};

var clyde = {
  menu_option: '4',
  name: 'Clyde',
  colour: 'Orange',
  character: 'Pokey',
  edible: false
};

var ghosts = [ inky, blinky, pinky, clyde ];


// Draw the screen functionality
function drawScreen() {
  clearScreen();
  setTimeout(function() {
    displayStats();
    displayMenu();
    displayPrompt();
  }, 10);
}

function clearScreen() {
  console.log('\x1Bc');
}

function displayStats() {
  console.log('Score: ' + score + '     Lives: ' + lives + '     Power-Pellets: ' + powerPellet);
}

function displayMenu(eatGhost) {
  console.log('\n\nSelect Option:\n');  // each \n creates a new line
  console.log('(d) Eat Dot');
  console.log('(p) Eat Power-Pellet');
  console.log('(1) Eat Inky' + ' ' + '(' + edibleStatus (inky) +')');
  console.log('(2) Eat Blinky' + ' ' + '(' + edibleStatus(blinky) +')');
  console.log('(3) Eat Pinky' + ' ' + '(' + edibleStatus(pinky) +')');
  console.log('(4) Eat Clyde' + ' ' + '(' + edibleStatus(clyde) +')');
  console.log('(q) Quit');
}

function displayPrompt() {
  // process.stdout.write is similar to console.log except it doesn't add a new line after the text
  process.stdout.write('\nWaka Waka :v '); // :v is the Pac-Man emoji.
}


// Menu Options
function eatDot() {
  console.log('\nChomp!');
  score += 10;
}

function edibleStatus(ghost) {
  // return ghost.edible
  if (ghost.edible === true) {
    return 'edible'
  }
  else {
    return 'inedible'
  }
}

function eatPowerPellet() {
  if (powerPellet < 1) {
    console.log('\nNo Power-Pellets left!');}
  else {
    score += 50;
    ghosts[0].edible = true;
    ghosts[1].edible = true;
    ghosts[2].edible = true;
    ghosts[3].edible = true;
    powerPellet -= 1;
  }
}

function eatGhost(ghost) {
  if (ghost.edible === true) {
    ghost.edible = false;
    console.log('\nYou have eaten ' + ghost.name + ' ' + ghost.character + '!');
    score += 200;
  }
  else {
    console.log('\nYou have been killed by ' + ghost.name + ' ' + ghost.colour + '!');
    lives -= 1;
    gameOver(lives);
  }
}

function gameOver(lives) {
  if (lives < 1) {
    process.exit();
  }
}


// Process Player's Input
function processInput(key) {
  switch(key) {
    case '\u0003': // This makes it so CTRL-C will quit the program
    case 'q':
      process.exit();
      break;
    case 'd':
      eatDot();
      break;
      case 'p':
        eatPowerPellet();
        break;
    case '1':
      eatGhost(ghosts[0]);
      break;
    case '2':
      eatGhost(ghosts[1]);
      break;
    case '3':
      eatGhost(ghosts[2]);
      break;
    case '4':
      eatGhost(ghosts[3]);
      break;
    default:
      console.log('\nInvalid Command!');
  }
}


//
// YOU PROBABLY DON'T WANT TO CHANGE CODE BELOW THIS LINE
//

// Setup Input and Output to work nicely in our Terminal
var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

// Draw screen when game first starts
drawScreen();

// Process input and draw screen each time player enters a key
stdin.on('data', function(key) {
  process.stdout.write(key);
  processInput(key);
  setTimeout(drawScreen, 1000); // The command prompt will flash a message for 300 milliseoncds before it re-draws the screen. You can adjust the 300 number to increase this.
});

// Player Quits
process.on('exit', function() {
  console.log('\n\nGame Over!\n');
});
