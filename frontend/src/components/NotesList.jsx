import React, { useState } from 'react';

const NotesList = ({ notes, sortBy, selectedNote, onNoteSelect, onNoteDeleted, onNoteUpdated }) => {
  const [editingNote, setEditingNote] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  // Sort notes based on selected criteria
  const sortedNotes = [...notes].sort((a, b) => {
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    } else {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  const handleEdit = (note) => {
    setEditingNote(note.id);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(`http://localhost:5000/notes/${editingNote}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer my-secret-token-123'
        },
        body: JSON.stringify({
          title: editTitle,
          content: editContent
        })
      });

      if (response.ok) {
        setEditingNote(null);
        onNoteUpdated();
      }
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  const handleDelete = async (noteId) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        const response = await fetch(`http://localhost:5000/notes/${noteId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': 'Bearer my-secret-token-123'
          }
        });

        if (response.ok) {
          onNoteDeleted();
        }
      } catch (error) {
        console.error('Error deleting note:', error);
      }
    }
  };

  const hasValidLocation = (note) => {
    return note.latitude && note.longitude && 
           !isNaN(note.latitude) && !isNaN(note.longitude);
  };

  if (notes.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        <p>No notes yet. Create your first note above!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 max-h-96 overflow-y-auto">
      {sortedNotes.map((note) => (
        <div
          key={note.id}
          className={`p-4 border rounded-lg cursor-pointer transition-colors ${
            selectedNote?.id === note.id
              ? 'border-blue-500 bg-blue-50'
              : hasValidLocation(note)
              ? 'border-gray-200 bg-white hover:bg-gray-50'
              : 'border-gray-200 bg-gray-100 opacity-60'
          }`}
          onClick={() => onNoteSelect(note)}
        >
          {editingNote === note.id ? (
            <div className="space-y-3">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                placeholder="Title"
              />
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                rows={3}
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                placeholder="Content"
              />
              <div className="flex space-x-2">
                <button
                  onClick={handleSaveEdit}
                  className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingNote(null)}
                  className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-800">{note.title}</h3>
                <div className="flex space-x-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(note);
                    }}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(note.id);
                    }}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    🗑️
                  </button>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mb-2">{note.content}</p>
              
              <div className="text-xs text-gray-500">
                {hasValidLocation(note) ? (
                  <span className="text-green-600">
                    📍 {note.latitude.toFixed(4)}, {note.longitude.toFixed(4)}
                  </span>
                ) : (
                  <span className="text-red-500">📍 No location</span>
                )}
                <span className="ml-2">
                  {new Date(note.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default NotesList;
