const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const app = express();  // <-- c'est ici que tu définis 'app'
const port = process.env.PORT || 3000;

app.use(cors({
  origin: 'https://horus911.github.io'
}));

app.use(bodyParser.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post('/api/summarize', async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'No text provided' });

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: `Summarize this:\n${text}` }],
    });
    const summary = completion.data.choices[0].message.content.trim();
    res.json({ summary });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'OpenAI API error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
