import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { setupGlobalErrorHandlers } from "./utils/errorLogger";
import { AuthProvider } from "./contexts/AuthContext";

// Setup global error handlers for unhandled promises and JavaScript errors
setupGlobalErrorHandlers();

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error('Root element not found');

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
