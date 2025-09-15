import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in Leaflet (webpack issue)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const MapView = ({ notes, selectedNote, onNoteSelect }) => {
  // Refs for map management
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);

  // Initialize map on component mount
  useEffect(() => {
    if (!mapRef.current) return;

    // Create map centered on NYC area
    const map = L.map(mapRef.current).setView([40.7128, -74.0060], 10);
    mapInstanceRef.current = map;

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Cleanup on unmount
    return () => {
      map.remove();
    };
  }, []);

  // Update markers when notes or selection changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Remove old markers
    markersRef.current.forEach(marker => {
      mapInstanceRef.current.removeLayer(marker);
    });
    markersRef.current = [];

    // Filter notes with valid GPS coordinates
    const validNotes = notes.filter(note => 
      note.latitude && note.longitude && 
      !isNaN(note.latitude) && !isNaN(note.longitude)
    );

    if (validNotes.length === 0) return;

    // Create custom markers for each note
    validNotes.forEach(note => {
      const isSelected = selectedNote?.id === note.id;
      
      const marker = L.marker([note.latitude, note.longitude], {
        icon: L.divIcon({
          className: `custom-marker ${isSelected ? 'selected' : ''}`,
          html: `<div class="marker-content ${isSelected ? 'selected' : ''}">📍</div>`,
          iconSize: [30, 30],
          iconAnchor: [15, 30]
        })
      });

      // Click marker to select note
      marker.on('click', () => {
        onNoteSelect(note);
      });

      marker.addTo(mapInstanceRef.current);
      markersRef.current.push(marker);
    });

    // Auto-fit map to show all markers
    if (validNotes.length > 0) {
      const group = new L.featureGroup(markersRef.current);
      mapInstanceRef.current.fitBounds(group.getBounds().pad(0.1));
    }
  }, [notes, selectedNote, onNoteSelect]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Map View</h2>
      <div 
        ref={mapRef} 
        className="w-full h-64 rounded-lg border border-gray-300"
        style={{ minHeight: '256px' }}
      />
      <p className="text-sm text-gray-500 mt-2">
        Click markers to highlight notes in the list
      </p>
    </div>
  );
};

export default MapView;
