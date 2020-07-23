const router = require('express').Router();
const multer = require('multer');
const { connection } = require('../../connection');
const passport = require('../../helpers/passport');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploaded-images');
  },
  filename: (req, file, cb) => {
    let filename = `${Date.now()}-${file.originalname}`;
    if (req.params.category === 'accueil') {
      filename = 'Accueil.jpg';
    }
    cb(null, filename);
  },
});

const upload = multer({ storage }).single('file');


router.post('/:image',  (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(500).json(err);
    } else if (req.params.image === 'gallery') {
      const filename = { filename: res.req.file.filename };
      connection.query('INSERT INTO gallery SET ?', filename, (errTwo) => {
        if (errTwo) {
          res.status(500).send("Erreur lors de l'ajout de l'image en base de données");
          console.log(errTwo.message);
        } else {
          connection.query('SELECT * FROM gallery WHERE filename= ?', filename.filename, (errThree, pic) => {
            if (errThree) {
              res.status(500).send('Erreur lors du retour de la base de données');
            } else {
              res.status(201).json(pic[0]);
            }
          });
        }
      });
    } else {
      res.status(201).json({ filename: req.file.filename });
    }
  });
});

module.exports = router;
