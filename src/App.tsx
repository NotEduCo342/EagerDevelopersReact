import { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import ScrollToTopButton from './components/ScrollToTopButton';
import Spinner from './components/Spinner';
import ErrorBoundary from './components/ErrorBoundary';

const Home = lazy(() => import('./pages/Home'));
const Projects = lazy(() => import('./pages/Projects'));
const Contact = lazy(() => import('./pages/Contact'));
const Login = lazy(() => import('./pages/Login'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const Registration = lazy(() => import('./pages/Registration'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));

function App() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = (): void => {
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
    <ErrorBoundary isolate={false}>
      <div className="flex flex-col min-h-screen">
        <Suspense fallback={
          <div className="flex-grow flex items-center justify-center">
            <Spinner />
          </div>
        }>
          <ErrorBoundary isolate={true}>
            <Routes>
              <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/:projectId" element={<ProjectDetail />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
              </Route>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Registration />} />
            </Routes>
          </ErrorBoundary>
        </Suspense>
        <ScrollToTopButton isVisible={isVisible} />
      </div>
    </ErrorBoundary>
  );
}

export default App;