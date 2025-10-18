const express = require('express');
const router = express.Router();
const { getAyarlar } = require('../controllers/ayarlarController');

router.get('/', getAyarlar);

module.exports = router;