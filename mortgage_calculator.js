const rlSync = require('readline-sync');

function prompt(message) {
  console.log(`>> ${message}`);
}

function greetUser() {
  prompt('Welcome to Mortgage Calculator!\n');
}

function isInputValid(userInput) {
  return userInput.trimStart() !== ''   &&
         !isNaN(Number(userInput))      &&
         !(Number(userInput) <= 0)      &&
         Number(userInput) !== Infinity &&
         Number(userInput) !== -Infinity;
}

function formatNumberToHundreths(number) {
  return number.toFixed(2);
}

function formatStringToHundreths(string) {
  return Number(string).toFixed(2);
}

function getPrincipalAmount() {
  prompt('Please enter the principal loan amount:');
  prompt("(Don't comma separate your amount i.e. 10,000 -> 10000)");
  return rlSync.question();
}

function isPrincipalAmountValid(principal) {
  while (!isInputValid(principal)) {
    prompt('Please provide a valid input:');
    principal = rlSync.question();
  }
  return principal;
}

function getDurationMonths() {
  prompt('Please enter the duration of your loan in months:');
  return rlSync.question();
}

function isDurationMonthsValid(months) {
  while (!isInputValid(months)) {
    prompt('Please provide a valid input:');
    months = rlSync.question();
  }

  return months;
}

function durationMonthsToInteger(months) {
  return parseInt(months, 10);
}

function getApr() {
  prompt('Lastly, enter the APR for your loan:');
  prompt ('(Example: 10 for 10%, 6.8 for 6.8%)');
  return rlSync.question();
}

function isAprValid(apr) {
  while (!isInputValid(apr)) {
    prompt('Please provide a valid input:');
    apr = rlSync.question();
  }
  return apr;
}

function calcMonthlyInterest(apr) {
  return ((Number(apr)) / 12) / 100;
}

function calcMonthlyPayment(principal, monthlyInterest, duration) {
  return Number(principal) *
         (Number(monthlyInterest) / (1 - Math.pow(
        (1 + Number(monthlyInterest)), (-Number(duration)))));
}

function calcPaymentTotal(monthlyPayment, durationMonths) {
  return Number(monthlyPayment) * Number(durationMonths);
}

function calcInterestTotal(paymentTotal, principal) {
  return Number(paymentTotal) - Number(principal);
}

function printLoanCalcResult(
  monthlyPayment, durationMonths, paymentTotal,
  principalAmount, interestTotal
) {
  prompt(`Your monthly payment is $${monthlyPayment} occuring ` +
  `over ${durationMonths} months.`);
  prompt('------------------------------------');
  prompt(`Your total payment is $${paymentTotal} ` +
  `($${principalAmount} principal and $${interestTotal} interest).\n`);
}

function askForAnotherCalc() {
  prompt('Would you like to calculate another loan? (y/n)');
  return rlSync.question().toLowerCase();
}

function isCalcAgainValid(calcAgain) {
  return calcAgain === 'y' || calcAgain === 'yes';
}

greetUser();

while (true) {

  let principalAmount = getPrincipalAmount();
  principalAmount = isPrincipalAmountValid(principalAmount);

  let durationMonths = getDurationMonths();
  durationMonths = isDurationMonthsValid(durationMonths);
  durationMonths = durationMonthsToInteger(durationMonths);

  let apr = getApr();
  apr = isAprValid(apr);

  let monthlyInterest = calcMonthlyInterest(apr);

  let monthlyPayment = calcMonthlyPayment(
    principalAmount, monthlyInterest, durationMonths
  );

  let paymentTotal = calcPaymentTotal(monthlyPayment, durationMonths);

  let interestTotal = calcInterestTotal(paymentTotal, principalAmount);

  monthlyPayment = formatNumberToHundreths(monthlyPayment);
  paymentTotal = formatNumberToHundreths(paymentTotal);
  interestTotal = formatNumberToHundreths(interestTotal);
  principalAmount = formatStringToHundreths(principalAmount);

  console.log('\n');

  printLoanCalcResult(
    monthlyPayment, durationMonths, paymentTotal, principalAmount, interestTotal
  );

  let calcAgain = askForAnotherCalc();
  if (!isCalcAgainValid(calcAgain)) break;
  console.clear();
}