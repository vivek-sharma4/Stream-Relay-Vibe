const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Simulated user and notification databases
const users = [];
const notifications = [];

// Register endpoint
app.post('/register', (req, res) => {
  const { name, email, phone, username, password, languages } = req.body;

  // Check for existing user
  const existingUser = users.find((u) => u.email === email || u.username === username);
  if (existingUser) {
    return res.status(400).json({ success: false, message: 'User already exists' });
  }

  // Save new user
  const newUser = { id: users.length + 1, name, email, phone, username, password, languages };
  users.push(newUser);

  console.log('Registered Users:', users);
  res.status(201).json({ success: true, message: 'User registered successfully' });
});

// Login endpoint
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    res.json({ success: true, username: user.username, message: 'Login successful' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// Notifications endpoint to get notifications for a user (Mock)
app.get('/notifications', (req, res) => {
  const { userId } = req.query;
  if (!userId) {
    return res.status(400).json({ success: false, message: 'User ID is required' });
  }

  // Filter notifications by userId
  const userNotifications = notifications.filter(notification => notification.userId === parseInt(userId));
  res.json(userNotifications);
});

// Mark notification as read (Mock)
app.put('/notifications/:id', (req, res) => {
  const { id } = req.params;
  const { read } = req.body;

  const notification = notifications.find(notification => notification.id === parseInt(id));

  if (notification) {
    notification.read = read;
    res.json(notification);
  } else {
    res.status(404).json({ error: 'Notification not found' });
  }
});

// Simulating notifications creation (for testing)
app.post('/createNotification', (req, res) => {
  const { userId, message } = req.body;

  // Create a new notification for the user
  const newNotification = {
    id: notifications.length + 1,
    userId,
    message,
    read: false,
    timestamp: new Date().toISOString(),
  };
  
  notifications.push(newNotification);
  res.status(201).json(newNotification);
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
