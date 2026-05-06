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
    bursDuyuruAktif: { type: Boolean, default: false },
    bursDuyuruBaslik: { type: String, default: "" },
    bursDuyuruMetin: { type: String, default: "" },
    bursDuyuruResim: { type: String, default: "" },
}, { collection: 'ayarlar' });

module.exports = mongoose.model('Ayarlar', ayarlarSchema);