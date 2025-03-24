import React, { useState } from 'react';

const ChatUI = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const sendMessage = async () => {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: input, userLevel: 'Free', partnerName: 'sona' })
        });
        const data = await response.json();
        setMessages([...messages, { user: input, ai: data.response }]);
        setInput('');
    };

    return (
        <div className="chat-ui">
            <div className="messages">
                {messages.map((msg, index) => (
                    <div key={index}>
                        <p><strong>You:</strong> {msg.user}</p>
                        <p><strong>AI:</strong> {msg.ai}</p>
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default ChatUI;