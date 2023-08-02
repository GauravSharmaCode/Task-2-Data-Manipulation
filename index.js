//Task-2
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let numbers = [];

app.get('/', (req, res) => {
  res.send(`
    <html>
    <head>
      <title>Number Sum Calculator</title>
    </head>
    <body>
      <h1>Number Sum Calculator</h1>
      <form action="/addNumber" method="post">
        <label for="numberInput">Enter an integer:</label>
        <input type="number" id="numberInput" name="number" required>
        <button type="submit">Add Number</button>
      </form>
      <form action="/calculateSum" method="get">
        <button type="submit">Calculate Sum</button>
      </form>
      <p id="result">${req.query.sum ? `Sum of the numbers: ${req.query.sum}` : ''}</p>
    </body>
    </html>
  `);
});

app.post('/addNumber', (req, res) => {
  const number = parseInt(req.body.number);

  if (!isNaN(number)) {
    numbers.push(number);
  }

  res.redirect('/');
});

app.get('/calculateSum', (req, res) => {
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  res.redirect(`/?sum=${sum}`);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
