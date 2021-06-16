const express = require('express');
const projectController = require('../controllers/projectController');
const router = express.Router();
router.get('/getImages', projectController.getImages);
router.get('/getImage/:id', projectController.getImage);
router.post('/saveImage/:id', projectController.saveImage);
router.post('/checkUser', projectController.checkUser);
router.post('/checkSession', projectController.checkSession);

module.exports = router;