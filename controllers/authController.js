// controllers/authController.js
const AdminUser = require('../models/AdminUser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    // --- YENİ EKLENEN LOGLAR ---
    console.log("Login isteği geldi. Gelen body:", req.body);
    // ----------------------------

    const { username, password } = req.body;

    // Gelen verinin eksik olup olmadığını kontrol et
    if (!username || !password) {
        return res.status(400).json({ message: 'Kullanıcı adı ve şifre alanları zorunludur.' });
    }

    try {
        const user = await AdminUser.findOne({ username });

        // --- YENİ EKLENEN LOG ---
        console.log("Veritabanından bulunan kullanıcı:", user ? user.username : 'Kullanıcı bulunamadı');
        // ------------------------

        if (!user) {
            return res.status(401).json({ message: 'Geçersiz kullanıcı adı veya şifre' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        // --- YENİ EKLENEN LOG ---
        console.log("Şifre karşılaştırma sonucu (isMatch):", isMatch);
        // ------------------------

        if (!isMatch) {
            return res.status(401).json({ message: 'Geçersiz kullanıcı adı veya şifre' });
        }

        const payload = { id: user.id, username: user.username };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '10h' });

        res.json({ token });

    } catch (error) {
        console.log("Login sırasında bir hata oluştu:", error);
        res.status(500).json({ message: 'Sunucu hatası' });
    }
};