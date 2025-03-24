const openai = require('openai');
const mistral = require('mistral');

async function getAIResponse(userLevel, prompt) {
    if (userLevel === 'VIP') {
        return await mistral.generateResponse(prompt);
    } else {
        return await openai.generateResponse(prompt);
    }
}

module.exports = { getAIResponse };