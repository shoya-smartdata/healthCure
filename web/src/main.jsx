import React from 'react';
import ReactDOM from 'react-dom/client';  // Important: Import from 'react-dom/client'
import './index.css'
import App from './App';
import { ThemeProvider } from './middleware/ThemeContext';
import './assets/tailwind.css';


// Create the root and render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>


<ThemeProvider>
<App />
</ThemeProvider>





   
  </React.StrictMode>
);
