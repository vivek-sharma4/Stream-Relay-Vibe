// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './profile.css';

// const Profile = () => {
//   const [userData, setUserData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     username: '',
//     profilePicture: '',
//   });
//   const [errors, setErrors] = useState({});
//   const [isUpdating, setIsUpdating] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [imagePreview, setImagePreview] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const userId = localStorage.getItem('userId');
//     if (!userId) {
//       navigate('/login');
//     } else {
//       axios.get(`http://localhost:3000/users/${userId}`)
//         .then(response => {
//           setUserData(response.data);
//           setImagePreview(response.data.profilePicture);
//           setLoading(false);
//         })
//         .catch(error => {
//           setLoading(false);
//         });
//     }
//   }, [navigate]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUserData({ ...userData, [name]: value });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//         setUserData({ ...userData, profilePicture: reader.result });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const validate = () => {
//     const newErrors = {};
//     if (!userData.name) newErrors.name = 'Name is required';
//     if (!userData.email) newErrors.email = 'Email is required';
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email))
//       newErrors.email = 'Invalid email format';
//     if (!userData.username) newErrors.username = 'Username is required';
//     return newErrors;
//   };

//   const handleUpdate = (e) => {
//     e.preventDefault();
//     const validationErrors = validate();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     const userId = localStorage.getItem('userId');
//     if (!userId) {
//       alert('User not logged in!');
//       navigate('/login');
//       return;
//     }

//     const updatedUserData = { ...userData };
//     axios.put(`http://localhost:3000/users/${userId}`, updatedUserData)
//       .then(() => {
//         alert('Profile updated successfully!');
//         setIsUpdating(false);
//       })
//       .catch((error) => {
//         setErrors({ general: 'Failed to update profile. Please try again.' });
//       });
//   };

//   const handleDelete = () => {
//     const userId = localStorage.getItem('userId');
//     if (window.confirm('Are you sure you want to delete your account?')) {
//       axios.delete(`http://localhost:3000/users/${userId}`)
//         .then(() => {
//           alert('Account deleted successfully!');
//           localStorage.removeItem('userId');
//           navigate('/login');
//         })
//         .catch((error) => {
//           alert('Failed to delete account. Please try again.');
//         });
//     }
//   };

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div className="profile-container">
//       <h1>User Profile</h1>
//       {errors.general && <p className="error">{errors.general}</p>}

//       {isUpdating ? (
//         <form onSubmit={handleUpdate}>
//           <div className="form-group">
//             <label>Name:</label>
//             <input type="text" name="name" value={userData.name} onChange={handleChange} />
//             {errors.name && <p className="error">{errors.name}</p>}
//           </div>
//           <div className="form-group">
//             <label>Email:</label>
//             <input type="email" name="email" value={userData.email} onChange={handleChange} />
//             {errors.email && <p className="error">{errors.email}</p>}
//           </div>
//           <div className="form-group">
//             <label>Username:</label>
//             <input type="text" name="username" value={userData.username} onChange={handleChange} />
//             {errors.username && <p className="error">{errors.username}</p>}
//           </div>
//           <div className="form-group">
//             <label>Profile Picture:</label>
//             <input type="file" accept="image/*" onChange={handleImageChange} />
//             {imagePreview && <img src={imagePreview} alt="Profile Preview" className="profile-preview" />}
//           </div>

//           <button type="submit" className="btn-submit">Update Profile</button>
//           <button type="button" onClick={() => setIsUpdating(false)} className="btn-cancel">Cancel</button>
//         </form>
//       ) : (
//         <div className="profile-info">
//           {userData.profilePicture && <img src={userData.profilePicture} alt="Profile" className="profile-pic" />}
//           <p><strong>Name:</strong> {userData.name}</p>
//           <p><strong>Email:</strong> {userData.email}</p>
//           <p><strong>Username:</strong> {userData.username}</p>
//           <button onClick={() => setIsUpdating(true)} className="btn-edit">Edit Profile</button>
//           <button onClick={handleDelete} className="btn-delete">Delete Account</button>
//         </div>
//       )}
//       <button onClick={() => navigate('/posts')} className="btn-view-posts">View Posts</button>
//       <button onClick={() => navigate('/ChatPage')} className="btn-view-message">View Messsage</button>
//       <button onClick={() => navigate('/NotificationPage')} className="btn-view-NotificationPage">View Notification</button>



//     </div>
//   );
// };

// export default Profile;




// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './profile.css';

