const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(cors()); // Allow frontend to connect
app.use(express.json()); // Parse JSON requests

// Simple in-memory storage (resets on server restart)
let notes = [];
let nextId = 1;

// Simple JWT token check (dummy authentication)
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token || token !== 'my-secret-token-123') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  next();
};

// Validate note data before saving
const validateNote = (req, res, next) => {
  const { title, content } = req.body;

  if (!title || title.length < 3) {
    return res.status(400).json({ 
      error: 'Title must be at least 3 characters long' 
    });
  }

  if (!content || content.length < 5) {
    return res.status(400).json({ 
      error: 'Content must be at least 5 characters long' 
    });
  }

  next();
};

// API Routes

// Get all notes (sorted by newest first)
app.get('/notes', authenticateToken, (req, res) => {
  const sortedNotes = [...notes].sort((a, b) => 
    new Date(b.createdAt) - new Date(a.createdAt)
  );
  res.json(sortedNotes);
});

// Create a new note
app.post('/notes', authenticateToken, validateNote, (req, res) => {
  const { title, content, latitude, longitude } = req.body;

  const newNote = {
    id: nextId++,
    title,
    content,
    latitude: latitude || null,
    longitude: longitude || null,
    createdAt: new Date().toISOString()
  };

  notes.push(newNote);
  res.status(201).json(newNote);
});

// Update an existing note
app.put('/notes/:id', authenticateToken, validateNote, (req, res) => {
  const noteId = parseInt(req.params.id);
  const { title, content } = req.body;

  const noteIndex = notes.findIndex(note => note.id === noteId);
  
  if (noteIndex === -1) {
    return res.status(404).json({ error: 'Note not found' });
  }

  notes[noteIndex] = {
    ...notes[noteIndex],
    title,
    content,
    updatedAt: new Date().toISOString()
  };

  res.json(notes[noteIndex]);
});

// Delete a note
app.delete('/notes/:id', authenticateToken, (req, res) => {
  const noteId = parseInt(req.params.id);
  const noteIndex = notes.findIndex(note => note.id === noteId);
  
  if (noteIndex === -1) {
    return res.status(404).json({ error: 'Note not found' });
  }

  notes.splice(noteIndex, 1);
  res.status(204).send();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Location-Based Notes API ready!`);
});
