const router = require('express').Router();
const { connection } = require('../../connection');
const passport = require('../../helpers/passport');


router.get('/', (req, res) => {
  connection.query('SELECT * FROM date WHERE date >= CURDATE() ORDER BY date', (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des dates');
    } else {
      res.json(results);
    }
  });
});

router.post('/', passport.authenticate('jwt', { session: false }),  (req, res) => {
  const formData = req.body;
  connection.query('INSERT INTO date SET ?', formData, (err) => {
    if (err) {
      res.status(500).send("Erreur lors de l'ajout d'une date");
    } else {
      res.sendStatus(200);
    }
  });
});

router.put('/:id',passport.authenticate('jwt', { session: false }),  (req, res) => {
  const formData = req.body;
  const idDate = req.params.id;
  connection.query('UPDATE date SET ? WHERE id = ?', [formData, idDate], (err) => {
    if (err) {
      res.status(500).send('Erreur lors de la modification d une date ');
    } else {
      res.sendStatus(200);
    }
  });
});

router.delete('/:id',passport.authenticate('jwt', { session: false }),  (req, res) => {
  const idDate = req.params.id;
  connection.query('DELETE FROM date WHERE id = ?', idDate, (err) => {
    if (err) {
      res.status(500).send('Erreur lors de la suppression d une date ');
    } else {
      res.sendStatus(200);
    }
  });
});

module.exports = router;
