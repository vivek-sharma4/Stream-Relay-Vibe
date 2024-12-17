import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './profile.css';

const Profile = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    username: '',
    profilePicture: '',
  });
  const [errors, setErrors] = useState({});
  const [isUpdating, setIsUpdating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      navigate('/login');
    } else {
      axios.get(`http://localhost:3000/users/${userId}`)
        .then(response => {
          setUserData(response.data);
          setImagePreview(response.data.profilePicture);
          setLoading(false);
        })
        .catch(error => {
          setLoading(false);
        });
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setUserData({ ...userData, profilePicture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!userData.name) newErrors.name = 'Name is required';
    if (!userData.email) newErrors.email = 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email))
      newErrors.email = 'Invalid email format';
    if (!userData.username) newErrors.username = 'Username is required';
    return newErrors;
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('User not logged in!');
      navigate('/login');
      return;
    }

    const updatedUserData = { ...userData };
    axios.put(`http://localhost:3000/users/${userId}`, updatedUserData)
      .then(() => {
        alert('Profile updated successfully!');
        setIsUpdating(false);
      })
      .catch((error) => {
        setErrors({ general: 'Failed to update profile. Please try again.' });
      });
  };

  const handleDelete = () => {
    const userId = localStorage.getItem('userId');
    if (window.confirm('Are you sure you want to delete your account?')) {
      axios.delete(`http://localhost:3000/users/${userId}`)
        .then(() => {
          alert('Account deleted successfully!');
          localStorage.removeItem('userId');
          navigate('/login');
        })
        .catch((error) => {
          alert('Failed to delete account. Please try again.');
        });
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="profile-container">
      <h1>User Profile</h1>
      {errors.general && <p className="error">{errors.general}</p>}

      {isUpdating ? (
        <form onSubmit={handleUpdate}>
          <div className="form-group">
            <label>Name:</label>
            <input type="text" name="name" value={userData.name} onChange={handleChange} />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" name="email" value={userData.email} onChange={handleChange} />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div className="form-group">
            <label>Username:</label>
            <input type="text" name="username" value={userData.username} onChange={handleChange} />
            {errors.username && <p className="error">{errors.username}</p>}
          </div>
          <div className="form-group">
            <label>Profile Picture:</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {imagePreview && <img src={imagePreview} alt="Profile Preview" className="profile-preview" />}
          </div>

          <button type="submit" className="btn-submit">Update Profile</button>
          <button type="button" onClick={() => setIsUpdating(false)} className="btn-cancel">Cancel</button>
        </form>
      ) : (
        <div className="profile-info">
          {userData.profilePicture && <img src={userData.profilePicture} alt="Profile" className="profile-pic" />}
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Username:</strong> {userData.username}</p>
          <button onClick={() => setIsUpdating(true)} className="btn-edit">Edit Profile</button>
          <button onClick={handleDelete} className="btn-delete">Delete Account</button>
        </div>
      )}
      <button onClick={() => navigate('/posts')} className="btn-view-posts">View Posts</button>
    </div>
  );
};

export default Profile;
