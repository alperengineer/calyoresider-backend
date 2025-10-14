const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();

// Yükleme yapılacak klasörün yolunu belirle
const uploadDir = 'uploads/';

// Eğer 'uploads' klasörü yoksa oluştur
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Multer için depolama ayarlarını yapılandır
const storage = multer.diskStorage({
    // Dosyanın nereye kaydedileceğini belirtir
    destination: function (req, file, cb) {
        cb(null, uploadDir); // 'uploads/' klasörüne kaydet
    },
    // Dosyanın adının ne olacağını belirtir
    filename: function (req, file, cb) {
        // Dosya adının benzersiz olması için başına tarih ekliyoruz
        // Örnek: 1678886400000-orijinal-dosya-adi.png
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// Multer yapılandırmasını oluştur
const upload = multer({ storage: storage });

// Dosya yükleme endpoint'i
// 'file', frontend'den gönderilen dosyanın anahtar adıdır (formData.append('file', ...))
router.post('/upload', upload.single('file'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Lütfen bir dosya yükleyin.' });
        }
        // Yükleme başarılıysa, istemciye dosya adını geri gönder
        res.status(200).json({
            message: 'Dosya başarıyla yüklendi.',
            filename: req.file.filename // Kaydedilen benzersiz dosya adı
        });
    } catch (error) {
        res.status(500).json({ message: 'Dosya yüklenirken bir hata oluştu.' });
    }
});

module.exports = router;