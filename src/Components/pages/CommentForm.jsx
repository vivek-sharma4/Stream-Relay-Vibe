import React, { useState } from 'react';
import axios from 'axios';

const CommentForm = ({ postId, onCommentAdded }) => {
  const [commentContent, setCommentContent] = useState('');

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('You must be logged in to comment.');
      return;
    }

    const newComment = {
      content: commentContent,
      authorId: userId,
      postId: postId,
    };

    axios.post('http://localhost:3000/comments', newComment)
      .then((response) => {
        onCommentAdded(response.data);
        setCommentContent('');
      })
      .catch((error) => {
        console.error('Error adding comment:', error);
        alert('Failed to add comment.');
      });
  };

  return (
    <form onSubmit={handleCommentSubmit}>
      <textarea
        placeholder="Add a comment..."
        value={commentContent}
        onChange={(e) => setCommentContent(e.target.value)}
      />
      <button type="submit">Comment</button>
    </form>
  );
};

export default CommentForm;