// const Profile = () => {
//   const [userData, setUserData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     username: '',
//     profilePicture: '',
//   });
//   const [errors, setErrors] = useState({});
//   const [isUpdating, setIsUpdating] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [imagePreview, setImagePreview] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const userId = localStorage.getItem('userId');
//     if (!userId) {
//       navigate('/login');
//     } else {
//       axios.get(`http://localhost:3000/users/${userId}`)
//         .then((response) => {
//           setUserData(response.data);
//           setImagePreview(response.data.profilePicture);
//           setLoading(false);
//         })
//         .catch((error) => {
//           console.error('Error fetching user data:', error);
//           setLoading(false);
//         });
//     }
//   }, [navigate]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUserData({ ...userData, [name]: value });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//         setUserData({ ...userData, profilePicture: reader.result });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const validate = () => {
//     const newErrors = {};
//     if (!userData.name) newErrors.name = 'Name is required';
//     if (!userData.email) newErrors.email = 'Email is required';
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email))
//       newErrors.email = 'Invalid email format';
//     if (!userData.username) newErrors.username = 'Username is required';
//     return newErrors;
//   };

//   const handleUpdate = (e) => {
//     e.preventDefault();
//     const validationErrors = validate();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     const userId = localStorage.getItem('userId');
//     if (!userId) {
//       alert('User not logged in!');
//       navigate('/login');
//       return;
//     }

//     const updatedUserData = { ...userData };
//     axios.put(`http://localhost:3000/users/${userId}`, updatedUserData)
//       .then(() => {
//         alert('Profile updated successfully!');
//         setIsUpdating(false);
//       })
//       .catch((error) => {
//         console.error('Error updating profile:', error);
//         setErrors({ general: 'Failed to update profile. Please try again.' });
//       });
//   };

//   const handleDelete = () => {
//     const userId = localStorage.getItem('userId');
//     if (window.confirm('Are you sure you want to delete your account?')) {
//       axios.delete(`http://localhost:3000/users/${userId}`)
//         .then(() => {
//           alert('Account deleted successfully!');
//           localStorage.removeItem('userId');
//           navigate('/login');
//         })
//         .catch((error) => {
//           console.error('Error deleting account:', error);
//           alert('Failed to delete account. Please try again.');
//         });
//     }
//   };

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div className="profile-container">
//       <h1>User Profile</h1>
//       {errors.general && <p className="error">{errors.general}</p>}

//       {isUpdating ? (
//         <form onSubmit={handleUpdate}>
//           <div className="form-group">
//             <label>Name:</label>
//             <input type="text" name="name" value={userData.name} onChange={handleChange} />
//             {errors.name && <p className="error">{errors.name}</p>}
//           </div>
//           <div className="form-group">
//             <label>Email:</label>
//             <input type="email" name="email" value={userData.email} onChange={handleChange} />
//             {errors.email && <p className="error">{errors.email}</p>}
//           </div>
//           <div className="form-group">
//             <label>Username:</label>
//             <input type="text" name="username" value={userData.username} onChange={handleChange} />
//             {errors.username && <p className="error">{errors.username}</p>}
//           </div>
//           <div className="form-group">
//             <label>Profile Picture:</label>
//             <input type="file" accept="image/*" onChange={handleImageChange} />
//             {imagePreview && <img src={imagePreview} alt="Profile Preview" className="profile-preview" />}
//           </div>

//           <button type="submit" className="btn-submit">Update Profile</button>
//           <button type="button" onClick={() => setIsUpdating(false)} className="btn-cancel">Cancel</button>
//         </form>
//       ) : (
//         <div className="profile-info">
//           {userData.profilePicture && <img src={userData.profilePicture} alt="Profile" className="profile-pic" />}
//           <p><strong>Name:</strong> {userData.name}</p>
//           <p><strong>Email:</strong> {userData.email}</p>
//           <p><strong>Username:</strong> {userData.username}</p>
//           <p><strong>Phone:</strong>{userData.phone}</p>
//           <button onClick={() => setIsUpdating(true)} className="btn-edit">Edit Profile</button>
//           <button onClick={handleDelete} className="btn-delete">Delete Account</button>
//         </div>
//       )}

//       <div className="profile-actions">
//         <button onClick={() => navigate('/create-post')} className="btn-create-post">Create New Post</button>
//         <button onClick={() => navigate('/posts')} className="btn-view-posts">View Posts</button>
//         <button onClick={() => navigate('/ChatPage')} className="btn-view-messages">View Messages</button>
//         <button onClick={() => navigate('/NotificationPage')} className="btn-view-notifications">View Notifications</button>
//       </div>
//     </div>
//   );
// };

// export default Profile;











// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './profile.css';

// const Profile = () => {
//   const [userData, setUserData] = useState({
//     name: '',
//     email: '',
//     username: '',
//     phone: '',
//     profilePicture: '',
//   });
//   const [posts, setPosts] = useState([]);
//   const [newPostContent, setNewPostContent] = useState('');
//   const [editingPostId, setEditingPostId] = useState(null);
//   const [updatedPostContent, setUpdatedPostContent] = useState('');
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   // Fetch user and posts
//   useEffect(() => {
//     const userId = localStorage.getItem('userId');
//     if (!userId) {
//       navigate('/login');
//     } else {
//       // Fetch user data
//       axios.get(`http://localhost:3000/users/${userId}`)
//         .then(response => {
//           setUserData(response.data);
//         })
//         .catch(error => {
//           console.error('Error fetching user data:', error);
//         });

