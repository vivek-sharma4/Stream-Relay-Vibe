import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Post = ({ post, onPostDeleted, onPostUpdated }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);

  const handleEdit = () => setIsEditing(true);

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedContent(post.content);
  };

  const handleUpdate = () => {
    const updatedPost = { ...post, content: editedContent };

    axios
      .put(`http://localhost:3000/posts/${post.id}`, updatedPost)
      .then(() => {
        onPostUpdated(post.id, updatedPost);
        setIsEditing(false);
      })
      .catch((error) => {
        console.error('Error updating post:', error);
        alert('Failed to update post.');
      });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      axios
        .delete(`http://localhost:3000/posts/${post.id}`)
        .then(() => {
          onPostDeleted(post.id);
        })
        .catch((error) => {
          console.error('Error deleting post:', error);
          alert('Failed to delete post.');
        });
    }
  };

  return (
    <div className="post">
      <h4>Posted by: {post.authorId || 'Unknown'}</h4>
      {isEditing ? (
        <>
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={handleCancelEdit}>Cancel</button>
        </>
      ) : (
        <>
          <p>{post.content}</p>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </div>
  );
};

const PostComponent = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch posts data
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
            onPostDeleted={handlePostDeleted}
            onPostUpdated={handlePostUpdated}
          />
        ))
      )}
    </div>
  );
};

export default PostComponent;
