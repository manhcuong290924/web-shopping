// client/src/components/ChatBotIcon.jsx
import React, { useState } from 'react';
import '../styles/ChatBotIcon.scss';

const ChatBotIcon = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Chào bạn! Tôi là chat bot. Hãy hỏi tôi bất cứ điều gì.", sender: 'bot' },
  ]);
  const [inputText, setInputText] = useState('');

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = () => {
    if (inputText.trim() === '') return;

    setMessages([...messages, { text: inputText, sender: 'user' }]);
    setInputText('');

    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Tôi đang xử lý câu hỏi của bạn, vui lòng chờ!", sender: 'bot' },
      ]);
    }, 1000);
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
          src="https://cdn-icons-png.flaticon.com/512/894/894737.png"
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
                    src="https://cdn-icons-png.flaticon.com/512/894/894737.png"
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