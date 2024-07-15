import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Passengers from './components/Passengers.js';
import Bookings from './components/Bookings.js';
import BookFlight from './components/BookFlight.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<App/>} />
      <Route path='/home' element={<App/>} />
      <Route path='/airlines' element={<App/>} />
      <Route path='/flights' element={<App/>} />
      <Route path='/bookings' element={<Bookings/>} />
      <Route path='/bookflight' element={< BookFlight/>} />
      <Route path='/passengers' element={<Passengers/>} />
    </Routes>
    </BrowserRouter>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
