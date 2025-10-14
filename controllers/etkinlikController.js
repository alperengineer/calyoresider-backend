const Etkinlik = require('../models/Etkinlik');

exports.getTumEtkinlikler = async (req, res) => {
    try {
        const etkinlikler = await Etkinlik.find().sort({ etkinlikTarihi: -1 });
        res.status(200).json(etkinlikler);
    } catch (error) {
        console.error('HATA - GET TUM ETKINLIKLER:', error); // Hata kaydı eklendi
        res.status(500).json({ message: 'Etkinlikler alınırken bir hata oluştu.', error });
    }
};

exports.getEtkinlikById = async (req, res) => {
    try {
        const etkinlik = await Etkinlik.findById(req.params.id);
        if (!etkinlik) {
            return res.status(404).json({ message: 'Etkinlik bulunamadı' });
        }
        res.status(200).json(etkinlik);
    } catch (error) {
        console.error('HATA - GET ETKINLIK BY ID:', error); // Hata kaydı eklendi
        res.status(500).json({ message: 'Sunucu hatası', error });
    }
};

exports.getYaklasanEtkinlikler = async (req, res) => {
    try {
        const etkinlikler = await Etkinlik.find({
            etkinlikTarihi: { $gte: new Date() }
        }).sort({ etkinlikTarihi: 1 });

        res.status(200).json(etkinlikler);
    } catch (error) {
        // ### BU SATIR EN ÖNEMLİSİ ###
        console.error('HATA - GET YAKLASAN ETKINLIKLER:', error);
        res.status(500).json({ message: 'Etkinlikler alınırken bir hata oluştu.', error });
    }
};