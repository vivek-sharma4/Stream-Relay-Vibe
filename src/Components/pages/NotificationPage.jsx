// // NotificationPage.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './NotificationPage.css';

// const NotificationPage = () => {
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const userId = localStorage.getItem('userId');
//     if (!userId) {
//       alert('User not logged in. Redirecting to login...');
//       navigate('/login');
//       return;
//     }
//     const mockNotifications = [
//     { id: 1, message: 'You have a new comment on your post!', read: false, timestamp: '2024-12-17T12:00:00Z' },
//     { id: 2, message: 'Someone liked your post!', read: false, timestamp: '2024-12-16T15:00:00Z' },
//     { id: 3, message: 'Your post has been shared!', read: true, timestamp: '2024-12-15T18:00:00Z' }
//   ];
  
//     // Fetch notifications specific to the user
//     axios.get(`http://localhost:3000/notifications?userId=${userId}`)
//       .then(response => {
//         console.log('Fetched notifications:', response.data); // Debugging line
//         setNotifications(response.data);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error('Error fetching notifications:', err);
//         setError('Failed to load notifications. Please try again later.');
//         setLoading(false);
//       });
//   }, [navigate]);

//   const handleMarkAsRead = (notificationId) => {
//     // Mark notification as read
//     axios.put(`http://localhost:3000/notifications/${notificationId}`, { read: true })
//       .then(() => {
//         setNotifications(notifications.map(notification => 
//           notification.id === notificationId ? { ...notification, read: true } : notification
//         ));
//       })
//       .catch(err => {
//         console.error('Error updating notification status:', err);
//       });
//   };

//   if (loading) {
//     return <p>Loading notifications...</p>;
//   }

//   return (
//     <div className="notification-page">
//       <h1>Your Notifications</h1>
//       {error && <p className="error">{error}</p>}
//       {notifications.length === 0 ? (
//         <p>No new notifications.</p>
//       ) : (
//         <ul>
//           {notifications.map(notification => (
//             <li key={notification.id} className={`notification ${notification.read ? 'read' : 'unread'}`}>
//               <p>{notification.message}</p>
//               <span>{new Date(notification.timestamp).toLocaleString()}</span>
//               {!notification.read && (
//                 <button onClick={() => handleMarkAsRead(notification.id)}>Mark as Read</button>
//               )}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default NotificationPage;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './NotificationPage.css';

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    // If no user is logged in, redirect to login page
    if (!userId) {
      navigate('/login');
      return;
    }

    // Debugging: Check if userId is being fetched correctly
    console.log('User ID:', userId);

    // Mock data for testing
    const mockNotifications = [
      { id: 1, message: 'You have a new comment on your post!', read: false, timestamp: '2024-12-17T12:00:00Z' },
      { id: 2, message: 'Someone liked your post!', read: false, timestamp: '2024-12-16T15:00:00Z' },
      { id: 3, message: 'Your post has been shared!', read: true, timestamp: '2024-12-15T18:00:00Z' },
      { id: 4, message: 'Someone sent a friend request to you!', read: true, timestamp: '2024-12-14T18:00:00Z' },
    ];

    // Set mock data after 1 second (simulating API call)
    setTimeout(() => {
      setNotifications(mockNotifications);
      setLoading(false);
    }, 1000);

    // Uncomment below for real API calls when backend is ready
    // axios.get(`http://localhost:3000/notifications?userId=${userId}`)
    //   .then(response => {
    //     setNotifications(response.data);
    //     setLoading(false);
    //   })
    //   .catch(err => {
    //     console.error('Error fetching notifications:', err);
    //     setLoading(false);
    //   });
  }, [navigate]);

  const handleMarkAsRead = (notificationId) => {
    setNotifications(notifications.map(notification => 
      notification.id === notificationId ? { ...notification, read: true } : notification
    ));

    // Uncomment below for actual API PUT request when backend is ready
    // axios.put(`http://localhost:3000/notifications/${notificationId}`, { read: true })
    //   .then(() => {
    //     setNotifications(notifications.map(notification => 
    //       notification.id === notificationId ? { ...notification, read: true } : notification
    //     ));
    //   })
    //   .catch(err => {
    //     console.error('Error updating notification status:', err);
    //   });
  };

  if (loading) {
    return <p>Loading notifications...</p>;
  }

  return (
    <div className="notification-page">
      <h1>Your Notifications</h1>
      {notifications.length === 0 ? (
        <p>No new notifications.</p>
      ) : (
        <ul>
          {notifications.map(notification => (
            <li key={notification.id} className={notification.read ? 'read' : 'unread'}>
              <p>{notification.message}</p>
              <span>{new Date(notification.timestamp).toLocaleString()}</span>
              {!notification.read && (
                <button onClick={() => handleMarkAsRead(notification.id)}>Mark as Read</button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationPage;
