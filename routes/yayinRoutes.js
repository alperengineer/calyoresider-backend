const express = require('express');
const router = express.Router();
const { getTumYayinlar } = require('../controllers/yayinController');

router.get('/', getTumYayinlar);

module.exports = router;