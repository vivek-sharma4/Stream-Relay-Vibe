import React from 'react';

const MessageItem = ({ message, isSender }) => {
  return (
    <div className={`message-item ${isSender ? 'sender' : 'receiver'}`}>
      <p>{message.message}</p>
      <small>{new Date(message.timestamp).toLocaleTimeString()}</small>
    </div>
  );
};

export default MessageItem;
