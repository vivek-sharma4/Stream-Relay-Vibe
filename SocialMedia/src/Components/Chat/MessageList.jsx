import React from 'react';
import MessageItem from './MessageItem';

const MessageList = ({ messages, currentUser }) => {
  return (
    <div className="message-list">
      {messages.map((msg) => (
        <MessageItem
          key={msg.id}
          message={msg}
          isSender={msg.sender === currentUser}
        />
      ))}
    </div>
  );
};

export default MessageList;
