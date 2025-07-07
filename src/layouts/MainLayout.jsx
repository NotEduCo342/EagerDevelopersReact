import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        {/* The Outlet component renders the current page's component */}
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;