const router = require('express').Router();
const { connection } = require('../../connection');
const passport = require('../../helpers/passport');


router.get('/', (req, res) => {
    connection.query('SELECT * from gallery', (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de la récupération de la galerie');
        } else {
            res.json(results);
        }
    });
});


router.post('/', (req, res) => {
    const formData = req.body;
    connection.query('INSERT INTO gallery SET ?', formData, (err, results) => {
        if (err) {
            res.status(500).send("Erreur lors de l'ajout dans la galerie");
        } else {
            connection.query('SELECT * FROM gallery WHERE id = ?', results.insertId, (errTwo, gallery) => {
                if (errTwo) {
                    res.status(500).send('Erreur lors de la récupération de la galerie');
                } else {
                    res.status(201).json(gallery[0]);
                }
            });
        }
    });
});



router.put('/:id', (req, res) => {
    const formData = req.body;
    const idGallery = req.params.id;
    connection.query('UPDATE gallery SET ? WHERE id = ?', [formData, idGallery], (err) => {
        if (err) {
            res.status(500).send('Erreur lors de la modification de la galerie');
            console.log(err.message);
        } else {
            res.sendStatus(200);
        }
    });
});


router.delete('/:id', (req, res) => {
    const idProduct = req.params.id;
    connection.query('DELETE FROM gallery WHERE id = ?', idProduct, (err) => {
        if (err) {
            res.status(500).send(`Erreur lors de la suppression de la galery : ${err.message}`);
        } else {
            res.sendStatus(200);
        }
    });
});

// passport.authenticate('jwt', { session: false }),
module.exports = router;