//       // Fetch user's posts
//       axios.get(`http://localhost:3000/posts?authorId=${userId}`)
//         .then(response => {
//           setPosts(response.data);
//           setLoading(false);
//         })
//         .catch(error => {
//           console.error('Error fetching posts:', error);
//           setLoading(false);
//         });
//     }
//   }, [navigate]);

//   // Handle creating a new post
//   const handleCreatePost = () => {
//     const userId = localStorage.getItem('userId');
//     if (!newPostContent.trim()) {
//       alert('Post content cannot be empty!');
//       return;
//     }

//     const newPost = { content: newPostContent, authorId: userId };

//     axios.post('http://localhost:3000/posts', newPost)
//       .then(response => {
//         setPosts([...posts, response.data]);
//         setNewPostContent('');
//         alert('Post created successfully!');
//       })
//       .catch(error => {
//         console.error('Error creating post:', error);
//         alert('Failed to create post.');
//       });
//   };

//   // Handle deleting a post
//   const handleDeletePost = (postId) => {
//     if (window.confirm('Are you sure you want to delete this post?')) {
//       axios.delete(`http://localhost:3000/posts/${postId}`)
//         .then(() => {
//           setPosts(posts.filter(post => post.id !== postId));
//           alert('Post deleted successfully!');
//         })
//         .catch(error => {
//           console.error('Error deleting post:', error);
//           alert('Failed to delete post.');
//         });
//     }
//   };

//   // Handle updating a post
//   const handleUpdatePost = (postId) => {
//     if (!updatedPostContent.trim()) {
//       alert('Updated post content cannot be empty!');
//       return;
//     }

//     axios.put(`http://localhost:3000/posts/${postId}`, { content: updatedPostContent })
//       .then(() => {
//         setPosts(posts.map(post => post.id === postId ? { ...post, content: updatedPostContent } : post));
//         setEditingPostId(null);
//         setUpdatedPostContent('');
//         alert('Post updated successfully!');
//       })
//       .catch(error => {
//         console.error('Error updating post:', error);
//         alert('Failed to update post.');
//       });
//   };

//   // Handle logout
//   const handleLogout = () => {
//     localStorage.removeItem('userId');
//     navigate('/login');
//   };

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div className="profile-container">
//       <h1>Profile</h1>
//       <div className="profile-info">
//         {userData.profilePicture && (
//           <img src={userData.profilePicture} alt="Profile" className="profile-pic" />
//         )}
//         <p><strong>Name:</strong> {userData.name}</p>
//         <p><strong>Email:</strong> {userData.email}</p>
//         <p><strong>Username:</strong> {userData.username}</p>
//         <p><strong>Phone:</strong>{userData.phone}</p>
//         <button onClick={handleLogout} className="btn-logout">Logout</button>
//       </div>

//       <div className="post-section">
//         <h2>Create New Post</h2>
//         <textarea
//           placeholder="Write something..."
//           value={newPostContent}
//           onChange={(e) => setNewPostContent(e.target.value)}
//         />
//         <button onClick={handleCreatePost} className="btn-create-post">Post</button>

//         <h2>My Posts</h2>
//         {posts.length > 0 ? (
//           posts.map(post => (
//             <div key={post.id} className="post-item">
//               {editingPostId === post.id ? (
//                 <>
//                   <textarea
//                     value={updatedPostContent}
//                     onChange={(e) => setUpdatedPostContent(e.target.value)}
//                   />
//                   <button onClick={() => handleUpdatePost(post.id)} className="btn-update">Save</button>
//                   <button onClick={() => setEditingPostId(null)} className="btn-cancel">Cancel</button>
//                 </>
//               ) : (
//                 <>
//                   <p>{post.content}</p>
//                   <button onClick={() => setEditingPostId(post.id) || setUpdatedPostContent(post.content)} className="btn-edit">Edit</button>
//                   <button onClick={() => handleDeletePost(post.id)} className="btn-delete">Delete</button>
//                 </>
//               )}
//             </div>
//           ))
//         ) : (
//           <p>You haven't created any posts yet.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Profile;



// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './profile.css';

// const Profile = () => {
//   const [userData, setUserData] = useState({
//     name: '',
//     email: '',
//     username: '',
//     phone: '',
//     profilePicture: '',
//   });
//   const [posts, setPosts] = useState([]);
//   const [newPostContent, setNewPostContent] = useState('');
//   const [editingPostId, setEditingPostId] = useState(null);
//   const [updatedPostContent, setUpdatedPostContent] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [editingProfile, setEditingProfile] = useState(false);
//   const [updatedProfileData, setUpdatedProfileData] = useState({
//     name: '',
//     email: '',
//     username: '',
//     phone: '',
//     profilePicture: '',
//   });
//   const navigate = useNavigate();

