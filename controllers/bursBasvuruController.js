const BursBasvuru = require('../models/BursBasvuru');

// Frontend'den gelen başvuruyu kaydet (Herkese Açık)
exports.createBasvuru = async (req, res) => {
    try {
        const mevcutBasvuru = await BursBasvuru.findOne({ tcKimlik: req.body.tcKimlik });
        if (mevcutBasvuru) {
            // 409 Conflict: Sistemde çakışma/kopya durumu
            return res.status(409).json({ message: 'Bu TC Kimlik numarası ile sisteme daha önce bir başvuru yapılmış.' });
        }

        // --- 2. Dosya Kontrolü ---
        if (!req.files || !req.files['ogrenciBelgesi'] || !req.files['nufusOrnegi']) {
            return res.status(400).json({ message: 'Lütfen Öğrenci Belgesi ve Nüfus Kayıt Örneği belgelerini yükleyin.' });
        }

        // FormData'dan gelen string boolean değerleri gerçek boolean'a çevir
        const taahhutOnay = req.body.taahhutOnay === 'true';
        const kvkkOnay = req.body.kvkkOnay === 'true';

        // Veritabanı için objeyi toparla
        const basvuruVerisi = {
            ...req.body,
            taahhutOnay,
            kvkkOnay,
            ogrenciBelgesiDosyaAdi: req.files['ogrenciBelgesi'][0].filename,
            nufusOrnegiDosyaAdi: req.files['nufusOrnegi'][0].filename
        };

        const yeniBasvuru = new BursBasvuru(basvuruVerisi);
        await yeniBasvuru.save();

        res.status(201).json({ message: 'Başvuru başarıyla alındı.', basvuru: yeniBasvuru });
    } catch (error) {
        console.error("Burs başvuru kayıt hatası:", error);
        res.status(500).json({ message: 'Başvuru kaydedilirken bir hata oluştu.', error: error.message });
    }
};

// İleride Admin panelinde başvuruları listelemek için (Sadece Admin)
exports.getTumBasvurular = async (req, res) => {
    try {
        const basvurular = await BursBasvuru.find().sort({ createdAt: -1 }); // En yeniler en üstte
        res.status(200).json(basvurular);
    } catch (error) {
        res.status(500).json({ message: 'Başvurular alınamadı.', error: error.message });
    }
};