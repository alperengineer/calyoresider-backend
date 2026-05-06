// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { 
    createHaber, updateHaber, deleteHaber,
    createEtkinlik, updateEtkinlik, deleteEtkinlik, // Yeni eklenenler
    updateAyarlar 
} = require('../controllers/adminController');

// Haber Yönetimi
router.post('/haberler', authMiddleware, createHaber);
router.put('/haberler/:id', authMiddleware, updateHaber);
router.delete('/haberler/:id', authMiddleware, deleteHaber);

// Etkinlik Yönetimi (404 HATASINI BURASI ÇÖZECEK)
router.post('/etkinlikler', authMiddleware, createEtkinlik);
router.put('/etkinlikler/:id', authMiddleware, updateEtkinlik);
router.delete('/etkinlikler/:id', authMiddleware, deleteEtkinlik);

// Ayarlar Yönetimi
router.put('/ayarlar', authMiddleware, updateAyarlar);

module.exports = router;