const express = require('express');
const router = express.Router();
const { handleIletisimForm } = require('../controllers/iletisimController');

router.post('/', handleIletisimForm);

module.exports = router;