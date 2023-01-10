const rlSync = require('readline-sync');
const VALID_CHOICES = ['rock', 'paper', 'scissors'];

function prompt(message) {
  console.log(`=> ${message}`);
}

function printResult(choice, computerChoice) {
  if ((choice === 'rock' && computerChoice === 'scissors') ||
    (choice === 'paper' && computerChoice === 'rock')      ||
    (choice === 'scissors' && computerChoice === 'paper')) {

    prompt('You win!');
  } else if ((choice === 'rock' && computerChoice === 'paper')   ||
           (choice === 'paper' && computerChoice === 'scissors') ||
           (choice === 'scissors' && computerChoice === 'rock')) {

    prompt('Computer wins!');
  } else {
    prompt("It's a tie!");
  }
}

while (true) {
  prompt(`Choose one: ${VALID_CHOICES.join(', ')}`);
  let choice = rlSync.question();

  while (!VALID_CHOICES.includes(choice)) {
    prompt("That's not a valid choice.");
    choice = rlSync.question();
  }

  let randomIndex = Math.floor(Math.random() * VALID_CHOICES.length);
  let computerChoice = VALID_CHOICES[randomIndex];

  printResult(choice, computerChoice);

  prompt(`You chose ${choice}, the computer chose ${computerChoice}`);


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