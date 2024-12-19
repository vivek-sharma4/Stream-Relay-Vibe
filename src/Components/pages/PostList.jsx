import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from './Post'; // Post component
import { useNavigate } from 'react-router-dom';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('Please log in to view your posts.');
      navigate('/login');
      return;
    }

    axios.get(`http://localhost:3000/posts?userId=${userId}`)
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
        alert('Failed to load posts.');
        setLoading(false);
      });
  }, [navigate]);

  const handlePostDeleted = (postId) => {
    setPosts(posts.filter((post) => post.id !== postId));
  };

  const handlePostUpdated = (postId, updatedPost) => {
    setPosts(posts.map((post) => (post.id === postId ? { ...post, ...updatedPost } : post)));
  };

  if (loading) {
    return <p>Loading posts...</p>;
  }

  return (
    <div className="post-list">
      <h1>Posts</h1>
      {posts.length > 0 ? (
        posts.map((post) => (
          <Post
            key={post.id}
            post={post}
            onPostDeleted={handlePostDeleted}
            onPostUpdated={handlePostUpdated}
          />
        ))
      ) : (
        <p>No posts found. <a href="/create-post">Create a post</a>.</p>
      )}
    </div>
  );
};

export default PostList;
