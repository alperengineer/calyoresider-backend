// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware'); // Middleware'i import et
const { createHaber, updateHaber, deleteHaber } = require('../controllers/adminController'); // Controller'ları import et

// Haber Yönetimi
router.post('/haberler', authMiddleware, createHaber);
router.put('/haberler/:id', authMiddleware, updateHaber);
router.delete('/haberler/:id', authMiddleware, deleteHaber);

// Diğer admin rotaları...

module.exports = router;