const Yayin = require('../models/Yayin');

exports.getTumYayinlar = async (req, res) => {
    try {
        const yayinlar = await Yayin.find();
        res.status(200).json(yayinlar);
    } catch (error) {
        res.status(500).json({ message: 'Yayınlar alınamadı.', error });
    }
};