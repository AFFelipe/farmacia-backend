const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true, trim: true },
    cpf: { type: String, required: true, unique: true, trim: true },
    telefone: { type: String, trim: true, default: '' },
    email: { type: String, trim: true, default: '' },
    dataNascimento: { type: Date, required: true },
    endereco: { type: String, trim: true, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Cliente', clienteSchema);
