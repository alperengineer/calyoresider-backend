// routes/bookReadRoutes.js
const express = require('express');
const router = express.Router();
const { getBookPages } = require('../controllers/bookReadController');

// URL Şeması: /api/books/:folderName/pages
router.get('/:folderName/pages', getBookPages);

module.exports = router;