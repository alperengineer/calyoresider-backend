// controllers/haberController.js
const Haber = require('../models/Haber'); // Model'i import et

// @GetMapping -> /api/haberler
exports.getTumHaberler = async (req, res) => {
    try {
        const haberler = await Haber.find().sort({ yayinTarihi: -1 }); // En yeniden eskiye sırala
        res.status(200).json(haberler);
    } catch (error) {
        res.status(500).json({ message: 'Sunucu hatası', error });
    }
};

// @GetMapping -> /api/haberler/:id
exports.getHaberById = async (req, res) => {
    try {
        const haber = await Haber.findById(req.params.id);
        if (!haber) {
            return res.status(404).json({ message: 'Haber bulunamadı' });
        }
        res.status(200).json(haber);
    } catch (error) {
        res.status(500).json({ message: 'Sunucu hatası', error });
    }
};

// @GetMapping -> /api/haberler/son-haberler
// HaberRepository'deki findTop2ByOrderByYayinTarihiDesc() karşılığı
exports.getSonHaberler = async (req, res) => {
    try {
        const sonHaberler = await Haber.find().sort({ yayinTarihi: -1 }).limit(2);
        res.status(200).json(sonHaberler);
    } catch (error) {
        res.status(500).json({ message: 'Sunucu hatası', error });
    }
};