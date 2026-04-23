const Receita = require('../models/Receita');

exports.listReceitas = async (req, res) => {
  try {
    const filter = req.query.cliente ? { cliente: req.query.cliente } : {};
    const receitas = await Receita.find(filter)
      .populate('cliente', 'nome cpf')
      .sort({ dataEmissao: -1 });
    res.json(receitas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getReceitaById = async (req, res) => {
  try {
    const receita = await Receita.findById(req.params.id).populate('cliente', 'nome cpf');
    if (!receita) return res.status(404).json({ message: 'Receita não encontrada.' });
    res.json(receita);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createReceita = async (req, res) => {
  try {
    const receita = await Receita.create(req.body);
    res.status(201).json(receita);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateReceita = async (req, res) => {
  try {
    const receita = await Receita.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!receita) return res.status(404).json({ message: 'Receita não encontrada.' });
    res.json(receita);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteReceita = async (req, res) => {
  try {
    const receita = await Receita.findByIdAndDelete(req.params.id);
    if (!receita) return res.status(404).json({ message: 'Receita não encontrada.' });
    res.json({ message: 'Receita removida com sucesso.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