//   // Fetch user and posts
//   useEffect(() => {
//     const userId = localStorage.getItem('userId');
//     if (!userId) {
//       navigate('/login');
//     } else {
//       // Fetch user data
//       axios.get(`http://localhost:3000/users/${userId}`)
//         .then(response => {
//           setUserData(response.data);
//           setUpdatedProfileData(response.data); // Populate the profile form with current data
//         })
//         .catch(error => {
//           console.error('Error fetching user data:', error);
//         });

//       // Fetch user's posts
//       axios.get(`http://localhost:3000/posts?authorId=${userId}`)
//         .then(response => {
//           setPosts(response.data);
//           setLoading(false);
//         })
//         .catch(error => {
//           console.error('Error fetching posts:', error);
//           setLoading(false);
//         });
//     }
//   }, [navigate]);

//   // Handle creating a new post
//   const handleCreatePost = () => {
//     const userId = localStorage.getItem('userId');
//     if (!newPostContent.trim()) {
//       alert('Post content cannot be empty!');
//       return;
//     }

//     const newPost = { content: newPostContent, authorId: userId };

//     axios.post('http://localhost:3000/posts', newPost)
//       .then(response => {
//         setPosts([...posts, response.data]);
//         setNewPostContent('');
//         alert('Post created successfully!');
//       })
//       .catch(error => {
//         console.error('Error creating post:', error);
//         alert('Failed to create post.');
//       });
//   };

//   // Handle deleting a post
//   const handleDeletePost = (postId) => {
//     if (window.confirm('Are you sure you want to delete this post?')) {
//       axios.delete(`http://localhost:3000/posts/${postId}`)
//         .then(() => {
//           setPosts(posts.filter(post => post.id !== postId));
//           alert('Post deleted successfully!');
//         })
//         .catch(error => {
//           console.error('Error deleting post:', error);
//           alert('Failed to delete post.');
//         });
//     }
//   };

//   // Handle updating a post
//   const handleUpdatePost = (postId) => {
//     if (!updatedPostContent.trim()) {
//       alert('Updated post content cannot be empty!');
//       return;
//     }

//     axios.put(`http://localhost:3000/posts/${postId}`, { content: updatedPostContent })
//       .then(() => {
//         setPosts(posts.map(post => post.id === postId ? { ...post, content: updatedPostContent } : post));
//         setEditingPostId(null);
//         setUpdatedPostContent('');
//         alert('Post updated successfully!');
//       })
//       .catch(error => {
//         console.error('Error updating post:', error);
//         alert('Failed to update post.');
//       });
//   };

//   // Handle updating profile data
//   const handleProfileUpdate = () => {
//     const userId = localStorage.getItem('userId');
//     axios.put(`http://localhost:3000/users/${userId}`, updatedProfileData)
//       .then(response => {
//         setUserData(response.data);
//         setEditingProfile(false);
//         alert('Profile updated successfully!');
//       })
//       .catch(error => {
//         console.error('Error updating profile:', error);
//         alert('Failed to update profile.');
//       });
//   };

//   // Handle profile delete
//   const handleProfileDelete = () => {
//     const userId = localStorage.getItem('userId');
//     if (window.confirm('Are you sure you want to delete your profile and all associated posts?')) {
//       // Delete user's posts
//       axios.delete(`http://localhost:3000/posts?authorId=${userId}`)
//         .then(() => {
//           // Delete user profile
//           axios.delete(`http://localhost:3000/users/${userId}`)
//             .then(() => {
//               localStorage.removeItem('userId');
//               navigate('/login');
//               alert('Profile and posts deleted successfully.');
//             })
//             .catch(error => {
//               console.error('Error deleting user profile:', error);
//               alert('Failed to delete user profile.');
//             });
//         })
//         .catch(error => {
//           console.error('Error deleting posts:', error);
//           alert('Failed to delete posts.');
//         });
//     }
//   };

//   // Handle logout
//   const handleLogout = () => {
//     localStorage.removeItem('userId');
//     navigate('/login');
//   };

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div className="profile-container">
//       <h1>Profile</h1>
//       <div className="profile-info">
//         {userData.profilePicture && (
//           <img src={userData.profilePicture} alt="Profile" className="profile-pic" />
//         )}
//         <p><strong>Name:</strong> {userData.name}</p>
//         <p><strong>Email:</strong> {userData.email}</p>
//         <p><strong>Username:</strong> {userData.username}</p>
//         <p><strong>Phone:</strong>{userData.phone}</p>
//         <button onClick={handleLogout} className="btn-logout">Logout</button>
//         <button onClick={() => setEditingProfile(true)} className="btn-edit-profile">Edit Profile</button>
//         <button onClick={handleProfileDelete} className="btn-delete-profile">Delete Profile</button>
//       </div>

