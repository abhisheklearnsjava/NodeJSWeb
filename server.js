const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// New route with a linting issue: unused variable
app.get('/ping', (req, res) => {
  const unused = 42; // ESLint will warn about 'unused' being defined but never used
  const newUnused =30;
  const password="asd@dfds123";
  res.send('pong');
});

// app.listen(3000, () => {
//   console.log(`Server running at http://localhost:3000`);
// });

module.exports = app;
