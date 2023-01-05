const rlSync = require('readline-sync');

function prompt(message) {
  console.log(`>> ${message}`);
}

function validateInput(userInput) {
  return userInput.trimStart() === ''   ||
         isNaN(Number(userInput))       ||
         (Number(userInput) <= 0)       ||
         Number(userInput) === Infinity ||
         Number(userInput) === -Infinity;
}

prompt('Welcome to Mortgage Calculator!\n');

while (true) {
  prompt('Please enter the principal loan amount:');
  prompt("(Don't comma separate your amount i.e. 10,000 -> 10000)");
  let principalAmount = rlSync.question();

  while (validateInput(principalAmount)) {
    prompt('Please provide a valid input:');
    principalAmount = rlSync.question();
  }

  prompt('Please enter the duration of your loan in months:');
  let durationMonths = rlSync.question();

  while (validateInput(durationMonths)) {
    prompt('Please provide a valid input:');
    durationMonths = rlSync.question();
  }

  prompt('Lastly, enter the APR for your loan:');
  prompt ('(Example: 10 for 10%, 6.8 for 6.8%)');
  let apr = rlSync.question();

  while (validateInput(apr)) {
    prompt('Please provide a valid input:');
    apr = rlSync.question();
  }

  let monthlyInterest = ((Number(apr)) / 12) / 100;

  let monthlyPayment = Number(principalAmount) *
                    (monthlyInterest / (1 - Math.pow(
                    // eslint-disable-next-line indent
                    (1 + monthlyInterest), (-Number(durationMonths)))));

  let paymentTotal = monthlyPayment * Number(durationMonths);
  let interestTotal = paymentTotal - Number(principalAmount);

  monthlyPayment = monthlyPayment.toFixed(2);
  paymentTotal = paymentTotal.toFixed(2);
  interestTotal = interestTotal.toFixed(2);
  principalAmount = Number(principalAmount).toFixed(2);

  prompt(`Your monthly payment is $${monthlyPayment} occuring over \
${durationMonths} months.`);

  prompt(`Your total payment is $${paymentTotal} ($${principalAmount} \
principal and $${interestTotal} interest).`);

  prompt('Would you like to calculate another loan? (y/n)');
  let calcAgain = rlSync.question().toLowerCase();

  if (calcAgain[0] !== 'y' || calcAgain !== 'yes') break;
}