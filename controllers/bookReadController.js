// controllers/bookReadController.js
const fs = require('fs');
const path = require('path');

exports.getBookPages = (req, res) => {
    // Frontend'den gelen klasör adı (örn: calyoresi_sempozyum)
    const folderName = req.params.folderName;

    // Klasör yolu: backend/uploads/books/klasorAdi
    const directoryPath = path.join(__dirname, '../uploads/books', folderName);

    // 1. Klasör var mı kontrol et
    if (!fs.existsSync(directoryPath)) {
        return res.status(404).json({ message: 'Bu yayına ait dijital içerik bulunamadı.' });
    }

    // 2. Klasörü oku
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Dosya okuma hatası' });
        }

        // 3. Sadece resim dosyalarını al
        let imageFiles = files.filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file));

        // 4. Doğal sıralama yap (1.jpg, 2.jpg, 10.jpg sırası bozulmasın diye)
        imageFiles.sort((a, b) => {
            return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
        });

        // 5. Frontend'e tam URL listesi gönder
        const protocol = req.protocol;
        const host = req.get('host'); // localhost:8080 veya site.com

        const imageUrls = imageFiles.map(file => {
            return `${protocol}://${host}/uploads/books/${folderName}/${file}`;
        });

        res.status(200).json({ pages: imageUrls });
    });
};