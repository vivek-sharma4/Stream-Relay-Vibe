// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import MessageList from './MessageList';
// import ChatInput from './ChatInput';
// import './ChatPage.css';

// const ChatPage = () => {
//   const [users, setUsers] = useState([]); 
//   const [selectedUser, setSelectedUser] = useState(''); 
//   const [messages, setMessages] = useState([]); 
//   const [currentUser] = useState('currentUser'); 
//   const [searchQuery, setSearchQuery] = useState(''); 
//   useEffect(() => {
//     // Fetch all users
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/users');
//         setUsers(response.data);
//       } catch (error) {
//         console.error('Error fetching users:', error);
//       }
//     };

//     fetchUsers();
//   }, []);

//   useEffect(() => {
//     // Fetch messages for the selected chat
//     const fetchMessages = async () => {
//       if (!selectedUser) return;

//       try {
//         const response = await axios.get('http://localhost:3000/messages');
//         const filteredMessages = response.data.filter(
//           (msg) =>
//             (msg.sender === currentUser && msg.receiver === selectedUser) ||
//             (msg.sender === selectedUser && msg.receiver === currentUser)
//         );
//         setMessages(filteredMessages);
//       } catch (error) {
//         console.error('Error fetching messages:', error);
//       }
//     };

//     fetchMessages();
//   }, [selectedUser, currentUser]);

//   const sendMessage = async (text) => {
//     const newMessage = {
//       sender: currentUser,
//       receiver: selectedUser,
//       message: text,
//       timestamp: new Date().toISOString(),
//     };

//     try {
//       await axios.post('http://localhost:3000/messages', newMessage);
//       setMessages((prev) => [...prev, newMessage]);
//     } catch (error) {
//       console.error('Error sending message:', error);
//     }
//   };

//   // Filter users based on the search query
//   const filteredUsers = users.filter((user) =>
//     user.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const handleUserSelect = (userName) => {
//     setSelectedUser(userName);
//     setSearchQuery(''); // Clear the search input once a user is selected
//   };

//   return (
//     <div className="chat-page">
//       <div className="chat-container">
//         <div className="user-selection">
//           <label htmlFor="user-search">Search for a user:</label>
//           <input
//             type="text"
//             id="user-search"
//             placeholder="Search users..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)} // Update search query
//           />
          
//           {/* Display list of users that match search query */}
//           <ul className="user-list">
//             {filteredUsers.length === 0 ? (
//               <p>No users found</p>
//             ) : (
//               filteredUsers.map((user) => (
//                 <li
//                   key={user.id}
//                   onClick={() => handleUserSelect(user.name)} // Select user from list
//                   className={selectedUser === user.name ? 'active' : ''}
//                 >
//                   {user.name}
//                 </li>
//               ))
//             )}
//           </ul>
//         </div>

//         {/* Chat Box */}
//         <div className="chat-box">
//           {selectedUser ? (
//             <>
//               <h2>Chat with {selectedUser}</h2>
//               <div className="messages-container">
//                 <MessageList messages={messages} currentUser={currentUser} />
//               </div>
//               <ChatInput onSendMessage={sendMessage} />
//             </>
//           ) : (
//             <p>Please select a user to start chatting.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatPage;





// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './ChatPage.css';

// const ChatPage = () => {
//   const [users, setUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState('');
//   const [messages, setMessages] = useState([]);
//   const [currentUser] = useState('currentUser'); // Replace with logged-in user's name
//   const [newMessage, setNewMessage] = useState('');
//   const [searchQuery, setSearchQuery] = useState('');

//   useEffect(() => {
//     // Fetch users
//     axios
//       .get('http://localhost:3000/users')
//       .then((response) => setUsers(response.data))
//       .catch((error) => console.error('Error fetching users:', error));
//   }, []);

//   useEffect(() => {
//     if (!selectedUser) return;

//     // Fetch messages for the selected chat
//     axios
//       .get('http://localhost:3000/messages')
//       .then((response) => {
//         const filteredMessages = response.data.filter(
//           (msg) =>
//             (msg.sender === currentUser && msg.receiver === selectedUser) ||
//             (msg.sender === selectedUser && msg.receiver === currentUser)
//         );
//         setMessages(filteredMessages);
//       })
//       .catch((error) => console.error('Error fetching messages:', error));
//   }, [selectedUser]);

