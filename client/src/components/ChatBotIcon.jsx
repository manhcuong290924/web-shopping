import React, { useState } from 'react';
import '../styles/ChatBotIcon.scss';
import customIcon from '../styles/image/iconchatbot.webp'; // Import icon của bạn

const ChatBotIcon = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async () => {
    if (inputText.trim() === '') return;

    const userMessage = { text: inputText, sender: 'user' };
    setMessages([...messages, userMessage]);
    setInputText('');

    try {
      const response = await fetch('http://localhost:8080/api/ai/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: 'user123', prompt: inputText }),
      });

      if (!response.ok) {
        console.log('Mã trạng thái:', response.status);
        throw new Error('Lỗi khi gọi API');
      }

      const data = await response.json();
      const botMessage = { text: data.response, sender: 'bot' };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Lỗi:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: 'Có lỗi xảy ra, vui lòng thử lại!', sender: 'bot' },
      ]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chat-icon" onClick={toggleChat}>
        <img
          src={customIcon} // Sử dụng biến đã import
          alt="Chat Bot"
        />
      </div>
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <h3>Chat Bot</h3>
            <button onClick={toggleChat}>✕</button>
          </div>
          <div className="chat-body">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`chat-message ${
                  message.sender === 'user' ? 'user-message' : 'bot-message'
                }`}
              >
                {message.sender === 'bot' && (
                  <img
                    src={customIcon} // Sử dụng biến đã import
                    alt="Bot Avatar"
                    className="bot-avatar"
                  />
                )}
                <div className="message-content">{message.text}</div>
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Nhập tin nhắn..."
            />
            <button onClick={handleSendMessage}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBotIcon;