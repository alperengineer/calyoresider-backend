exports.handleIletisimForm = (req, res) => {
    const { adSoyad, email, konu, mesaj } = req.body;

    // Gelen verileri işleme simülasyonu
    console.log("Yeni bir iletişim formu alındı:");
    console.log("Ad Soyad: " + adSoyad);
    console.log("E-posta: " + email);
    console.log("Konu: " + konu);
    console.log("Mesaj: " + mesaj);

    // Gerçek bir uygulamada burada Nodemailer gibi bir kütüphane ile
    // e-posta gönderme işlemi yapılabilir.

    res.status(200).json({ message: "Mesajınız başarıyla gönderildi." });
};