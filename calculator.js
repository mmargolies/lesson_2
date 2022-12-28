// ask user for first number
// ask user for second number
// aks user for type of operator to perform (+, -, *, /)
// perform operation on both numbers
// display result
const rlSync = require('readline-sync');

console.log('Welcome to Calculator!');

console.log("What's the first number?");
let number1 = Number(rlSync.question());

console.log("What's the second number?");
let number2 = Number(rlSync.question());

console.log('What operation would you like to perform?\n1) Add 2) Subtract 3) Multiply 4) Divide');
let operation = rlSync.question();

let output;
if (operation === '1') { // 1 represents addition
  output = number1 + number2;
} else if (operation === '2') { // 2 represents subtration
  output = number1 - number2;
} else if (operation === '3') { // 3 represents multiplication
  output = number1 * number2;
} else if (operation === '4') { // 4 represents division
  output = number1 / number2;
} else {
  console.log('Please choose a valid option.');
}

console.log(`The result is: ${output}`);