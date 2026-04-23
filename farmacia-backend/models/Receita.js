const mongoose = require('mongoose');

const receitaSchema = new mongoose.Schema(
  {
    cliente: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cliente',
      required: true,
    },
    medico: { type: String, required: true, trim: true },
    crm: { type: String, required: true, trim: true },
    medicamentos: { type: String, required: true, trim: true },
    dataEmissao: { type: Date, required: true },
    dataValidade: { type: Date, required: true },
    observacoes: { type: String, trim: true, default: '' },
    status: {
      type: String,
      enum: ['Pendente', 'Dispensada', 'Vencida', 'Cancelada'],
      default: 'Pendente',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Receita', receitaSchema);
