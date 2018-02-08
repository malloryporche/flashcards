const express = require('express');
const router = express.Router();

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

router.get('/', (req, res) => {
  const name = req.cookies.username;
  if (name) {
    res.render('index', {name});
  } else {
    res.redirect('/hello');
  }
});

router.get('/cards', (req, res) => {
  res.render('card', {prompt: "Who is buried in Grant's tomb?", hint:
 "Think about who's tomb it is", colors});
});

router.get('/sandbox', (req, res) => {
  res.render('sandbox', {friends});
});

router.get('/hello', (req, res) => {
  const name = req.cookies.username;
  if (name) {
    res.redirect('/');
  } else {
    res.render('hello');
  }
});

router.post('/hello', (req, res) => {
  res.cookie('username', req.body.username );
  res.redirect('/');
});

router.post('/goodbye', (req, res) => {
  console.log(req.body.username);
  res.clearCookie('username');
  res.redirect('/hello');
});

module.exports = router;
