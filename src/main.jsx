// src/main.jsx

import React from 'react'
import ReactDOM from 'react-dom/client'
// 1. Import BrowserRouter
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 2. Wrap the App component */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)