//       {editingProfile && (
//         <div className="edit-profile-form">
//           <h2>Edit Profile</h2>
//           <label>Name:</label>
//           <input
//             type="text"
//             value={updatedProfileData.name}
//             onChange={(e) => setUpdatedProfileData({ ...updatedProfileData, name: e.target.value })}
//           />
//           <label>Email:</label>
//           <input
//             type="email"
//             value={updatedProfileData.email}
//             onChange={(e) => setUpdatedProfileData({ ...updatedProfileData, email: e.target.value })}
//           />
//           <label>Username:</label>
//           <input
//             type="text"
//             value={updatedProfileData.username}
//             onChange={(e) => setUpdatedProfileData({ ...updatedProfileData, username: e.target.value })}
//           />
//           <label>Phone:</label>
//           <input
//             type="text"
//             value={updatedProfileData.phone}
//             onChange={(e) => setUpdatedProfileData({ ...updatedProfileData, phone: e.target.value })}
//           />
//           <button onClick={handleProfileUpdate} className="btn-save-profile">Save</button>
//           <button onClick={() => setEditingProfile(false)} className="btn-cancel">Cancel</button>
//         </div>
//       )}

//       <div className="post-section">
//         <h2>Create New Post</h2>
//         <textarea
//           placeholder="Write something..."
//           value={newPostContent}
//           onChange={(e) => setNewPostContent(e.target.value)}
//         />
//         <button onClick={handleCreatePost} className="btn-create-post">Post</button>

//         <h2>My Posts</h2>
//         {posts.length > 0 ? (
//           posts.map(post => (
//             <div key={post.id} className="post-item">
//               {editingPostId === post.id ? (
//                 <>
//                   <textarea
//                     value={updatedPostContent}
//                     onChange={(e) => setUpdatedPostContent(e.target.value)}
//                   />
//                   <button onClick={() => handleUpdatePost(post.id)} className="btn-update">Save</button>
//                   <button onClick={() => setEditingPostId(null)} className="btn-cancel">Cancel</button>
//                 </>
//               ) : (
//                 <>
//                   <p>{post.content}</p>
//                   <button onClick={() => setEditingPostId(post.id) || setUpdatedPostContent(post.content)} className="btn-edit">Edit</button>
//                   <button onClick={() => handleDeletePost(post.id)} className="btn-delete">Delete</button>
//                 </>
//               )}
//             </div>
//           ))
//         ) : (
//           <p>You haven't created any posts yet.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Profile;




// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './profile.css';

// const Profile = () => {
//   const [userData, setUserData] = useState({
//     name: '',
//     email: '',
//     username: '',
//     phone: '',
//     profilePicture: '',
//   });
//   const [posts, setPosts] = useState([]);
//   const [newPostContent, setNewPostContent] = useState('');
//   const [editingPostId, setEditingPostId] = useState(null);
//   const [updatedPostContent, setUpdatedPostContent] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [editingProfile, setEditingProfile] = useState(false);
//   const [updatedProfileData, setUpdatedProfileData] = useState({
//     name: '',
//     email: '',
//     username: '',
//     phone: '',
//     profilePicture: '',
//   });

//   const [isRegistering, setIsRegistering] = useState(false); // State to toggle between profile edit and registration

//   const navigate = useNavigate();

//   // Fetch user and posts
//   useEffect(() => {
//     const userId = localStorage.getItem('userId');
//     if (!userId) {
//       navigate('/login');
//     } else {
//       // Fetch user data
//       axios.get(`http://localhost:3000/users/${userId}`)
//         .then(response => {
//           setUserData(response.data);
//           setUpdatedProfileData(response.data); // Populate the profile form with current data
//         })
//         .catch(error => {
//           console.error('Error fetching user data:', error);
//         });

//       // Fetch user's posts
//       axios.get(`http://localhost:3000/posts?authorId=${userId}`)
//         .then(response => {
//           setPosts(response.data);
//           setLoading(false);
//         })
//         .catch(error => {
//           console.error('Error fetching posts:', error);
//           setLoading(false);
//         });
//     }
//   }, [navigate]);

//   // Handle registration
//   const handleRegistration = () => {
//     if (!updatedProfileData.name || !updatedProfileData.email || !updatedProfileData.username || !updatedProfileData.phone) {
//       alert('Please fill in all fields.');
//       return;
//     }

//     axios.post('http://localhost:3000/users', updatedProfileData)
//       .then(response => {
//         setUserData(response.data);
//         localStorage.setItem('userId', response.data.id); // Store the user ID in localStorage
//         setIsRegistering(false);
//         alert('Registration successful!');
//       })
//       .catch(error => {
//         console.error('Error during registration:', error);
//         alert('Failed to register.');
//       });
//   };