//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value.toLowerCase());
//   };

//   const filteredUsers = users.filter((user) =>
//     user.name.toLowerCase().includes(searchQuery)
//   );

//   const sendMessage = () => {
//     if (!newMessage.trim()) return;

//     const message = {
//       sender: currentUser,
//       receiver: selectedUser,
//       message: newMessage.trim(),
//       timestamp: new Date().toISOString(),
//     };

//     axios
//       .post('http://localhost:3000/messages', message)
//       .then(() => {
//         setMessages((prev) => [...prev, message]);
//         setNewMessage('');
//       })
//       .catch((error) => console.error('Error sending message:', error));
//   };

//   return (
//     <div className="chat-page">
//       {/* Sidebar for Users */}
//       <div className="sidebar">
//         <input
//           type="text"
//           placeholder="Search users..."
//           value={searchQuery}
//           onChange={handleSearch}
//           className="search-bar"
//         />
//         <ul className="user-list">
//           {filteredUsers.map((user) => (
//             <li
//               key={user.id}
//               onClick={() => setSelectedUser(user.name)}
//               className={selectedUser === user.name ? 'active' : ''}
//             >
//               {user.name}
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Main Chat Area */}
//       <div className="chat-area">
//         {selectedUser ? (
//           <>
//             <div className="chat-header">
//               <h2>{selectedUser}</h2>
//             </div>
//             <div className="message-list">
//               {messages.map((msg, index) => (
//                 <div
//                   key={index}
//                   className={`message ${
//                     msg.sender === currentUser ? 'sent' : 'received'
//                   }`}
//                 >
//                   {msg.message}
//                 </div>
//               ))}
//             </div>
//             <div className="message-input">
//               <input
//                 type="text"
//                 placeholder="Type a message..."
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//                 onKeyDown={(e) => {
//                   if (e.key === 'Enter') sendMessage();
//                 }}
//               />
//               <button onClick={sendMessage}>Send</button>
//             </div>
//           </>
//         ) : (
//           <div className="no-chat-selected">
//             <p>Select a user to start chatting.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ChatPage;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ChatPage.css';

const ChatPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [messages, setMessages] = useState([]);
  const [currentUser] = useState('currentUser'); // Replace with logged-in user's name
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch users
    axios
      .get('http://localhost:3000/users')
      .then((response) => setUsers(response.data))
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  useEffect(() => {
    if (!selectedUser) return;

    // Fetch messages for the selected chat
    axios
      .get('http://localhost:3000/messages')
      .then((response) => {
        const filteredMessages = response.data.filter(
          (msg) =>
            (msg.sender === currentUser && msg.receiver === selectedUser) ||
            (msg.sender === selectedUser && msg.receiver === currentUser)
        );
        setMessages(filteredMessages);
      })
      .catch((error) => console.error('Error fetching messages:', error));
  }, [selectedUser]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery)
  );

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message = {
      sender: currentUser,
      receiver: selectedUser,
      message: newMessage.trim(),
      timestamp: new Date().toISOString(),
    };

    axios
      .post('http://localhost:3000/messages', message)
      .then(() => {
        setMessages((prev) => [...prev, message]);
        setNewMessage('');
      })
      .catch((error) => console.error('Error sending message:', error));
  };

  return (
    <div className="chat-page">
      {/* Sidebar for Users */}
      <div className="sidebar">
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={handleSearch}
          className="search-bar"
        />
        <ul className="user-list">
          {filteredUsers.map((user) => (
            <li
              key={user.id}
              onClick={() => setSelectedUser(user.name)}
              className={selectedUser === user.name ? 'active' : ''}
            >
              {user.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Chat Area */}
      <div className="chat-area">
        {selectedUser ? (
          <>
            <div className="chat-header">
              <h2>{selectedUser}</h2>
            </div>
            <div className="message-list">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`message ${
                    msg.sender === currentUser ? 'sent' : 'received'
                  }`}
                >
                  {msg.message}
                </div>
              ))}
            </div>
            <div className="message-input">
              <input
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') sendMessage();
                }}
              />
              <button onClick={sendMessage}>Send</button>
            </div>
          </>
        ) : (
          <div className="no-chat-selected">
            <p>Select a user to start chatting.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;