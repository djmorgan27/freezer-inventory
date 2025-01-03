import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
//import './index.css'; // Optional: Include global styles if you have them

// Create the root and render the App component
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
