
const express = require('express');
const bodyParser = require('body-parser');
const objects = require('./objects.js');

const app = express();

const colors = [
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'purple'
];

const friends = [
  {
      firstName: 'Mallory',
      lastName: 'Burke'
  },
  {
      firstName: 'Sylvia',
      lastName: 'Neil'
  },
  {
      firstName: 'Cameron',
      lastName: 'Phillips'
  },
  {
      firstName: 'Ralph',
      lastName: 'Porche'
  },
];

app.use(bodyParser.urlencoded({ extended: false}));

app.set('view engine','pug');

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/cards', (req, res) => {
  res.render('card', {prompt: "Who is buried in Grant's tomb?", hint:
 "Think about who's tomb it is", colors});
});

app.get('/sandbox', (req, res) => {
  res.render('sandbox', {friends});
});

app.get('/hello', (req, res) => {
  res.render('hello', {});
});
app.post('/hello', (req, res) => {
  res.render('hello', { name: req.body.username });
});

app.listen(3000, () => {
  console.log('Server is running on localhost:3000!');
});
