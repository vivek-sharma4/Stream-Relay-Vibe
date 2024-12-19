// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './Components/Navbar';
// import Header from './Components/Header';
// import Footer from './Components/Footer';
// import Register from './Components/Auth/Registration';
// import Profile from './Components/profiles/Profile';
// import Login from './Components/Auth/Login';
// import Home from './Components/pages/Home';
// import PostList from './Components/pages/PostList'; // Import PostList component
// import './App.css';

// const App = () => {
//   return (
//     <Router>
//       <Navbar />
//       <Header />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/profile" element={<Profile />} />
//         <Route path="/posts" element={<PostList />} /> {/* Route to show posts */}
//       </Routes>
//       <Footer />
//     </Router>
//   );
// };

// export default App;

// App.js
// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Header from './Components/Header';
// import Layout from './Components/profiles/Layout';
// import Register from './Components/Auth/Registration';
// import Profile from './Components/profiles/Profile';
// import Login from './Components/Auth/Login';
// import Home from './Components/pages/Home';
// import PostList from './Components/pages/PostList';
// import NotificationPage from './Components/pages/NotificationPage'; 
// import ChatPage from './Components/Chat/ChatPage';
// import './App.css';

// const App = () => {
//   const [posts, setPosts] = useState([]);

//   // Fetch posts data (e.g., from an API)
//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await fetch('http://localhost:3000/posts');
//         const data = await response.json();
//         setPosts(data);
//       } catch (error) {
//         console.error("Error fetching posts:", error);
//       }
//     };

//     fetchPosts();
//   }, []);

//   return (
//     <Router>
//        <Layout>
//       {/* <Navbar /> */}
//       <Header />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/profile" element={<Profile />} />
//         <Route path="/posts" element={<PostList posts={posts} />} />
//         <Route path="/notifications" element={<NotificationPage />} />
//         <Route path="/chat/:currentUser/:receiver"element={<ChatPage />}/>
//       </Routes>
//       {/* <Footer /> */}
//       </Layout>
//     </Router>
//   );
// };

// export default App;


import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Layout from './Components/profiles/Layout';
import Register from './Components/Auth/Registration';
import Profile from './Components/profiles/Profile';
import Login from './Components/Auth/Login';
import Home from './Components/pages/Home';
import PostList from './Components/pages/PostList';
import NotificationPage from './Components/pages/NotificationPage'; 
import ChatPage from './Components/Chat/ChatPage';
import PostComponent from './Components/pages/Post';
import './App.css';

const App = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:3000/posts');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <Router>
      <div id="root">
        <Header />
        {/* <main className="main-content"> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/posts" element={<PostList posts={posts} />} />
            <Route path="/notifications" element={<NotificationPage />} />
            {/* <Route path="/chat/:currentUser/:receiver" element={<ChatPage />} /> */}
            <Route path='/Chatpage' element={<ChatPage />} />
            <Route path="/posts" element={<PostComponent />} />
          </Routes>
        {/* </main> */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;





// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './Components/Navbar';
// import Header from './Components/Header';
// import Footer from './Components/Footer';
// import Layout from './Components/profiles/Layout';
// import Register from './Components/Auth/Registration';
// import Profile from './Components/profiles/Profile';
// import Login from './Components/Auth/Login';
// import Home from './Components/pages/Home';
// import PostList from './Components/pages/PostList';
// import NotificationPage from './Components/pages/NotificationPage';
// import ChatPage from './Components/Chat/ChatPage';
// import './App.css';

// const App = () => {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await fetch('http://localhost:3000/posts');
//         const data = await response.json();
//         setPosts(data);
//       } catch (error) {
//         console.error('Error fetching posts:', error);
//       }
//     };

//     fetchPosts();
//   }, []);

//   return (
//     <Router>
//       <div id="root">
//         <Header />
//         <Navbar />
//         <Routes>
//           {/* Define routes */}
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/profile" element={<Profile />} />
//           <Route path="/posts" element={<PostList posts={posts} />} />
//           <Route path="/notifications" element={<NotificationPage />} />
          
//           {/* Dynamic chat route for specific users */}
//           <Route path="/ChatPage" element={<ChatPage />} />

//           {/* Optional: Profile route with dynamic user ID (if applicable) */}
//           <Route path="/Profile/:userId" element={<Profile />} />
          
//         </Routes>
//         <Footer />
//       </div>
//     </Router>
//   );
// };

// export default App;

