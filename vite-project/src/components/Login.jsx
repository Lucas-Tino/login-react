import bcrypt from 'bcryptjs';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Importando useNavigate

const Login = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();  // Usando o hook useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`http://localhost:5000/users?username=${username}`);
      const user = response.data[0];

      if (!user || !bcrypt.compareSync(password, user.password)) {
        setError('Erro ao fazer login');
        return;
      }

      setToken(user.token);
      localStorage.setItem('token', user.token);
      navigate('/dashboard');  // Redirecionamento para a página /dashboard
    } catch (err) {
      setError('Erro ao fazer login');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
