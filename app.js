const express = require('express');
const session = require('express-session');
const { getAIResponse } = require('./ai');
const { getPrompt } = require('./prompts');

const app = express();
app.use(express.json());
app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: true }));

// Chat endpoint
app.post('/api/chat', async (req, res) => {
    const { message, partnerName } = req.body;
    const userLevel = 'Free'; // Default user level
    const prompt = getPrompt(partnerName);
    const aiResponse = await getAIResponse(userLevel, `${prompt} ${message}`);
    res.json({ response: aiResponse });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});