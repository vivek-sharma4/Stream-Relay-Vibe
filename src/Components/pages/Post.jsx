import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

// Styled Components
const PostWrapper = styled.div`
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const PostHeader = styled.h4`
  font-size: 16px;
  color: #333;
  margin-bottom: 10px;
`;

const PostContent = styled.p`
  font-size: 14px;
  color: #555;
  line-height: 1.5;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 80px;
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
  resize: vertical;
`;

const PostActions = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const LinkAction = styled.a`
  font-size: 14px;
  color: #007bff;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const LikeButton = styled.button`
  background-color: #ff4081;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #d9006d;
  }
`;

const CommentsSection = styled.div`
  margin-top: 20px;

  h5 {
    font-size: 14px;
    margin-bottom: 10px;
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      font-size: 14px;
      margin-bottom: 5px;
      color: #444;
    }
  }

  input {
    width: 100%;
    padding: 8px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

// Post Component
const Post = React.memo(({ post, onPostDeleted, onPostUpdated }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);
  const [likes, setLikes] = useState(post.likes || 0);
  const [comments, setComments] = useState(post.comments || []);
  const [newComment, setNewComment] = useState('');

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

  const handleLike = () => {
    const updatedLikes = likes + 1;
    setLikes(updatedLikes);

    axios
      .patch(`http://localhost:3000/posts/${post.id}`, { likes: updatedLikes })
      .catch((error) => {
        console.error('Error liking post:', error);
        alert('Failed to like the post.');
      });
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    setNewComment('');

    axios
      .patch(`http://localhost:3000/posts/${post.id}`, { comments: updatedComments })
      .catch((error) => {
        console.error('Error adding comment:', error);
        alert('Failed to add comment.');
      });
  };

  return (
    <PostWrapper>
      <PostHeader>Posted by: {post.username || 'Unknown'}</PostHeader>
      {isEditing ? (
        <>
          <Textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
          <PostActions>
            <LinkAction href="#" onClick={handleUpdate}>
              Save
            </LinkAction>
            <LinkAction href="#" onClick={handleCancelEdit}>
              Cancel
            </LinkAction>
          </PostActions>
        </>
      ) : (
        <>
          <PostContent>{post.content}</PostContent>
          <PostActions>
            <LinkAction href="#" onClick={handleEdit}>
              Edit
            </LinkAction>
            <LinkAction href="#" onClick={handleDelete}>
              Delete
            </LinkAction>
          </PostActions>
        </>
      )}
      <div>
        <LikeButton onClick={handleLike}>Like ({likes})</LikeButton>
      </div>
      <CommentsSection>
        <h5>Comments:</h5>
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment"
        />
        <button onClick={handleAddComment}>Post</button>
      </CommentsSection>
    </PostWrapper>
  );
});

export default Post;
