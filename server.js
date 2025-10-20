// Gerekli modülleri import et
const express = require('express');
const path = require('path'); // Dosya yollarıyla çalışmak için
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db'); // Kendi DB bağlantı dosyanız

// --- KURULUM VE BAŞLANGIÇ AYARLARI ---

// Ortam değişkenlerini .env dosyasından yükle
dotenv.config();

// Veritabanına bağlan
connectDB();

// Express uygulamasını oluştur
const app = express();


// --- ÇEKİRDEK MIDDLEWARE'LER ---

// CORS (Cross-Origin Resource Sharing) middleware'ini etkinleştir
app.use(cors());

// Gelen isteklerdeki JSON verilerini okuyabilmek için
app.use(express.json());


// --- API ROTALARI ---
// Uygulamanızın backend mantığının çalıştığı tüm endpoint'ler
app.use('/api/haberler', require('./routes/haberRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/ayarlar', require('./routes/ayarlarRoutes'));
app.use('/api/etkinlikler', require('./routes/etkinlikRoutes'));
app.use('/api/iletisim', require('./routes/iletisimRoutes'));
app.use('/api/yayinlar', require('./routes/yayinRoutes.js'));
app.use('/api/bolge-yayinlari', require('./routes/bolgeYayinRoutes'));
app.use('/api/files', require('./routes/fileRoutes'));


// --- FULL-STACK İÇİN GEREKLİ STATİK YAYINLAMA ---
// Not: Bu bölümün API rotalarından sonra gelmesi önemlidir.

// 1. 'uploads' klasörünü public olarak erişilebilir yap.
// Bu sayede /uploads/dosya.jpg gibi isteklere sunucudan dosya gönderilir.
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 2. Statik React uygulamasını sun.
// Bu, anasayfa ve React'in diğer tüm varlıklarını (CSS, JS) sunar.
app.use(express.static(path.join(__dirname, '../frontend')));

// 3. Diğer tüm istekleri React'in ana HTML dosyasına yönlendir (Catch-all Route).
// Bu, sayfa yenilendiğinde veya doğrudan bir linke gidildiğinde React Router'ın çalışmasını sağlar.
app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});


// --- SUNUCUYU BAŞLATMA ---

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Sunucu ${process.env.NODE_ENV || 'production'} modunda ${PORT} portunda çalışıyor...`));