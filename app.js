
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
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
app.use(cookieParser());

app.set('view engine','pug');

app.get('/', (req, res) => {
  const name = req.cookies.username;
  if (name) {
    res.render('index', {name});
  } else {
    res.redirect('/hello');
  }
});

app.get('/cards', (req, res) => {
  res.render('card', {prompt: "Who is buried in Grant's tomb?", hint:
 "Think about who's tomb it is", colors});
});

app.get('/sandbox', (req, res) => {
  res.render('sandbox', {friends});
});

app.get('/hello', (req, res) => {
  res.render('hello', { name: req.cookies.username});
});
app.post('/hello', (req, res) => {
  res.cookie('username', req.body.username );
  res.redirect('/');
});

app.listen(3000, () => {
  console.log('Server is running on localhost:3000!');
});
