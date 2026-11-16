const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post("/api/chat", async (req, res) => {
  try {
    const messages = req.body.messages;

    res.json({
      message: "Pesan berhasil diterima",
      data: messages,
    });

  } catch (error) {
    console.error("Server Error:", error);

    res.status(400).json({
      error: "Terjadi kesalahan pada server",
    });
  }
});

const messages = req.body.messages;

if (!messages || !Array.isArray(messages)) {
  return res.status(400).json({
    error: "Messages harus berupa array",
  });
}