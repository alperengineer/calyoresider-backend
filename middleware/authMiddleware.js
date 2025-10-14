// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    // Header'dan token'ı al
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Yetkilendirme reddedildi, token bulunamadı.' });
    }

    const token = authHeader.split(' ')[1];

    try {
        // Token'ı doğrula
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Sonraki adımlarda kullanmak için kullanıcı bilgisini request'e ekle
        next(); // Bir sonraki fonksiyona geç
    } catch (err) {
        res.status(401).json({ message: 'Token geçerli değil.' });
    }
};