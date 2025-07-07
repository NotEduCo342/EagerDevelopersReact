// src/App.jsx

// 1. Import 'lazy' and 'Suspense' from React
import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Import Layout Component
import MainLayout from './layouts/MainLayout';
import ScrollToTopButton from './components/ScrollToTopButton';

// 2. Change page imports to use React.lazy
const Home = lazy(() => import('./pages/Home'));
const Projects = lazy(() => import('./pages/Projects'));
const Contact = lazy(() => import('./pages/Contact'));
const Login = lazy(() => import('./pages/Login'));

function App() {
  const [isVisible, setIsVisible] = useState(false);

  // ... (the toggleVisibility and useEffect hooks remain the same) ...
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 3. Wrap your Routes in a Suspense component */}
      <Suspense fallback={<div className="flex-grow text-center p-8">Loading...</div>}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </Suspense>

      <ScrollToTopButton isVisible={isVisible} />
    </div>
  );
}

export default App;