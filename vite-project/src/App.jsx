import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token')); // Verifica se o token existe no localStorage

  useEffect(() => {
    const token = localStorage.getItem('token');
    setToken(token); // Atualiza o estado token com o valor armazenado
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<h2>Bem-vindo! Por favor, faça login ou registre-se.</h2>} />
      </Routes>
    </Router>
  );
};

export default App;
