const mongoose = require('mongoose');

const bursBasvuruSchema = new mongoose.Schema({
    // 1. Kişisel Bilgiler
    ad: { type: String, required: true },
    soyad: { type: String, required: true },
    tcKimlik: { type: String, required: true },
    dogumTarihi: { type: Date, required: true },
    babaAdi: { type: String, required: true },
    anaAdi: { type: String, required: true },
    nufusIl: { type: String, required: true },
    nufusIlce: { type: String, required: true },
    nufusKoy: { type: String, required: true },

    // 2. Eğitim Bilgileri
    okulAdi: { type: String, required: true },
    fakulte: { type: String, required: true },
    bolum: { type: String, required: true },
    sinif: { type: String, required: true },
    ogrenciNo: { type: String, required: true },
    baskaBursVarMi: { type: String, default: 'Yok' },
    baskaBursMiktari: { type: String, default: '' },

    // 3. Aile ve Sosyo-Ekonomik Durum
    babaHayatta: { type: String, default: 'Evet' },
    anneHayatta: { type: String, default: 'Evet' },
    anneBabaBirlikte: { type: String, default: 'Birlikte' },
    babaCalisma: { type: String, default: 'Çalışmıyor' },
    anneCalisma: { type: String, default: 'Çalışmıyor' },
    sgk: { type: String, default: 'Yok' },
    aylikGelir: { type: Number, required: true },
    sahipOlunanlar: { type: String, default: '' },
    kardesSayisi: { type: Number, required: true },
    egitimdekiKardesSayisi: { type: Number, required: true },
    kalinacakYer: { type: String, required: true },

    // 4. Referanslar
    referans1: { type: String, required: true },
    referans2: { type: String, required: true },
    referans3: { type: String, required: true },

    // 5. Dosyalar (Sunucudaki dosya isimlerini tutacağız)
    ogrenciBelgesiDosyaAdi: { type: String, required: true },
    nufusOrnegiDosyaAdi: { type: String, required: true },

    // 6. Onaylar ve Sistem Verileri
    taahhutOnay: { type: Boolean, required: true },
    kvkkOnay: { type: Boolean, required: true },
    basvuruTarihi: { type: Date, default: Date.now },

    // Admin panelinde başvurunun durumunu takip etmek için
    durum: {
        type: String,
        enum: ['Bekliyor', 'Onaylandı', 'Reddedildi'],
        default: 'Bekliyor'
    }
}, {
    collection: 'burs_basvurulari',
    timestamps: true // Oluşturulma (createdAt) ve güncellenme (updatedAt) tarihlerini otomatik tutar
});

// Frontend'e gönderirken _id yerine id kullanmak için dönüşüm
bursBasvuruSchema.set('toJSON', {
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

module.exports = mongoose.model('BursBasvuru', bursBasvuruSchema);