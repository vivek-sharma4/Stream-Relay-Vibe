import React, { useState } from 'react';

const ChatInput = ({ onSendMessage }) => {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (text.trim()) {
      onSendMessage(text);
      setText('');
    }
  };

  return (
    <div className="chat-input">
      <input
        type="text"
        placeholder="Type your message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default ChatInput;