//   // Handle profile update
//   const handleProfileUpdate = () => {
//     const userId = localStorage.getItem('userId');
//     axios.put(`http://localhost:3000/users/${userId}`, updatedProfileData)
//       .then(response => {
//         setUserData(response.data);
//         setEditingProfile(false);
//         // alert('Profile updated successfully!');
//       })
//       .catch(error => {
//         console.error('Error updating profile:', error);
//         // alert('Failed to update profile.');
//       });
//   };

//   // Handle creating a new post
//   const handleCreatePost = () => {
//     const userId = localStorage.getItem('userId');
//     if (!newPostContent.trim()) {
//       // alert('Post content cannot be empty!');
//       return;
//     }

//     const newPost = { content: newPostContent, authorId: userId };

//     axios.post('http://localhost:3000/posts', newPost)
//       .then(response => {
//         setPosts([...posts, response.data]);
//         setNewPostContent('');
//         // alert('Post created successfully!');
//       })
//       .catch(error => {
//         console.error('Error creating post:', error);
//         // alert('Failed to create post.');
//       });
//   };

//   // Handle deleting a post
//   const handleDeletePost = (postId) => {
//     if (window.confirm('Are you sure you want to delete this post?')) {
//       axios.delete(`http://localhost:3000/posts/${postId}`)
//         .then(() => {
//           setPosts(posts.filter(post => post.id !== postId));
//           alert('Post deleted successfully!');
//         })
//         .catch(error => {
//           console.error('Error deleting post:', error);
//           alert('Failed to delete post.');
//         });
//     }
//   };

//   // Handle updating a post
//   const handleUpdatePost = (postId) => {
//     if (!updatedPostContent.trim()) {
//       // alert('Updated post content cannot be empty!');
//       return;
//     }

//     axios.put(`http://localhost:3000/posts/${postId}`, { content: updatedPostContent })
//       .then(() => {
//         setPosts(posts.map(post => post.id === postId ? { ...post, content: updatedPostContent } : post));
//         setEditingPostId(null);
//         setUpdatedPostContent('');
//         // alert('Post updated successfully!');
//       })
//       .catch(error => {
//         console.error('Error updating post:', error);
//         // alert('Failed to update post.');
//       });
//   };

//   // Handle profile delete
//   const handleProfileDelete = () => {
//     const userId = localStorage.getItem('userId');
//     if (window.confirm('Are you sure you want to delete your profile and all associated posts?')) {
//       // Delete user's posts
//       axios.delete(`http://localhost:3000/posts?authorId=${userId}`)
//         .then(() => {
//           // Delete user profile
//           axios.delete(`http://localhost:3000/users/${userId}`)
//             .then(() => {
//               localStorage.removeItem('userId');
//               navigate('/login');
//               // alert('Profile and posts deleted successfully.');
//             })
//             .catch(error => {
//               console.error('Error deleting user profile:', error);
//               // alert('Failed to delete user profile.');
//             });
//         })
//         .catch(error => {
//           console.error('Error deleting posts:', error);
//           // alert('Failed to delete posts.');
//         });
//     }
//   };

//   // Handle logout
//   const handleLogout = () => {
//     localStorage.removeItem('userId');
//     navigate('/login');
//   };

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div className="profile-container">
//       <h1>{isRegistering ? 'Register' : 'Profile'}</h1>
      
//       {/* Register Form */}
//       {isRegistering && (
//         <div className="edit-profile-form">
//           <h2>Create an Account</h2>
//           <label>Name:</label>
//           <input
//             type="text"
//             value={updatedProfileData.name}
//             onChange={(e) => setUpdatedProfileData({ ...updatedProfileData, name: e.target.value })}
//           />
//           <label>Email:</label>
//           <input
//             type="email"
//             value={updatedProfileData.email}
//             onChange={(e) => setUpdatedProfileData({ ...updatedProfileData, email: e.target.value })}
//           />
//           <label>Username:</label>
//           <input
//             type="text"
//             value={updatedProfileData.username}
//             onChange={(e) => setUpdatedProfileData({ ...updatedProfileData, username: e.target.value })}
//           />
//           <label>Phone:</label>
//           <input
//             type="text"
//             value={updatedProfileData.phone}
//             onChange={(e) => setUpdatedProfileData({ ...updatedProfileData, phone: e.target.value })}
//           />
//           <button onClick={handleRegistration} className="btn-save-profile">Register</button>
//           <button onClick={() => setIsRegistering(false)} className="btn-cancel">Cancel</button>
//         </div>
//       )}

