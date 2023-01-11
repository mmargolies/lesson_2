const rlSync = require('readline-sync');
// const VALID_CHOICES = ['rock' , 'paper', 'scissors', 'lizard', 'spock'];
const VALID_CHOICES = {
  r: 'rock',
  p: 'paper',
  sc: 'scissors',
  l: 'lizard',
  sp: 'spock'
};

const WINNING_COMBOS = {
  r: ['lizard', 'scissors'],
  p: ['rock', 'spock'],
  sc: ['paper', 'lizard'],
  l: ['paper', 'spock'],
  sp: ['rock', 'scissors']
};

function prompt(message) {
  console.log(`=> ${message}`);
}

/* function displayWinner(userChoice, computerChoice) {
  if ((userChoice === 'rock' && computerChoice === 'scissors') ||
    (userChoice === 'paper' && computerChoice === 'rock')      ||
    (userChoice === 'scissors' && computerChoice === 'paper')) {

    prompt('You win!');
  } else if ((userChoice === 'rock' && computerChoice === 'paper')   ||
           (userChoice === 'paper' && computerChoice === 'scissors') ||
           (userChoice === 'scissors' && computerChoice === 'rock')) {

    prompt('Computer wins!');
  } else {
    prompt("It's a tie!");
  }
} */

function getUserChoice() {
  prompt(`Choose one: ${Object.values(VALID_CHOICES).join(', ')}`);
  prompt('Please enter your choice as an abbreviation:');
  prompt(`(${Object.keys(VALID_CHOICES).join(', ')})`);
  return rlSync.question();
}

function validateUserChoice(choice) {
  while (!Object.keys(VALID_CHOICES).includes(choice.toLowerCase())) {
    prompt("That's not a valid choice.");
    choice = rlSync.question();
  }
  return choice;
}

function generateComputerChoice() {
  let choices = Object.keys(VALID_CHOICES);
  let randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

function displayWinner(userChoice, computerChoice) {
  if (WINNING_COMBOS[userChoice].includes(VALID_CHOICES[computerChoice])) {
    prompt('You won!');
  } else if (
    WINNING_COMBOS[computerChoice].includes(VALID_CHOICES[userChoice])) {
    prompt('The computer won!');
  } else {
    prompt("It's a tie!");
  }
}

while (true) {
  let userChoice = getUserChoice();
  userChoice = validateUserChoice(userChoice);

  let computerChoice = generateComputerChoice();

  displayWinner(userChoice, computerChoice);

  prompt(`You chose ${VALID_CHOICES[userChoice]}, ` +
        `the computer chose ${VALID_CHOICES[computerChoice]}\n`);

  prompt('Would you like to play again? (y/n)');
  let answer = rlSync.question().toLowerCase();
  while (answer !== 'y' && answer !== 'n') {
    prompt('Please enter "y" or "n"');
    answer = rlSync.question().toLowerCase();
  }

  if (answer !== 'y') {
    prompt('Goodbye!');
    break;
  }
  console.clear();
}

/* while (true) {
  prompt(`Choose one: ${Object.values(VALID_CHOICES).join(', ')}`);
  prompt('Please enter your choice as an abbreviation:');
  prompt(`(${Object.keys(VALID_CHOICES).join(', ')})`);
  let userChoice = rlSync.question();

  while (!VALID_CHOICES.includes(userChoice)) {
    prompt("That's not a valid choice.");
    userChoice = rlSync.question();
  }

  let randomIndex = Math.floor(Math.random() * VALID_CHOICES.length);
  let computerChoice = VALID_CHOICES[randomIndex];

  displayWinner(userChoice, computerChoice);

  prompt(`You chose ${userChoice}, the computer chose ${computerChoice}\n`);


  prompt('Would you like to play again? (y/n)');
  let answer = rlSync.question().toLowerCase();
  while (answer !== 'y' && answer !== 'n') {
    prompt('Please enter "y" or "n"');
    answer = rlSync.question().toLowerCase();
  }

  if (answer !== 'y') {
    prompt('Goodbye!');
    break;
  }
  console.clear();
} */