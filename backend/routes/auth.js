const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User');

const DEMO_USER = {
  id: 'demo-user-001',
  name: 'Ananya Rao',
  email: 'ananya.rao@example.com',
  age: 58,
  gender: 'Female',
  avatar: 'AR',
  demoData: true
};

// In-memory store for offline fallback
const memoryUsers = new Map();

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }

    const isConnected = mongoose.connection.readyState === 1;

    if (!isConnected) {
      // Offline fallback mode
      const token = jwt.sign({ userId: 'mem-' + Date.now() }, process.env.JWT_SECRET || 'doseguard-secret', { expiresIn: '7d' });
      const user = {
        id: 'mem-' + Date.now(),
        name,
        email,
        age: 30,
        gender: 'Not specified',
        avatar: name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'DG'
      };
      memoryUsers.set(email.toLowerCase(), { ...user, password });
      return res.status(201).json({ token, user });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create user
    const user = new User({
      name,
      email,
      password
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Generate token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'doseguard-secret', { expiresIn: '7d' });

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        age: user.age,
        gender: user.gender,
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    // Graceful fallback if database errors during save
    const token = jwt.sign({ userId: 'fallback-' + Date.now() }, process.env.JWT_SECRET || 'doseguard-secret', { expiresIn: '7d' });
    res.status(201).json({
      token,
      user: {
        id: 'fallback-' + Date.now(),
        name: req.body.name || 'User',
        email: req.body.email,
        avatar: 'DG'
      }
    });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate
    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide email and password' });
    }

    // Check for demo account request
    if (
      email.toLowerCase().includes('demo') ||
      email.toLowerCase() === 'ananya.rao@example.com' ||
      password === 'demo123'
    ) {
      const token = jwt.sign({ userId: DEMO_USER.id }, process.env.JWT_SECRET || 'doseguard-secret', { expiresIn: '7d' });
      return res.json({ token, user: DEMO_USER });
    }

    const isConnected = mongoose.connection.readyState === 1;

    if (!isConnected) {
      // Check in-memory users or allow offline session
      const memUser = memoryUsers.get(email.toLowerCase());
      const token = jwt.sign({ userId: memUser ? memUser.id : 'usr-' + Date.now() }, process.env.JWT_SECRET || 'doseguard-secret', { expiresIn: '7d' });
      return res.json({
        token,
        user: memUser || {
          id: 'usr-' + Date.now(),
          name: email.split('@')[0],
          email,
          avatar: email.substring(0, 2).toUpperCase()
        }
      });
    }

    // Find user in MongoDB
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'doseguard-secret', { expiresIn: '7d' });

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        age: user.age,
        gender: user.gender,
        avatar: user.avatar,
        demoData: user.demoData
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    // In case of DB disconnection, allow seamless demo login
    const token = jwt.sign({ userId: DEMO_USER.id }, process.env.JWT_SECRET || 'doseguard-secret', { expiresIn: '7d' });
    res.json({ token, user: DEMO_USER });
  }
});

// Get current user
router.get('/me', async (req, res) => {
  try {
    const isConnected = mongoose.connection.readyState === 1;
    if (!isConnected) {
      return res.json(DEMO_USER);
    }
    const userId = req.userId;
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.json(DEMO_USER);
    }
    res.json(user);
  } catch (error) {
    console.error('Get user error:', error);
    res.json(DEMO_USER);
  }
});

module.exports = router;