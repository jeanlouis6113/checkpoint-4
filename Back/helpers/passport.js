const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const connection = require('../connection');

passport.use(new LocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password',
    session: false,
  },
  ((username, password, cb) => {
    connection.query('SELECT * FROM  user WHERE username = ? ', username, (err, results) => {
      if (err) {
        return cb(err);
      } if (results.length === 0) {
        return cb(null, false, {
          message: 'identifiant ou mot de passe incorrect',
        });
      }
      if (bcrypt.compareSync(password, results[0].password)) {
        const user = { username };
        return cb(null, user, { message: 'Vous êtes bien connecté' });
      }
      return cb(null, false, {
        message: 'identifiant ou mot de passe incorrect',
      });
    });
  }),
));

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'password',
},

((jwtPayload, cb) => cb(null, jwtPayload))));

module.exports = passport;
