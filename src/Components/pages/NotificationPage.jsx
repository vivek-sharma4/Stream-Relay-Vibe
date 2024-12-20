import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import styled from 'styled-components'; // Importing styled-components

// Styled components
const PageWrapper = styled.div`
  font-family: Arial, sans-serif;
  padding: 20px;
  background-color: #f4f4f9;
`;

const Heading = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const NotificationList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const NotificationItem = styled.li`
  background-color: ${({ read }) => (read ? '#dcdcdc' : '#fff')};
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  box-shadow: ${({ read }) => (read ? 'none' : '0 2px 4px rgba(0, 0, 0, 0.1)')};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f1f1f1;
  }
`;

const NotificationMessage = styled.p`
  margin: 0;
  font-size: 16px;
`;

const Timestamp = styled.span`
  font-size: 12px;
  color: #888;
  display: block;
  margin-top: 5px;
`;

const MarkReadButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 10px;

  &:hover {
    background-color: #45a049;
  }
`;

const SimulateButton = styled.button`
  background-color: #2196f3;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 20px;

  &:hover {
    background-color: #1976d2;
  }
`;

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate connecting to a WebSocket server
  useEffect(() => {
    const socket = socketIOClient('http://localhost:4000'); // Replace with your server URL

    socket.on('new-notification', (newNotification) => {
      setNotifications((prevNotifications) => [newNotification, ...prevNotifications]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Simulate sending a notification (could be triggered by an event like a button click)
  const handleSendNotification = () => {
    const newNotification = {
      id: Date.now(),
      message: `You have a new notification at ${new Date().toLocaleTimeString()}`, // Corrected string formatting
      read: false,
      timestamp: new Date().toISOString(),
    };

    const socket = socketIOClient('http://localhost:4000');
    socket.emit('new-notification', newNotification);
  };

  const handleMarkAsRead = (notificationId) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === notificationId ? { ...notification, read: true } : notification
      )
    );
  };

  return (
    <PageWrapper>
      <Heading>Your Notifications</Heading>
      {loading ? (
        <p>Loading notifications...</p>
      ) : (
        <>
          {notifications.length === 0 ? (
            <p>No new notifications.</p>
          ) : (
            <NotificationList>
              {notifications.map((notification) => (
                <NotificationItem key={notification.id} read={notification.read}>
                  <NotificationMessage>{notification.message}</NotificationMessage>
                  <Timestamp>{new Date(notification.timestamp).toLocaleString()}</Timestamp>
                  {!notification.read && (
                    <MarkReadButton onClick={() => handleMarkAsRead(notification.id)}>
                      Mark as Read
                    </MarkReadButton>
                  )}
                </NotificationItem>
              ))}
            </NotificationList>
          )}
        </>
      )}

      <SimulateButton onClick={handleSendNotification}>Simulate New Notification</SimulateButton>
    </PageWrapper>
  );
};

export default NotificationPage;
