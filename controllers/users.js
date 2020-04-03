const express = require('express');
const router = express.Router();
const models = require('../models');
const bcrypt = require('bcryptjs');
const auth = require('../helpers/auth.js');

router.get('/sign-up', (req, res) => {
  res.render('application', {
    locals: {
      user: req.user
    },
    partials: {
      yield: 'views/users/sign-up.html'
    }
  });
})
.post('/sign-up', (req, res) => {
  console.log(req.body);
  models.User.create(req.body, {fields: ['username', 'email', 'password']})
  .then((user) => {
    const token = auth.generateToken(user);
    res.cookie('movie_press_token', token, { httpOnly: true, maxAge: 86400000});
    res.redirect('/');
  }).catch((error) => {
    console.log(error);
    return res.status(500);
  });
})
.get('/sign-out', (req, res) => {
  res.clearCookie('movie_press_token');
  res.redirect('/');
})
.get('/sign-in', (req, res) => {
  res.render('application', {
    locals: {
      user: req.user
    },
    partials: {
      yield: 'views/users/sign-in.html'
    }
  })
})
.post('/sign-in', (req, res) =>  {
  models.User.findOne({ where: { email: req.body.email }})
  .then((user) => {
    return bcrypt.compare(req.body.password, user.password)
    .then((match) => {
      const token = auth.generateToken(user);
      res.cookie('movie_press_token', token, {httpOnly: true, maxAge: 86400000});
      res.redirect('/');
    }).catch((error) => {
      return res.status(401)
    })
  }).catch((error) => {
    return res.status(500)
  })
});

module.exports = router;
