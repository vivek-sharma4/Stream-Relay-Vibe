import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from './Post';
import './PostComponent.css'; 

const PostComponent = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState({ id: '1', name: 'vivek' }); 

  useEffect(() => {
   
    axios
      .get('http://localhost:3000/posts')
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
        setLoading(false);
      });
  }, []);

  const handlePostDeleted = (postId) => {
    setPosts(posts.filter((post) => post.id !== postId));
  };

  const handlePostUpdated = (postId, updatedPost) => {
    setPosts(posts.map((post) => (post.id === postId ? updatedPost : post)));
  };

  if (loading) {
    return <p>Loading posts...</p>;
  }

  return (
    <div className="post-container">
      <h1>All Posts</h1>
      {posts.length === 0 ? (
        <p>No posts to display.</p>
      ) : (
        posts.map((post) => (
          <Post
            key={post.id}
            post={post}
            currentUser={currentUser}
            onPostDeleted={handlePostDeleted}
            onPostUpdated={handlePostUpdated}
          />
        ))
      )}
    </div>
  );
};

export default PostComponent;
