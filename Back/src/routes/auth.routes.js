const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connection = require('../../connection');
const passport = require('../../helpers/passport');

const router = express.Router();


router.post('/newuser', passport.authenticate('jwt', { session: false }), (req, res) => {
  const formData = {
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 10),
  };
  connection.query('INSERT INTO user SET ?', formData, (err) => {
    if (err) {
      res.status(500).send({ flash: err.message });
    } else {
      res.status(201).send({ flash: 'Votre utilisateur est créé !' });
    }
  });
});

router.post('/login', (req, res) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (!user) {
      return res.status(400).json({ message: info.message });
    }
    const token = jwt.sign(user, 'password', { expiresIn: 3600 });
    return res.status(200).json({ user, token, message: info.message });
  })(req, res);
});

router.get('/valide_token', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.sendStatus(200);
});

module.exports = router;