//       {/* Profile Info Section */}
//       {!isRegistering && (
//         <div className="profile-info">
//           {userData.profilePicture && (
//             <img src={userData.profilePicture} alt="Profile" className="profile-pic" />
//           )}
//           <p><strong>Name:</strong> {userData.name}</p>
//           <p><strong>Email:</strong> {userData.email}</p>
//           <p><strong>Username:</strong> {userData.username}</p>
//           <p><strong>Phone:</strong>{userData.phone}</p>
//           <button onClick={handleLogout} className="btn-logout">Logout</button>
//           <button onClick={() => setEditingProfile(true)} className="btn-edit-profile">Edit Profile</button>
//           <button onClick={handleProfileDelete} className="btn-delete-profile">Delete Profile</button>
//         </div>
//       )}

//       {/* Edit Profile Section */}
//       {editingProfile && !isRegistering && (
//         <div className="edit-profile-form">
//           <h2>Edit Profile</h2>
//           <label>Name:</label>
//           <input
//             type="text"
//             value={updatedProfileData.name}
//             onChange={(e) => setUpdatedProfileData({ ...updatedProfileData, name: e.target.value })}
//           />
//           <label>Email:</label>
//           <input
//             type="email"
//             value={updatedProfileData.email}
//             onChange={(e) => setUpdatedProfileData({ ...updatedProfileData, email: e.target.value })}
//           />
//           <label>Username:</label>
//           <input
//             type="text"
//             value={updatedProfileData.username}
//             onChange={(e) => setUpdatedProfileData({ ...updatedProfileData, username: e.target.value })}
//           />
//           <label>Phone:</label>
//           <input
//             type="text"
//             value={updatedProfileData.phone}
//             onChange={(e) => setUpdatedProfileData({ ...updatedProfileData, phone: e.target.value })}
//           />
//           <button onClick={handleProfileUpdate} className="btn-save-profile">Save</button>
//           <button onClick={() => setEditingProfile(false)} className="btn-cancel">Cancel</button>
//         </div>
//       )}
      
//       {/* Post Section */}
//       <div className="post-section">
//         <h2>Create New Post</h2>
//         <textarea
//           placeholder="Write something..."
//           value={newPostContent}
//           onChange={(e) => setNewPostContent(e.target.value)}
//         />
//         <button onClick={handleCreatePost} className="btn-create-post">Post</button>

//         <h2>My Posts</h2>
//         {posts.length > 0 ? (
//           posts.map(post => (
//             <div key={post.id} className="post-item">
//               {editingPostId === post.id ? (
//                 <>
//                   <textarea
//                     value={updatedPostContent}
//                     onChange={(e) => setUpdatedPostContent(e.target.value)}
//                   />
//                   <button onClick={() => handleUpdatePost(post.id)} className="btn-update">Save</button>
//                   <button onClick={() => setEditingPostId(null)} className="btn-cancel">Cancel</button>
//                 </>
//               ) : (
//                 <>
//                   <p>{post.content}</p>
//                   <button onClick={() => setEditingPostId(post.id) || setUpdatedPostContent(post.content)} className="btn-edit">Edit</button>
//                   <button onClick={() => handleDeletePost(post.id)} className="btn-delete">Delete</button>
//                 </>
//               )}
//             </div>
//           ))
//         ) : (
//           <p>You haven't created any posts yet.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Profile;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './profile.css';

