const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const authMiddleware = require('../middleware/authMiddleware');
const { createBasvuru, getTumBasvurular } = require('../controllers/bursBasvuruController');

// Burs belgeleri için özel klasör yolu
const uploadDir = 'uploads/burs_belgeleri/';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer ayarları
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const tcKimlik = req.body.tcKimlik || 'BilinmeyenTC';
        const uzanti = path.extname(file.originalname);

        const yeniDosyaAdi = `${tcKimlik}-${file.fieldname}${uzanti}`;

        cb(null, yeniDosyaAdi);
    }
});

const upload = multer({ storage: storage });

// Hangi dosyaların kabul edileceğini belirtiyoruz
const multipleUploads = upload.fields([
    { name: 'ogrenciBelgesi', maxCount: 1 },
    { name: 'nufusOrnegi', maxCount: 1 }
]);

// --- ROTALAR ---

// Ziyaretçilerin başvuru yapması için (Korumasız, Herkese Açık)
// multipleUploads middleware'i dosyaları alır, createBasvuru ise veritabanına kaydeder.
router.post('/', multipleUploads, createBasvuru);

// Adminlerin başvuruları listelemesi için (Korumalı)
router.get('/', authMiddleware, getTumBasvurular);

module.exports = router;