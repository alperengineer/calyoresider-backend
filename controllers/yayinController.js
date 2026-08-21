const Yayin = require('../models/Yayin');

// Herkese Açık: Tüm yayınları getirir
exports.getTumYayinlar = async (req, res) => {
    try {
        const yayinlar = await Yayin.find();
        res.status(200).json(yayinlar);
    } catch (error) {
        res.status(500).json({ message: 'Yayınlar alınamadı.', error });
    }
};

// Admin: Yeni Yayın Oluştur
exports.createYayin = async (req, res) => {
    try {
        const yeniYayin = new Yayin(req.body);
        await yeniYayin.save();
        res.status(201).json(yeniYayin);
    } catch (error) {
        res.status(500).json({ message: 'Yayın oluşturulurken hata oluştu.', error });
    }
};

// Admin: Yayını Güncelle
exports.updateYayin = async (req, res) => {
    try {
        const yayin = await Yayin.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!yayin) return res.status(404).json({ message: 'Yayın bulunamadı' });
        res.status(200).json(yayin);
    } catch (error) {
        res.status(500).json({ message: 'Yayın güncellenirken hata oluştu.', error });
    }
};

// Admin: Yayını Sil
exports.deleteYayin = async (req, res) => {
    try {
        const yayin = await Yayin.findByIdAndDelete(req.params.id);
        if (!yayin) return res.status(404).json({ message: 'Yayın bulunamadı' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Yayın silinirken hata oluştu.', error });
    }
};