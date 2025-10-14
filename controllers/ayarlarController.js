const Ayarlar = require('../models/Ayarlar');

exports.getAyarlar = async (req, res) => {
    try {
        // Her zaman ilk (ve tek) ayar dökümanını bulmaya çalış
        let ayarlar = await Ayarlar.findOne();

        // Eğer veritabanında hiç ayar yoksa, varsayılan bir tane oluştur.
        if (!ayarlar) {
            ayarlar = new Ayarlar(); // Varsayılan değerlerle yeni bir döküman oluştur
            await ayarlar.save();
        }

        res.status(200).json(ayarlar);
    } catch (error) {
        res.status(500).json({ message: 'Ayarlar alınırken bir hata oluştu.', error });
    }
};