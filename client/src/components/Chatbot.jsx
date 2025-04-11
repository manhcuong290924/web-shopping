import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isOpen, setIsOpen] = useState(false); // Trạng thái mở/đóng chatbot
    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { sender: 'user', text: input };
        setMessages((prev) => [...prev, userMessage]);

        try {
            const response = await axios.post(
                'http://localhost:8080/api/chatbot/query',
                input,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            const botMessage = { sender: 'bot', text: response.data };
            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error('Error sending message:', error);
            const errorMessage = {
                sender: 'bot',
                text: 'Có lỗi xảy ra khi gửi câu hỏi. Vui lòng thử lại!',
            };
            setMessages((prev) => [...prev, errorMessage]);
        }

        setInput('');
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    const toggleChatbot = () => {
        setIsOpen(!isOpen);
    };

    // Hàm chuyển đổi URL trong tin nhắn thành link có thể nhấp
    const renderMessageWithLinks = (text) => {
        // Biểu thức chính quy để tìm URL sản phẩm (http://localhost:3000/products/[id])
        const urlRegex = /(http:\/\/localhost:3000\/products\/[a-f0-9]{24})/g;

        // Tách tin nhắn thành các phần và thay thế URL bằng thẻ <a>
        const parts = text.split(urlRegex);
        return parts.map((part, index) => {
            if (part.match(urlRegex)) {
                return (
                    <a
                        key={index}
                        href={part}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#007bff', textDecoration: 'underline' }}
                    >
                        {part}
                    </a>
                );
            }
            return part;
        });
    };

    return (
        <div
            style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                zIndex: 1000,
            }}
        >
            {/* Nút mở/đóng chatbot */}
            <button
                onClick={toggleChatbot}
                style={{
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '60px',
                    height: '60px',
                    fontSize: '24px',
                    cursor: 'pointer',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                onMouseOver={(e) =>
                    (e.target.style.backgroundColor = '#0056b3')
                }
                onMouseOut={(e) =>
                    (e.target.style.backgroundColor = '#007bff')
                }
            >
                {isOpen ? '✖' : '💬'}
            </button>

            {/* Cửa sổ chatbot */}
            {isOpen && (
                <div
                    style={{
                        width: '350px',
                        height: '450px',
                        border: '1px solid #ccc',
                        borderRadius: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        backgroundColor: 'white',
                        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                        position: 'absolute',
                        bottom: '80px',
                        right: '0',
                    }}
                >
                    <div
                        style={{
                            backgroundColor: '#007bff',
                            color: 'white',
                            padding: '10px',
                            textAlign: 'center',
                            borderTopLeftRadius: '10px',
                            borderTopRightRadius: '10px',
                        }}
                    >
                        <h2 style={{ margin: 0, fontSize: '18px' }}>
                            Chatbot Quản Lý Kho Hàng
                        </h2>
                    </div>
                    <div
                        style={{
                            flex: 1,
                            padding: '10px',
                            overflowY: 'auto',
                            backgroundColor: '#f9f9f9',
                        }}
                    >
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                style={{
                                    margin: '10px 0',
                                    padding: '8px 12px',
                                    borderRadius: '10px',
                                    maxWidth: '70%',
                                    wordWrap: 'break-word',
                                    backgroundColor:
                                        message.sender === 'user'
                                            ? '#007bff'
                                            : '#e9ecef',
                                    color:
                                        message.sender === 'user'
                                            ? 'white'
                                            : 'black',
                                    marginLeft:
                                        message.sender === 'user' ? 'auto' : '0',
                                    marginRight:
                                        message.sender === 'user' ? '0' : 'auto',
                                    textAlign:
                                        message.sender === 'user'
                                            ? 'right'
                                            : 'left',
                                }}
                            >
                                {message.sender === 'bot' ? (
                                    renderMessageWithLinks(message.text)
                                ) : (
                                    message.text
                                )}
                            </div>
                        ))}
                        <div ref={chatEndRef} />
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            padding: '10px',
                            borderTop: '1px solid #ccc',
                            backgroundColor: 'white',
                            borderBottomLeftRadius: '10px',
                            borderBottomRightRadius: '10px',
                        }}
                    >
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Nhập câu hỏi của bạn..."
                            style={{
                                flex: 1,
                                padding: '8px',
                                border: '1px solid #ccc',
                                borderRadius: '5px',
                                marginRight: '10px',
                                outline: 'none',
                            }}
                        />
                        <button
                            onClick={sendMessage}
                            style={{
                                padding: '8px 15px',
                                backgroundColor: '#007bff',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                            }}
                            onMouseOver={(e) =>
                                (e.target.style.backgroundColor = '#0056b3')
                            }
                            onMouseOut={(e) =>
                                (e.target.style.backgroundColor = '#007bff')
                            }
                        >
                            Gửi
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;