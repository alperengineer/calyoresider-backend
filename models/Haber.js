// models/Haber.js
const mongoose = require('mongoose');

const haberSchema = new mongoose.Schema({
    baslik: {
        type: String,
        required: true,
        trim: true
    },
    icerik: {
        type: String,
        required: true
    },
    yayinTarihi: {
        type: Date,
        default: Date.now
    }
}, {
    collection: 'haberler',
    toJSON: {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }
});

// Model'i oluştur ve dışa aktar
// MongoDB'de 'haberler' adında bir koleksiyon oluşturacak
module.exports = mongoose.model('Haber', haberSchema);