// server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db'); // DB bağlantı fonksiyonu

// Ortam değişkenlerini yükle
dotenv.config();

// Veritabanına bağlan
connectDB();

const app = express();

// Middleware'ler
app.use(cors()); // CORS'u etkinleştir
app.use(express.json()); // Gelen JSON verilerini parse etmek için

app.use('/uploads', express.static('uploads'));

// Rotaları Tanımla (Temizlenmiş Hali)
app.use('/api/haberler', require('./routes/haberRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/ayarlar', require('./routes/ayarlarRoutes'));
app.use('/api/etkinlikler', require('./routes/etkinlikRoutes'));
app.use('/api/iletisim', require('./routes/iletisimRoutes'));
app.use('/api/yayinlar', require('./routes/yayinRoutes.js'));
app.use('/api/files', require('./routes/fileRoutes'));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Sunucu ${PORT} portunda çalışıyor...`));