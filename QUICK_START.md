# 🚀 Quick Start Guide

## Option 1: Docker (Recommended - No Installation Required)

### Prerequisites
- Docker Desktop installed on your system
- Git (to clone the repository)

### Steps
1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd loc-app
   ```

2. **Run with Docker**
   
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

---

## Option 2: Manual Setup (If Docker not available)

### Prerequisites
- Node.js (v14 or higher)
- npm

### Steps
1. **Clone and navigate**
   ```bash
   git clone <your-repo-url>
   cd loc-app
   ```

2. **Start Backend**
   ```bash
   cd backend
   npm install
   npm start
   ```

3. **Start Frontend** (in new terminal)
   ```bash
   cd frontend
   npm install
   npm start
   ```

4. **Access the app**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

---

## 🎯 Features to Test

1. **Create a Note**
   - Enter title (min 3 characters)
   - Enter content (min 5 characters)
   - Click "Get Current Location"
   - Click "Save Note"

2. **View Notes**
   - See all notes in the list
   - Sort by title or date
   - Notes without location appear grayed out

3. **Map Interaction**
   - Notes with location appear as markers
   - Click markers to highlight notes
   - Click notes to highlight markers

4. **Edit/Delete**
   - Click ✏️ to edit a note
   - Click 🗑️ to delete a note

5. **Analytics**
   - View chart showing notes by first letter

---

## 🔧 API Testing

**Authentication Token:** `my-secret-token-123`

**Test with curl:**
```bash
# Get all notes
curl -H "Authorization: Bearer my-secret-token-123" http://localhost:5000/notes

# Create a note
curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer my-secret-token-123" -d '{"title":"Test Note","content":"This is a test note","latitude":40.7128,"longitude":-74.0060}' http://localhost:5000/notes
```

---

## 🛠️ Troubleshooting

**Docker Issues:**
- Make sure Docker Desktop is running
- Try: `docker-compose down` then `docker-compose up --build`

**Port Conflicts:**
- Backend uses port 5000
- Frontend uses port 3000
- Change ports in docker-compose.yml if needed

**Styling Issues:**
- The app uses Tailwind CSS
- If styles don't load, try refreshing the browser

---

## 📱 Mobile Testing

The app is responsive and works on mobile devices. Test the location feature on your phone for the best experience!
