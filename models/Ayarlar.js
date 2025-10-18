const mongoose = require('mongoose');

const ayarlarSchema = new mongoose.Schema({
    jumbotronBaslik: { type: String, default: "Derneğimize Hoş Geldiniz" },
    jumbotronMetin: { type: String, default: "Kültürel mirasımızı korumak için buradayız." },
    hakkimizdaBaslik: { type: String, default: "Hakkımızda" },
    hakkimizdaIcerik: { type: String, default: "Derneğimiz hakkında detaylı bilgi." },
    yonetimKurulu: { type: [String], default: [] },
    adres: { type: String, default: "" },
    telefon: { type: String, default: "" },
    email: { type: String, default: "" },
}, { collection: 'ayarlar' });

// Ayarlar koleksiyonunda her zaman tek bir döküman olmasını sağlamak için
// bu model "singleton" mantığıyla kullanılacak.
module.exports = mongoose.model('Ayarlar', ayarlarSchema);