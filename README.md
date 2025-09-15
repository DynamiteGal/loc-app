# 📍 Location-Based Notes App

A simple and clean web application for creating location-based notes with map visualization and analytics.

## ✨ Features

### Core Features
- ✅ **Create Notes**: Add notes with title, content, and current location
- ✅ **View Notes**: Display all notes in a clean list format
- ✅ **Location Integration**: Automatically capture GPS coordinates
- ✅ **Map Visualization**: Interactive map showing note locations
- ✅ **Sorting**: Sort notes by title or creation date
- ✅ **Validation**: Title ≥ 3 chars, Content ≥ 5 chars

### Advanced Features
- ✅ **CRUD Operations**: Create, Read, Update, Delete notes
- ✅ **JWT Authentication**: Secure API with token validation
- ✅ **Interactive Map**: Click markers to highlight notes
- ✅ **Visual Analytics**: Chart showing notes by first letter
- ✅ **Responsive Design**: Clean Tailwind CSS styling
- ✅ **Error Handling**: Graceful error messages and validation

## 🚀 Quick Start

### 🐳 Docker Setup (Recommended - No Installation Required)

**Prerequisites:** Docker Desktop

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd loc-app
   ```

2. **Run the app**
   
   **Windows:**
   ```bash
   setup.bat
   ```
   
   **Mac/Linux:**
   ```bash
   chmod +x setup.sh
   ./setup.sh
   ```
   
   **Or manually:**
   ```bash
   docker-compose up --build
   ```

3. **Access the app**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

### 📋 Manual Setup (Alternative)

**Prerequisites:** Node.js (v14 or higher), npm

1. **Start Backend**
   ```bash
   cd backend
   npm install
   npm start
   ```

2. **Start Frontend** (in new terminal)
   ```bash
   cd frontend
   npm install
   npm start
   ```

**📖 For detailed instructions, see [QUICK_START.md](QUICK_START.md)**

## 🏗️ Project Structure

```
loc-app/
├── frontend/                 # React + Tailwind CSS
│   ├── src/
│   │   ├── components/      # JSX components
│   │   │   ├── NoteForm.jsx
│   │   │   ├── NotesList.jsx
│   │   │   ├── MapView.jsx
│   │   │   └── ChartView.jsx
│   │   ├── App.jsx          # Main app component
│   │   └── index.css        # Tailwind CSS
│   └── package.json
├── backend/                  # Node.js + Express
│   ├── server.js            # Main server file
│   └── package.json
└── README.md
```

## 🔧 API Endpoints

All endpoints require authentication header: `Authorization: Bearer my-secret-token-123`

- `GET /notes` - Get all notes (sorted by creation time)
- `POST /notes` - Create a new note
- `PUT /notes/:id` - Update a note
- `DELETE /notes/:id` - Delete a note
- `GET /health` - Health check

## 🎨 Technologies Used

### Frontend
- **React** - UI framework
- **Tailwind CSS** - Styling
- **Leaflet.js** - Interactive maps
- **Recharts** - Data visualization

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing
- **In-memory storage** - Data persistence

## 🔐 Authentication

The app uses a simple JWT token system:
- **Token**: `my-secret-token-123`
- **Header**: `Authorization: Bearer my-secret-token-123`

## 📱 Usage

1. **Create a Note**:
   - Enter title (min 3 characters)
   - Enter content (min 5 characters)
   - Click "Get Current Location" to capture GPS coordinates
   - Click "Save Note"

2. **View Notes**:
   - All notes appear in the list below the form
   - Sort by title or creation date
   - Notes without location appear grayed out

3. **Map Interaction**:
   - Notes with valid locations appear as markers on the map
   - Click markers to highlight corresponding notes
   - Click notes to highlight corresponding markers

4. **Edit/Delete**:
   - Click ✏️ to edit a note
   - Click 🗑️ to delete a note

5. **Analytics**:
   - View chart showing note count by first letter of title

## 🎯 Features Implemented

- ✅ **Core Requirements**: Create + Read + Validation + List Sorting
- ✅ **Extra Credit**: Update/Delete + Map + JWT + Chart
- ✅ **Clean Design**: Simple, concise, not complicated
- ✅ **JSX Files**: All frontend components in JSX format
- ✅ **Two Folder Structure**: `frontend/` and `backend/`

## 🚀 Ready to Use!

The app is now ready to run. Simply start both servers and begin creating location-based notes!
