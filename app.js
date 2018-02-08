
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

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

app.use((req, res, next) => {
  console.log('One');
  const err = new Error('Oh noes!');
  err.status = 500;
  next(err);
});
app.use((req, res, next) => {
  console.log('Two');
  next();
});



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
  const name = req.cookies.username;
  if (name) {
    res.redirect('/');
  } else {
    res.render('hello');
  }
});

app.post('/hello', (req, res) => {
  res.cookie('username', req.body.username );
  res.redirect('/');
});

app.post('/goodbye', (req, res) => {
  console.log(req.body.username);
  res.clearCookie('username');
  res.redirect('/hello');
});

app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(500);
  res.render('error');
});

app.listen(3000, () => {
  console.log('Server is running on localhost:3000!');
});
