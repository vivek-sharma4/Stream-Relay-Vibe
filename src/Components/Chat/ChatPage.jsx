import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import './ChatPage.css';

const ChatPage = () => {
  const { currentUser, receiver } = useParams();  // Extract currentUser and receiver from URL params
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('http://localhost:3000/messages');
        const filteredMessages = response.data.filter(
          (msg) =>
            (msg.sender === currentUser || msg.receiver === currentUser) &&
            (msg.sender === currentUser || msg.receiver === receiver)
        );
        setMessages(filteredMessages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [currentUser, receiver]);

  const sendMessage = async (text) => {
    const newMessage = {
      sender: currentUser,
      receiver: receiver,
      message: text,
      timestamp: new Date().toISOString(),
    };

    try {
      await axios.post('http://localhost:3000/messages', newMessage);
      setMessages((prev) => [...prev, newMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="chat-page">
      <h2>Chat between currentUser and receiver</h2>
      <MessageList messages={messages} currentUser={currentUser} />
      <ChatInput onSendMessage={sendMessage} />
    </div>
  );
};

export default ChatPage;
