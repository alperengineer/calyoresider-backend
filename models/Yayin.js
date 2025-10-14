const mongoose = require('mongoose');

const yayinSchema = new mongoose.Schema({
    baslik: { type: String, required: true },
    yazar: { type: String },
    aciklama: { type: String },
    urunTipi: { type: String, default: 'Kitap' },
    fiyat: { type: Number, default: 0 },
    kapakResmiDosyaAdi: { type: String }
}, {
    collection: 'yayinlar',
    toJSON: {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }
});

module.exports = mongoose.model('Yayin', yayinSchema);