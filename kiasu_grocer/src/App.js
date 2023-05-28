import React from 'react';
import Auth from './pages/Auth';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';


function App() {
  return (
      <main className="App bg-cream text-center
       flex bg-contain text-black min-h-screen text-xl 
       justify-center items-center w-full h-full align-top">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Dashboard/>} />
              <Route path="/auth" element={<Auth/>} />
            </Routes>
          </BrowserRouter>
      </main>
  );
}

export default App;
