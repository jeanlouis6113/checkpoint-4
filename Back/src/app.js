const express = require('express');
require('dotenv').config();
const router = require('./routes/index.routes');
const passport = require('../helpers/passport');
const app = express();
const cors = require('cors');

const corsOptions = {
  origin: process.env.CLIENT_APP_ORIGIN,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use('/images', express.static('public/uploaded-images'));

app.use('/api', router);

app.get('/galleryadmin', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.send(req.user);
});


module.exports = app;
