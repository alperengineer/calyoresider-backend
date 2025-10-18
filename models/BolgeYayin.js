const mongoose = require('mongoose');

const bolgeYayinSchema = new mongoose.Schema({
    baslik: { type: String, required: true },
    yazar: { type: String },
    aciklama: { type: String },
    fiyat: { type: Number, default: 0 },
    kapakResmiDosyaAdi: { type: String }
}, {
    collection: 'bolge_yayinlari', // Veritabanındaki koleksiyon adı
    toJSON: {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }
});

module.exports = mongoose.model('BolgeYayin', bolgeYayinSchema);