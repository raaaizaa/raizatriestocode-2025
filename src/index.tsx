import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import './styles/global.css';

const rootElement = document.getElementById('root') as HTMLElement;

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <Navbar />
    <App />
    <Footer />
  </React.StrictMode>
);
