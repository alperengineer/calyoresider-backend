// controllers/authController.js
const AdminUser = require('../models/AdminUser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    // --- 1. CASUS LOG: İstek geldi mi? Ne geldi? ---
    console.log("------------------------------------------------");
    console.log("LOGIN DENEMESİ:");
    console.log("Gelen Username:", req.body.username);
    console.log("Gelen Password:", req.body.password);

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Kullanıcı adı ve şifre zorunludur.' });
    }

    try {
        const user = await AdminUser.findOne({ username });

        // --- 2. CASUS LOG: Kullanıcı veritabanında bulundu mu? ---
        if (!user) {
            console.log("❌ HATA: Kullanıcı veritabanında BULUNAMADI.");
            // Hangi koleksiyona baktığımızı kontrol edelim
            console.log("Baktığım Model/Koleksiyon:", AdminUser.collection.name);
            return res.status(401).json({ message: 'Geçersiz kullanıcı adı veya şifre' });
        }

        console.log("✅ Kullanıcı Bulundu:", user.username);
        console.log("DB'deki Hash:", user.password);

        // Şifre kontrolü
        const isMatch = await bcrypt.compare(password, user.password);

        // --- 3. CASUS LOG: Şifre eşleşti mi? ---
        console.log("Şifre Eşleşme Sonucu:", isMatch);

        if (!isMatch) {
            console.log("❌ HATA: Şifreler eşleşmedi (Wrong Password).");
            return res.status(401).json({ message: 'Geçersiz kullanıcı adı veya şifre' });
        }

        const payload = { id: user.id, username: user.username };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '10h' });

        console.log("✅ BAŞARILI: Token üretildi ve gönderiliyor.");
        console.log("------------------------------------------------");
        res.json({ token });

    } catch (error) {
        console.error("SUNUCU HATASI:", error);
        res.status(500).json({ message: 'Sunucu hatası' });
    }
};