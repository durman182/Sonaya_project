document.getElementById('chat-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    document.getElementById('chat-ui').style.display = 'block';
    document.getElementById('chat-form').style.display = 'none';
    startChat(username);
});

document.getElementById('send-button').addEventListener('click', function() {
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value;
    messageInput.value = '';
    sendMessage(message);
});

function startChat(username) {
    // Initialize chat with username
    console.log(`Chat started with username: ${username}`);
}

function sendMessage(message) {
    const messagesDiv = document.getElementById('messages');
    const userMessage = document.createElement('p');
    userMessage.innerHTML = `<strong>You:</strong> ${message}`;
    messagesDiv.appendChild(userMessage);

    // Simulate AI response
    const aiMessage = document.createElement('p');
    aiMessage.innerHTML = `<strong>AI:</strong> This is a simulated response.`;
    messagesDiv.appendChild(aiMessage);
}