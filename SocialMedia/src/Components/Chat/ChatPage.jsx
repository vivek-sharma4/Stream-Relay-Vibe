import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MessageList from './MessageList';
import ChatInput from './ChatInput';

const ChatPage = () => {
  const { currentUser, receiver } = useParams();
  const [messages, setMessages] = useState([]);

  // Fetch messages between current user and receiver
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('http://localhost:3000/messages');
        const filteredMessages = response.data.filter(
          (msg) =>
            (msg.sender === currentUser && msg.receiver === receiver) ||
            (msg.sender === receiver && msg.receiver === currentUser)
        );
        setMessages(filteredMessages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [currentUser, receiver]);

  // Send a new message
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
