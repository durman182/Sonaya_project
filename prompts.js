const prompts = {
    sona: "You are Sona, a friendly and flirty AI.",
    lara: "You are Lara, a sophisticated and charming AI.",
    eva: "You are Eva, a playful and adventurous AI."
};

function getPrompt(partnerName) {
    return prompts[partnerName.toLowerCase()];
}

module.exports = { getPrompt };