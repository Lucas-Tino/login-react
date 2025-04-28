import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';  // Usar useNavigate

const Dashboard = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();  // Hook para navegação programática

  if (!token) {
    // Se não houver token, redireciona para o login
    return <Navigate to="/login" />;
  }

  // Função de logout
  const handleLogout = () => {
    localStorage.removeItem('token');  // Remove o token do localStorage
    navigate('/login');  // Redireciona para a página de login
  };

  return (
    <div>
      <h2>Bem-vindo ao Dashboard!</h2>
      <p>Somente usuários autenticados podem ver esta página.</p>
      <button onClick={handleLogout}>Logout</button>  {/* Botão de logout */}
    </div>
  );
};

export default Dashboard;
