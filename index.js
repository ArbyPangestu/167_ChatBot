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

const response = await fetch(
  "https://openrouter.ai/api/v1/chat/completions",
  {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
    },

    body: JSON.stringify({
      model: "nvidia/nemotron-3.5-super-vl:free",
      messages: messages,
      temperature: 0.7,
      max_tokens: 1000,
      stream: true,
    }),
  },
);