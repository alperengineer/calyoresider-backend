const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
    getTumYayinlar,
    createYayin,
    updateYayin,
    deleteYayin
} = require('../controllers/yayinController');

// Herkese açık rota
router.get('/', getTumYayinlar);

// Admin için korumalı rotalar
router.post('/', authMiddleware, createYayin);
router.put('/:id', authMiddleware, updateYayin);
router.delete('/:id', authMiddleware, deleteYayin);

module.exports = router;