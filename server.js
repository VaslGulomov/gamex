require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

const YOUR_AUTH_KEY = process.env.YOUR_AUTH_KEY;
const CAFE_ID = process.env.CAFE_ID;

app.use(express.static('public')); // Папка для статических файлов, например, для HTML и CSS

async function fetchPCs() {
    const url = `https://api.icafecloud.com/api/v2/cafe/${CAFE_ID}/pcs/action/initData`;

    const headers = {
        "Authorization": `Bearer ${YOUR_AUTH_KEY}`,
        "Content-Type": "application/json",
        "Accept": "application/json",
    };

    try {
        const response = await axios.get(url, { headers });
        return response.data.data.pc_list; // Возвращаем список ПК
    } catch (error) {
        console.error(`Ошибка: ${error.message}`);
        throw error; // Пробрасываем ошибку дальше
    }
}

// Маршрут для получения данных о ПК
app.get('/api/pcs', async (req, res) => {
    try {
        const pcList = await fetchPCs();
        res.json(pcList); // Отправляем данные клиенту
    } catch (error) {
        res.status(500).send('Ошибка при получении данных о ПК');
    }
});

// Стартуем сервер
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
