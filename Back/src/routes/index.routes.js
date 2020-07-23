const router = require('express').Router();
const authRouter = require('./auth.routes');
const contactRouter = require('./contact.routes');
const dateRouter = require('./date.routes');
const galleryRouter = require('./gallery.routes');
const uploadRouter = require('./upload.routes');




router.use('/auth', authRouter);
router.use('/contact', contactRouter);
router.use('/date', dateRouter);
router.use('/gallery', galleryRouter);
router.use('/upload', uploadRouter);


module.exports = router;