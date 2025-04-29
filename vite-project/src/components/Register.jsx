import bcrypt from 'bcryptjs';
import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Verifica se o usuário já existe
      const response = await axios.get(`http://localhost:5000/users?username=${username}`);
      if (response.data.length > 0) {
        setError('Usuário já existe');
        return;
      }

      // Gera o hash da senha
      const hashedPassword = bcrypt.hashSync(password, 10);

      // Envia os dados para o json-server
      await axios.post('http://localhost:5000/users', {
        username,
        password: hashedPassword,
      });

      setSuccess('Usuário registrado com sucesso!');
      setError('');
    } catch (err) {
      setError('Erro ao registrar usuário');
    }
  };

  return (
    <div>
      <h2>Register</h2>
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
        <button type="submit">Register</button>
      </form>
      {error && <p>{error}</p>}
      {success && <p>{success}</p>}
    </div>
  );
};

export default Register;
