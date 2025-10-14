const mongoose = require('mongoose');

const etkinlikSchema = new mongoose.Schema({
    baslik: {
        type: String,
        required: true
    },
    icerik: {
        type: String,
        required: true
    },
    etkinlikTarihi: {
        type: Date,
        required: true
    },
    konum: {
        type: String
    }
}, {
    collection: 'etkinlikler',
    toJSON: {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }
});

module.exports = mongoose.model('Etkinlik', etkinlikSchema);