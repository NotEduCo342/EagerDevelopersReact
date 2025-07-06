// src/App.jsx

import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero'; // 1. Import the Hero component
import Footer from './components/Footer';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        {/* 2. Place the Hero component here */}
        <Hero />
        
        {/* We can add other homepage sections below the hero later */}
         
      </main>

      <Footer />
    </div>
  );
}

export default App;