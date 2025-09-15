import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ChartView = ({ notes }) => {
  // Count how many notes start with each letter
  const getChartData = () => {
    const letterCounts = {};
    
    notes.forEach(note => {
      if (note.title && note.title.length > 0) {
        const firstLetter = note.title.charAt(0).toUpperCase();
        letterCounts[firstLetter] = (letterCounts[firstLetter] || 0) + 1;
      }
    });

    // Convert to array format for chart and sort alphabetically
    return Object.entries(letterCounts)
      .map(([letter, count]) => ({ letter, count }))
      .sort((a, b) => a.letter.localeCompare(b.letter));
  };

  const chartData = getChartData();

  if (chartData.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Notes by Letter</h2>
        <div className="text-center text-gray-500 py-8">
          <p>No notes to display</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">📊 Notes by Letter</h2>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="letter" 
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
            />
            <Tooltip 
              formatter={(value) => [value, 'Notes']}
              labelFormatter={(label) => `Letter: ${label}`}
            />
            <Bar 
              dataKey="count" 
              fill="#3B82F6" 
              radius={[2, 2, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="text-sm text-gray-500 mt-2">
        Number of notes by first letter of title
      </p>
    </div>
  );
};

export default ChartView;
