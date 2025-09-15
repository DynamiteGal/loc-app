import React, { useState, useEffect } from 'react';
import NoteForm from './components/NoteForm';
import NotesList from './components/NotesList';
import MapView from './components/MapView';
import ChartView from './components/ChartView';
import './App.css';

function App() {
  // State for managing notes and UI
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [sortBy, setSortBy] = useState('createdAt');

  // Get all notes from the backend API
  const fetchNotes = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/notes`, {
        headers: {
          'Authorization': 'Bearer my-secret-token-123' // JWT token for auth
        }
      });
      if (response.ok) {
        const data = await response.json();
        setNotes(data);
      }
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  // Load notes when component mounts
  useEffect(() => {
    fetchNotes();
  }, []);

  // Refresh notes list after adding a new note
  const handleNoteAdded = () => {
    fetchNotes();
  };

  // Refresh notes list after deleting a note
  const handleNoteDeleted = () => {
    fetchNotes();
    setSelectedNote(null); // Clear selection if deleted note was selected
  };

  // Refresh notes list after updating a note
  const handleNoteUpdated = () => {
    fetchNotes();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Main app title */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          📍 Location-Based Notes
        </h1>
        
        {/* Two column layout for desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left side - form and notes list */}
          <div className="space-y-6">
            <NoteForm onNoteAdded={handleNoteAdded} />
            
            {/* Notes list container */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Your Notes</h2>
                {/* Sort dropdown */}
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm"
                >
                  <option value="createdAt">Sort by Date</option>
                  <option value="title">Sort by Title</option>
                </select>
              </div>
              <NotesList 
                notes={notes} 
                sortBy={sortBy}
                selectedNote={selectedNote}
                onNoteSelect={setSelectedNote}
                onNoteDeleted={handleNoteDeleted}
                onNoteUpdated={handleNoteUpdated}
              />
            </div>
          </div>

          {/* Right side - map and chart */}
          <div className="space-y-6">
            <MapView 
              notes={notes}
              selectedNote={selectedNote}
              onNoteSelect={setSelectedNote}
            />
            
            <ChartView notes={notes} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
