import React, { useState } from 'react';
import axios from 'axios';

const PostForm = ({ onPostCreated }) => {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('User not logged in!');
      return;
    }

    const newPost = { content, authorId: userId };

    axios.post('http://localhost:3000/posts', newPost)
      .then((response) => {
        onPostCreated(response.data);
        setContent('');
      })
      .catch((error) => {
        console.error("Error creating post:", error);
        setError('Failed to create the post. Please try again.');
      });
  };

  return (
    <form onSubmit={handleSubmit} className="post-form">
      {error && <p className="error">{error}</p>}
      <textarea
        placeholder="Write your post here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit">Post</button>
    </form>
  );
};

export default PostForm;
