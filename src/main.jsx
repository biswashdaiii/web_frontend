import React from 'react'; // It's good practice to import React
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import AppContextProvider from './context/AppContext.jsx'; // Correctly imported
import './index.css';

// Get the root DOM element
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

// Render your application
root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* 
        This is the only wrapper you need. It provides the context 
        to your entire application.
      */}
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);