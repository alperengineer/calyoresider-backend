const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // .env dosyasındaki MONGO_URI değişkenini kullanarak bağlantı kurar
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`MongoDB Bağlantısı Başarılı: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Hata: ${error.message}`);
        // Hata durumunda uygulamayı sonlandır
        process.exit(1);
    }
};

module.exports = connectDB;