const BolgeYayin = require('../models/BolgeYayin');

// Herkese açık: Tüm bölge yayınlarını getirir
exports.getTumBolgeYayinlari = async (req, res) => {
    try {
        const yayinlar = await BolgeYayin.find();
        res.status(200).json(yayinlar);
    } catch (error) {
        console.error('HATA - GET TUM BOLGE YAYINLARI:', error);
        res.status(500).json({ message: 'Bölge yayınları alınamadı.', error });
    }
};

// Admin: Yeni bir bölge yayını oluşturur
exports.createBolgeYayin = async (req, res) => {
    try {
        const yeniYayin = new BolgeYayin(req.body);
        await yeniYayin.save();
        res.status(201).json(yeniYayin);
    } catch (error) {
        res.status(500).json({ message: 'Bölge yayını oluşturulurken hata oluştu.', error });
    }
};

// Admin: Mevcut bir bölge yayınını günceller
exports.updateBolgeYayin = async (req, res) => {
    try {
        const yayin = await BolgeYayin.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!yayin) return res.status(404).json({ message: 'Bölge yayını bulunamadı' });
        res.status(200).json(yayin);
    } catch (error) {
        res.status(500).json({ message: 'Bölge yayını güncellenirken hata oluştu.', error });
    }
};

// Admin: Bir bölge yayınını siler
exports.deleteBolgeYayin = async (req, res) => {
    try {
        const yayin = await BolgeYayin.findByIdAndDelete(req.params.id);
        if (!yayin) return res.status(404).json({ message: 'Bölge yayını bulunamadı' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Bölge yayını silinirken hata oluştu.', error });
    }
};