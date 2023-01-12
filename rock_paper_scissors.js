const rlSync = require('readline-sync');

const VALID_CHOICES = {
  r:  'rock',
  p:  'paper',
  sc: 'scissors',
  l:  'lizard',
  sp: 'spock'
};

const WINNING_COMBOS = {
  r:  ['lizard', 'scissors'],
  p:  ['rock', 'spock'],
  sc: ['paper', 'lizard'],
  l:  ['paper', 'spock'],
  sp: ['rock', 'scissors']
};

const scorecard = {
  userRoundWins:     0,
  computerRoundWins: 0,
  userMatchWins:     0,
  computerMatchWins: 0,
  resetRoundWins() {
    this.userRoundWins = 0;
    this.computerRoundWins = 0;
  }
};

function prompt(message) {
  console.log(`=> ${message}`);
}

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

function displayWinner(choiceUser, choiceComputer) {
  if (WINNING_COMBOS[choiceUser].includes(VALID_CHOICES[choiceComputer])) {
    prompt('You won!');
  } else if (
    WINNING_COMBOS[choiceComputer].includes(VALID_CHOICES[choiceUser])) {
    prompt('The computer won!');
  } else {
    prompt("It's a tie!");
  }
}

function displayUserAndCompChoices(choiceUser, choiceComputer) {
  prompt(`You chose ${VALID_CHOICES[choiceUser]}, ` +
        `the computer chose ${VALID_CHOICES[choiceComputer]}\n\n`);
}

function incrementRoundScore(choiceUser, choiceComputer) {
  if (WINNING_COMBOS[choiceUser].includes(VALID_CHOICES[choiceComputer])) {
    scorecard.userRoundWins += 1;
  } else if (
    WINNING_COMBOS[choiceComputer].includes(VALID_CHOICES[choiceUser])) {
    scorecard.computerRoundWins += 1;
  }
}

function incrementMatchScore() {
  if (scorecard.userRoundWins === 3) {
    scorecard.userMatchWins += 1;
    scorecard.resetRoundWins();

  } else if (scorecard.computerRoundWins === 3) {
    scorecard.computerMatchWins += 1;
    scorecard.resetRoundWins();
  }
}

function displayRoundScore() {
  if (scorecard.userRoundWins + scorecard.computerRoundWins > 0) {
    prompt(
      `The current round score is: ` +
      `${scorecard.userRoundWins} (You) -- ` +
      `${scorecard.computerRoundWins} (Computer)\n`
    );
  }
}

function displayMatchScore() {
  if (scorecard.computerMatchWins + scorecard.userMatchWins > 0) {
    prompt(
      `The match score is: ` +
      `${scorecard.userMatchWins} (You) -- ` +
      `${scorecard.computerMatchWins} (Computer)\n`
    );
  }
}

function getChoiceToPlayAgain() {
  prompt('Good match! Would you like to play again? (y/n)');
  return rlSync.question().toLowerCase();
}

function validateChoiceToPlayAgain(choice) {
  choice = choice.toLowerCase();

  while (choice !== 'y' && choice !== 'n') {
    prompt('Please enter "y" or "n"');
    choice = rlSync.question().toLowerCase();
  }

  return choice;
}

// TODO:
// Update game loop:
//    0. Display match winner after a match
//    0+ Display grand winner when user quits?
//    1. Figure out a way to console.clear() effectively, without
//    gettig rid of useful info
//    2. Fix validation funcs so they return boolean? Idk if its
//    ok to do reassignment just str8 up in the game loop with while loops

while (true) {
  prompt("Each match is a best of five!");

  displayMatchScore();

  do {
    displayRoundScore();

    let userChoice = getUserChoice();
    userChoice = validateUserChoice(userChoice);

    let computerChoice = generateComputerChoice();

    incrementRoundScore(userChoice, computerChoice);

    displayWinner(userChoice, computerChoice);
    displayUserAndCompChoices(userChoice, computerChoice);

  } while (scorecard.computerRoundWins < 3 && scorecard.userRoundWins < 3);

  incrementMatchScore();

  let playAgain = getChoiceToPlayAgain();
  playAgain = validateChoiceToPlayAgain(playAgain);

  if (playAgain !== 'y' && 'yes') {
    prompt('Goodbye!');
    displayMatchScore();
    break;
  }

  console.clear();
}