const Profile = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    username: '',
    phone: '',
    profilePicture: '',
  });
  const [posts, setPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState('');
  const [editingPostId, setEditingPostId] = useState(null);
  const [updatedPostContent, setUpdatedPostContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [editingProfile, setEditingProfile] = useState(false);
  const [updatedProfileData, setUpdatedProfileData] = useState({
    name: '',
    email: '',
    username: '',
    phone: '',
    profilePicture: null,
  });

  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      navigate('/login');
    } else {
      axios.get(`http://localhost:3000/users/${userId}`)
        .then(response => {
          setUserData(response.data);
          setUpdatedProfileData(response.data); 
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });

      axios.get(`http://localhost:3000/posts?authorId=${userId}`)
        .then(response => {
          setPosts(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching posts:', error);
          setLoading(false);
        });
    }
  }, [navigate]);

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUpdatedProfileData({
          ...updatedProfileData,
          profilePicture: reader.result, 
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileUpdate = () => {
    const userId = localStorage.getItem('userId');
    const updatedData = {
      name: updatedProfileData.name,
      email: updatedProfileData.email,
      username: updatedProfileData.username,
      phone: updatedProfileData.phone,
      profilePicture: updatedProfileData.profilePicture,
    };

    axios.put(`http://localhost:3000/users/${userId}`, updatedData)
      .then(response => {
        setUserData(response.data);
        setEditingProfile(false); 
      })
      .catch(error => {
        console.error('Error updating profile:', error);
      });
  };

  const handleCreatePost = () => {
    const userId = localStorage.getItem('userId');
    if (!newPostContent.trim()) {
      return;
    }

    const newPost = { content: newPostContent, authorId: userId };

    axios.post('http://localhost:3000/posts', newPost)
      .then(response => {
        setPosts([...posts, response.data]);
        setNewPostContent('');
      })
      .catch(error => {
        console.error('Error creating post:', error);
      });
  };

  const handleProfileDelete = () => {
    const userId = localStorage.getItem('userId');
    if (window.confirm('Are you sure you want to delete your profile and all associated posts?')) {
      // axios.delete(`http://localhost:3000/posts?authorId=${userId}`)
        // .then(() => {
          axios.delete(`http://localhost:3000/users/${userId}`)
            .then(() => {
              localStorage.removeItem('userId');
              navigate('/login');
            })
            .catch(error => {
              console.error('Error deleting user profile:', error);
            });
        // })
        // .catch(error => {
        //   console.error('Error deleting posts:', error);
        // });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    navigate('/login');
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="profile-container">
      <h1>{isRegistering ? 'Register' : 'Profile'}</h1>

      {isRegistering && (
        <div className="edit-profile-form">
          <h2>Create an Account</h2>
          <label>Name:</label>
          <input
            type="text"
            value={updatedProfileData.name}
            onChange={(e) => setUpdatedProfileData({ ...updatedProfileData, name: e.target.value })}
          />
          <label>Email:</label>
          <input
            type="email"
            value={updatedProfileData.email}
            onChange={(e) => setUpdatedProfileData({ ...updatedProfileData, email: e.target.value })}
          />
          <label>Username:</label>
          <input
            type="text"
            value={updatedProfileData.username}
            onChange={(e) => setUpdatedProfileData({ ...updatedProfileData, username: e.target.value })}
          />
          <label>Phone:</label>
          <input
            type="text"
            value={updatedProfileData.phone}
            onChange={(e) => setUpdatedProfileData({ ...updatedProfileData, phone: e.target.value })}
          />
          <button onClick={handleRegistration} className="btn-save-profile">Register</button>
          <button onClick={() => setIsRegistering(false)} className="btn-cancel">Cancel</button>
        </div>
      )}

      {!isRegistering && (
        <div className="profile-info">
          {userData.profilePicture && (
            <img src={userData.profilePicture} alt="Profile" className="profile-pic" />
          )}
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Username:</strong> {userData.username}</p>
          <p><strong>Phone:</strong>{userData.phone}</p>
          <button onClick={handleLogout} className="btn-logout">Logout</button>
          <button onClick={() => setEditingProfile(true)} className="btn-edit">Edit Profile</button>
          <button onClick={handleProfileDelete} className="btn-delete">Delete Profile</button>
        </div>
      )}

      {editingProfile && (
        <div className="edit-profile-form">
          <h2>Edit Profile</h2>
          <label>Name:</label>
          <input
            type="text"
            value={updatedProfileData.name}
            onChange={(e) => setUpdatedProfileData({ ...updatedProfileData, name: e.target.value })}
          />
          <label>Email:</label>
          <input
            type="email"
            value={updatedProfileData.email}
            onChange={(e) => setUpdatedProfileData({ ...updatedProfileData, email: e.target.value })}
          />
          <label>Username:</label>
          <input
            type="text"
            value={updatedProfileData.username}
            onChange={(e) => setUpdatedProfileData({ ...updatedProfileData, username: e.target.value })}
          />
          <label>Phone:</label>
          <input
            type="text"
            value={updatedProfileData.phone}
            onChange={(e) => setUpdatedProfileData({ ...updatedProfileData, phone: e.target.value })}
          />
          <label>Profile Picture:</label>
          <input
            type="file"
            onChange={handleProfilePictureChange}
          />
          <button onClick={handleProfileUpdate} className="btn-save-profile">Save</button>
          <button onClick={() => setEditingProfile(false)} className="btn-cancel">Cancel</button>
        </div>
      )}

      <div className="post-section">
        <h2>Create New Post</h2>
        <textarea
          placeholder="Write something..."
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
        />
        <button onClick={handleCreatePost} className="btn-create-post">Post</button>

        <h2>My Posts</h2>
        {posts.length > 0 ? (
          posts.map(post => (
            <div key={post.id} className="post-item">
              {editingPostId === post.id ? (
                <>
                  <textarea
                    value={updatedPostContent}
                    onChange={(e) => setUpdatedPostContent(e.target.value)}
                  />
                  <button onClick={() => handleUpdatePost(post.id)} className="btn-update">Save</button>
                  <button onClick={() => setEditingPostId(null)} className="btn-cancel">Cancel</button>
                </>
              ) : (
                <>
                  <p>{post.content}</p>
                  <button onClick={() => setEditingPostId(post.id) || setUpdatedPostContent(post.content)} className="btn-edit">Edit</button>
                  <button onClick={() => handleDeletePost(post.id)} className="btn-delete">Delete</button>
                </>
              )}
            </div>
          ))
        ) : (
          <p>You haven't created any posts yet.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
