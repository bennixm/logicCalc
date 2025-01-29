const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Backend is running. Use POST /ask for questions.');
});


app.post('/ask', async (req, res) => {
  const userQuery = req.body.query;

  if (!userQuery) {
    return res.status(400).json({ error: 'Query is required' });
  }

  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are a helpful assistant that answers questions about calculators and financial tools.' },
        { role: 'user', content: userQuery }
      ],
      max_tokens: 150,
      temperature: 0.7,
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    });

    const answer = response.data.choices[0].message.content.trim();
    res.json({ answer });

  } catch (error) {
    console.error('Error details:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Something went wrong!', details: error.response ? error.response.data : error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
