import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from './Post'; // Import the Post component

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem('userId'); // Get the logged-in user's ID
    if (!userId) {
      alert('Please log in to view your posts.');
      return;
    }

    // Fetch only the posts by the logged-in user
    axios.get(`http://localhost:3000/posts?userId=${userId}`)
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
        alert('Failed to fetch posts. Please try again.');
        setLoading(false);
      });
  }, []);

  const handlePostDeleted = (postId) => {
    setPosts(posts.filter((post) => post.id !== postId));
  };

  const handlePostUpdated = (postId, updatedPost) => {
    setPosts(posts.map((post) => (post.id === postId ? { ...post, ...updatedPost } : post)));
  };

  if (loading) {
    return <p>Loading your posts...</p>;
  }

  return (
    <div className="post-list">
      <h1>My Posts</h1>
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
        <p>You haven't created any posts yet.</p>
      )}
    </div>
  );
};

export default PostList;
