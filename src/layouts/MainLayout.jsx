import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = () => {
  return (
    <>
      <Navbar />
      {/* Add top padding to this main element */}
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;