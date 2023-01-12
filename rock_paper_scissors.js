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

function isUserChoiceValid(choice) {
  return Object.keys(VALID_CHOICES).includes(choice.toLowerCase());
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

function displayRoundScore() {
  if (scorecard.userRoundWins + scorecard.computerRoundWins > 0) {
    prompt(
      `The current round score is: ` +
      `${scorecard.userRoundWins} (You) -- ` +
      `${scorecard.computerRoundWins} (Computer)\n`
    );
  }
}

function clearAfterEachRound() {
  rlSync.question(
    '(Press Enter to continue...)', {hideEchoBack: true, mask: ''}
  );
  console.clear();
}

function resetRoundScore() {
  scorecard.resetRoundWins();
}

function incrementMatchScore() {
  if (scorecard.userRoundWins === 3) {
    scorecard.userMatchWins += 1;

  } else if (scorecard.computerRoundWins === 3) {
    scorecard.computerMatchWins += 1;
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

function displayMatchWinner() {
  if (scorecard.userRoundWins === 3) {
    prompt('You won the match -- congradualtions! :)\n');
  } else {
    prompt('The computer won the match -- better luck next time!\n');
  }
}

function getChoiceToPlayAgain() {
  prompt('Would you like to play again? (y/n)');
  return rlSync.question().toLowerCase();
}

function isChoiceToPlayAgainValid(choice) {
  choice = choice.toLowerCase();

  return choice === 'y'   ||
         choice === 'yes' ||
         choice === 'n'   ||
         choice === 'no';
}

function displayGrandWinner() {
  if (scorecard.userMatchWins > scorecard.computerMatchWins) {
    prompt("You're the Grand Winner!! See you next time!");
  } else if (scorecard.userMatchWins < scorecard.computerMatchWins) {
    prompt("The computer is the Grand Winner...\nAre you gonna let that slide??");
  } else {
    prompt("The Grand Winner is...no one!\nYou sure you're ok with a tie?");
  }
}

// GAME LOOP
while (true) {
  prompt("Each match is a best of five rounds!\n");
  displayMatchScore();

  do {
    displayRoundScore();

    let userChoice = getUserChoice();

    while (!isUserChoiceValid(userChoice)) {
      prompt("That's not a valid choice.");
      userChoice = rlSync.question();
    }

    let computerChoice = generateComputerChoice();

    incrementRoundScore(userChoice, computerChoice);

    displayWinner(userChoice, computerChoice);
    displayUserAndCompChoices(userChoice, computerChoice);

    clearAfterEachRound();

  } while (scorecard.computerRoundWins < 3 && scorecard.userRoundWins < 3);

  displayMatchWinner();
  incrementMatchScore();
  resetRoundScore();

  let playAgain = getChoiceToPlayAgain();
  while (!isChoiceToPlayAgainValid(playAgain)) {
    prompt('Please enter "y" or "n"');
    playAgain = rlSync.question().toLowerCase();
  }

  if (playAgain !== 'y' && playAgain !== 'yes') {
    displayGrandWinner();
    break;
  }

  console.clear();
}