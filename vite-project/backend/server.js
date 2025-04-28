const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const db = require('./database');

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

// Chave secreta para assinar os JWTs
const JWT_SECRET = 'minha_chave_secreta';

// Endpoint para login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Procurar usuário no banco de dados
  db.get("SELECT * FROM users WHERE username = ?", [username], (err, row) => {
    if (err || !row) {
      return res.status(400).json({ message: 'Usuário ou senha inválidos' });
    }

    // Verificar se a senha corresponde
    bcrypt.compare(password, row.password, (err, result) => {
      if (!result) {
        return res.status(400).json({ message: 'Usuário ou senha inválidos' });
      }

      // Gerar o token JWT
      const token = jwt.sign({ id: row.id, username: row.username }, JWT_SECRET, {
        expiresIn: '1h', // Expiração do token
      });

      return res.json({ token });
    });
  });
});

// Endpoint para criar novo usuário
app.post('/register', (req, res) => {
  const { username, password } = req.body;

  // Verificar se o usuário já existe
  db.get("SELECT * FROM users WHERE username = ?", [username], (err, row) => {
    if (row) {
      return res.status(400).json({ message: 'Usuário já existe' });
    }

    // Criptografar a senha
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        return res.status(500).json({ message: 'Erro ao criptografar a senha' });
      }

      // Inserir o novo usuário no banco de dados
      db.run("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPassword], function (err) {
        if (err) {
          return res.status(500).json({ message: 'Erro ao criar usuário' });
        }
        res.status(201).json({ message: 'Usuário criado com sucesso' });
      });
    });
  });
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
