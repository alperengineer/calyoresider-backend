const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
    getTumBolgeYayinlari,
    createBolgeYayin,
    updateBolgeYayin,
    deleteBolgeYayin
} = require('../controllers/bolgeYayinController');

// Herkese açık rota
router.get('/', getTumBolgeYayinlari);

// Admin için korumalı rotalar
router.post('/', authMiddleware, createBolgeYayin);
router.put('/:id', authMiddleware, updateBolgeYayin);
router.delete('/:id', authMiddleware, deleteBolgeYayin);

module.exports = router;