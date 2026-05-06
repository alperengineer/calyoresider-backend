const mongoose = require('mongoose');

const bolgeYayinSchema = new mongoose.Schema({
    baslik: { type: String, required: true },
    yazar: { type: String },
    aciklama: { type: String },
    fiyat: { type: Number, default: 0 },
    kapakResmiDosyaAdi: { type: String },
    okunabilirMi: { type: Boolean, default: false },
    okumaKlasoru: { type: String, default: "" }
}, {
    collection: 'bolge_yayinlari', // Veritaban覺ndaki koleksiyon ad覺
    toJSON: {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }
});

module.exports = mongoose.model('BolgeYayin', bolgeYayinSchema);