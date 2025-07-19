// index.js
const app = require('./server');
app.listen(3000, () => {
  console.log('Server running.....');
  // Adding a Snyk issue to test flow
const userInput = "console.log('Hacked!')";
eval(userInput); 
});