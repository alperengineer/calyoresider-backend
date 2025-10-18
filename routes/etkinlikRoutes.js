const express = require('express');
const router = express.Router();
const { getTumEtkinlikler, getYaklasanEtkinlikler, getEtkinlikById } = require('../controllers/etkinlikController');

router.get('/', getTumEtkinlikler);
router.get('/yaklasan', getYaklasanEtkinlikler);
router.get('/:id', getEtkinlikById);

module.exports = router;