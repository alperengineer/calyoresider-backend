// routes/haberRoutes.js
const express = require('express');
const router = express.Router();
const { getTumHaberler, getHaberById, getSonHaberler } = require('../controllers/haberController');

router.get('/', getTumHaberler);
router.get('/son-haberler', getSonHaberler); // Özel route'ları dinamik olanlardan önce tanımla!
router.get('/:id', getHaberById);

module.exports = router;