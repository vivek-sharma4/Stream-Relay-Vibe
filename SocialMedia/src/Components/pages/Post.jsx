import React, { useState } from 'react';
import axios from 'axios';

const Post = ({ post, onPostUpdated, onPostDeleted }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);

  const handleEdit = () => setIsEditing(true);

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedContent(post.content);
  };

  const handleUpdate = () => {
    const updatedPost = { ...post, content: editedContent };

    axios.put(`http://localhost:3000/posts/${post.id}`, updatedPost)
      .then(() => {
        onPostUpdated(post.id, updatedPost);
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error updating post:", error);
        alert('Failed to update the post. Please try again.');
      });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      axios.delete(`http://localhost:3000/posts/${post.id}`)
        .then(() => {
          onPostDeleted(post.id);
        })
        .catch((error) => {
          console.error("Error deleting post:", error);
          alert('Failed to delete the post. Please try again.');
        });
    }
  };

  return (
    <div className="post">
      {isEditing ? (
        <div>
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={handleCancelEdit}>Cancel</button>
        </div>
      ) : (
        <div>
          <p>{post.content}</p>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default Post;
