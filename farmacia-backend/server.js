const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) =>
  res.json({ message: 'API da Farmácia funcionando.' })
);

app.use('/api/clientes', require('./routes/clienteRoutes'));
app.use('/api/receitas', require('./routes/receitaRoutes'));

mongoose
  .connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/farmacia')
  .then(() =>
    app.listen(process.env.PORT || 3000, () =>
      console.log(`Servidor rodando na porta ${process.env.PORT || 3000}`)
    )
  )
  .catch((err) => {
    console.error('Erro ao conectar ao MongoDB:', err.message);
    process.exit(1);
  });
