import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Change Switch to Routes
import Hero from '../src/components/Hero.jsx';
import Download from '../src/components/Download'; // Import your Download component
import NotFound from '../src/components/NotFound'; // Optional: Create a NotFound component for 404s
import './App.css';

function App() {
  return (
    <Router>
      <Routes> {/* Change Switch to Routes */}
        <Route path="/" element={<Hero />} /> {/* Use element prop for components */}
        <Route path="/download" element={<Download />} /> {/* Add other routes as needed */}
        <Route path="*" element={<NotFound />} /> {/* Optional for handling 404s */}
      </Routes>
    </Router>
  );
}

export default App;