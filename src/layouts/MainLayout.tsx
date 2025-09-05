import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import ErrorBoundary from "../components/ErrorBoundary";

const MainLayout: React.FC = () => {
  return (
    <>
      <ErrorBoundary isolate={true}>
        <Navbar />
      </ErrorBoundary>
      <main className="flex-grow">
        <ErrorBoundary isolate={true}>
          <Outlet />
        </ErrorBoundary>
      </main>
     
    </>
  );
};

export default MainLayout;
