import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = { sender: 'user', text: inputText };
    setMessages([...messages, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await axios.post('http://<YOUR_BACKEND_URL>/api/chat', {
        question: inputText,
      });
      const botMessage = { sender: 'bot', text: response.data.answer };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        sender: 'bot',
        text: 'Oops, something went wrong! Please try again.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (file) => {
    if (!file) return;

    const userMessage = { sender: 'user', text: `Uploaded: ${file.name}` };
    setMessages([...messages, userMessage]);

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post('http://<YOUR_BACKEND_URL>/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const botMessage = { sender: 'bot', text: response.data.answer || 'File uploaded successfully!' };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        sender: 'bot',
        text: 'Failed to upload file. Please try again.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    handleFileUpload(file);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    handleFileUpload(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-window">
        {messages.map((message, index) => (
          <div key={index} className={`message-bubble ${message.sender}`}>
            {message.text}
          </div>
        ))}
        {isLoading && <div className="message-bubble bot">Typing...</div>}
      </div>
      <div className="input-container">
        <div
          className="file-drop-zone"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          Drag a file here or
          <label className="file-picker">
            <input type="file" onChange={handleFileSelect} />
            select a file
          </label>
        </div>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default App;
