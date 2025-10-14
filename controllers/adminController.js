const Haber = require('../models/Haber');
const Etkinlik = require('../models/Etkinlik');
const Ayarlar = require('../models/Ayarlar');

// --- Haber Yönetimi ---
exports.createHaber = async (req, res) => {
    try {
        const yeniHaber = new Haber(req.body);
        await yeniHaber.save();
        res.status(201).json(yeniHaber);
    } catch (error) {
        res.status(500).json({ message: 'Haber oluşturulurken hata oluştu.', error });
    }
};

exports.updateHaber = async (req, res) => {
    try {
        const haber = await Haber.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!haber) return res.status(404).json({ message: 'Haber bulunamadı' });
        res.status(200).json(haber);
    } catch (error) {
        res.status(500).json({ message: 'Haber güncellenirken hata oluştu.', error });
    }
};

exports.deleteHaber = async (req, res) => {
    try {
        const haber = await Haber.findByIdAndDelete(req.params.id);
        if (!haber) return res.status(404).json({ message: 'Haber bulunamadı' });
        res.status(204).send(); // No Content
    } catch (error) {
        res.status(500).json({ message: 'Haber silinirken hata oluştu.', error });
    }
};

// --- Ayarlar Yönetimi ---
// Java'daki saveAyarlar mantığının aynısı: Var olan tek ayar dökümanını bul ve güncelle
exports.updateAyarlar = async (req, res) => {
    try {
        const ayarlar = await Ayarlar.findOneAndUpdate({}, req.body, {
            new: true,          // Güncellenmiş dökümanı döndür
            upsert: true,       // Eğer döküman yoksa oluştur
            runValidators: true
        });
        res.status(200).json(ayarlar);
    } catch (error) {
        res.status(500).json({ message: 'Ayarlar güncellenirken hata oluştu.', error });
    }
};

// --- Etkinlik Yönetimi ---
// Etkinlik için create, update, delete fonksiyonları da Haber'dekine benzer şekilde buraya eklenebilir.