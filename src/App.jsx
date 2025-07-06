// src/App.jsx

// 1. Import useState and useEffect from React
import React, { useState, useEffect } from 'react';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
// 2. Import our new button component
import ScrollToTopButton from './components/ScrollToTopButton';

function App() {
  // 3. Set up state to track button visibility
  const [isVisible, setIsVisible] = useState(false);

  // This function will run whenever the user scrolls
  const toggleVisibility = () => {
    // If the user has scrolled down more than 300px, show the button
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // 4. Set up a scroll event listener using useEffect
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    // This is a cleanup function that removes the listener when the component is no longer on the page
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []); // The empty array means this effect runs only once on mount

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        <Hero />
        {/* We can add other homepage sections below the hero later */}
      </main>

      <Footer />

      {/* 5. Render the button and pass it the state */}
      <ScrollToTopButton isVisible={isVisible} />
    </div>
  );
}

export default App;