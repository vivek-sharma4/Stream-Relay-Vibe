// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';
// import './Registration.css';

// const Register = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     username: '',
//     password: '',
//     confirmPassword: '',
//   });
//   const [errors, setErrors] = useState({});
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // Validation function
//   const validate = () => {
//     const newErrors = {};
//     if (!formData.name) newErrors.name = 'Name is required';
//     if (!formData.email) newErrors.email = 'Email is required';
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
//       newErrors.email = 'Invalid email format';
//     if (!formData.phone || !/^\d{10}$/.test(formData.phone))
//       newErrors.phone = 'Phone must be a 10-digit number';
//     if (!formData.username) newErrors.username = 'Username is required';
//     if (!formData.password || formData.password.length < 3)
//       newErrors.password = 'Password must be at least 3 characters';
//     if (formData.password !== formData.confirmPassword)
//       newErrors.confirmPassword = 'Passwords do not match';
//     return newErrors;
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const validationErrors = validate();

//     if (Object.keys(validationErrors).length === 0) {
//       try {
//         console.log("Form Data Before Registration:", formData);

//         // Create user
//         const userResponse = await axios.post('http://localhost:3000/users', formData);
//         console.log('User Response:', userResponse);

//         if (userResponse.status === 201) {
//           const userId = userResponse.data.id;

//           // Create profile
//           const profileData = {
//             userId,
//             name: formData.name,
//             email: formData.email,
//             phone: formData.phone,
//             username: formData.username,
//             profilePicture: '', // You can add a default profile picture or leave it empty
//           };

//           try {
//             const profileResponse = await axios.post('http://localhost:3000/users', profileData);
//             console.log('Profile Response:', profileResponse);

//             // alert('Account created successfully!');
//             navigate('/login');
//           } catch (profileError) {
//             console.error('Profile creation failed:', profileError);
//             setErrors({ general: 'Failed to create user profile.' });
//           }
//         } else {
//           console.error('User creation failed:', userResponse);
//           setErrors({ general: 'An error occurred during registration.' });
//         }
//       } catch (error) {
//         console.error('Registration failed:', error);
//         setErrors({ general: 'An error occurred during registration.' });
//       }
//     } else {
//       setErrors(validationErrors);
//     }
//   };

//   // Handle form reset
//   const handleReset = () => {
//     setFormData({
//       name: '',
//       email: '',
//       phone: '',
//       username: '',
//       password: '',
//       confirmPassword: '',
//     });
//     setErrors({});
//   };

//   return (
//     <div className="Register">
//       <h1>Register</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Name:</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//           />
//           {errors.name && <p className="error">{errors.name}</p>}
//         </div>
//         <div>
//           <label>Email:</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//           />
//           {errors.email && <p className="error">{errors.email}</p>}
//         </div>
//         <div>
//           <label>Phone:</label>
//           <input
//             type="text"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//           />
//           {errors.phone && <p className="error">{errors.phone}</p>}
//         </div>
//         <div>
//           <label>Username:</label>
//           <input
//             type="text"
//             name="username"
//             value={formData.username}
//             onChange={handleChange}
//           />
//           {errors.username && <p className="error">{errors.username}</p>}
//         </div>
//         <div>
//           <label>Password:</label>
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//           />
//           {errors.password && <p className="error">{errors.password}</p>}
//         </div>
//         <div>
//           <label>Confirm Password:</label>
//           <input
//             type="password"
//             name="confirmPassword"
//             value={formData.confirmPassword}
//             onChange={handleChange}
//           />
//           {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
//         </div>

//         {errors.general && <p className="error">{errors.general}</p>}
//         <button type="submit">Register</button>
//         <button type="button" onClick={handleReset}>Reset</button>
//       </form>
//       <p>Already have an account? <Link to="/login">Login here</Link></p>
//     </div>
//   );
// };

// export default Register;



import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Registration.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validation function
  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'Invalid email format';
    if (!formData.phone || !/^\d{10}$/.test(formData.phone))
      newErrors.phone = 'Phone must be a 10-digit number';
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.password || formData.password.length < 3)
      newErrors.password = 'Password must be at least 3 characters';
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length === 0) {
      try {
        console.log("Form Data Before Registration:", formData);

        // Create user
        const userResponse = await axios.post('http://localhost:3000/users', formData);
        console.log('User Response:', userResponse);

        if (userResponse.status === 201) {
          const userId = userResponse.data.id;

          // Create profile
          const profileData = {
            userId,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            username: formData.username,
            profilePicture: '', // You can add a default profile picture or leave it empty
          };

          try {
            const profileResponse = await axios.post('http://localhost:3000/users', profileData);
            console.log('Profile Response:', profileResponse);

            // alert('Account created successfully!');
            navigate('/login');
          } catch (profileError) {
            console.error('Profile creation failed:', profileError);
            setErrors({ general: 'Failed to create user profile.' });
          }
        } else {
          console.error('User creation failed:', userResponse);
          setErrors({ general: 'An error occurred during registration.' });
        }
      } catch (error) {
        console.error('Registration failed:', error);
        setErrors({ general: 'An error occurred during registration.' });
      }
    } else {
      setErrors(validationErrors);
    }
  };

  // Handle form reset
  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      username: '',
      password: '',
      confirmPassword: '',
    });
    setErrors({});
  };

  return (
    <div className="Register">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <p className="error">{errors.phone}</p>}
        </div>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <p className="error">{errors.username}</p>}
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
        </div>

        {errors.general && <p className="error">{errors.general}</p>}
        <button type="submit">Register</button>
        <button type="button" onClick={handleReset}>Reset</button>
      </form>
      <p>Already have an account? <Link to="/login">Login here</Link></p>
    </div>
  );
};

export default Register;