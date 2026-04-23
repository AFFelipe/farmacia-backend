const Cliente = require('../models/Cliente');

exports.listClientes = async (req, res) => {
  try {
    const { search } = req.query;
    const filter = search
      ? { $or: [{ nome: new RegExp(search, 'i') }, { cpf: new RegExp(search, 'i') }] }
      : {};
    const clientes = await Cliente.find(filter).sort({ nome: 1 });
    res.json(clientes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getClienteById = async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente) return res.status(404).json({ message: 'Cliente não encontrado.' });
    res.json(cliente);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createCliente = async (req, res) => {
  try {
    const cliente = await Cliente.create(req.body);
    res.status(201).json(cliente);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!cliente) return res.status(404).json({ message: 'Cliente não encontrado.' });
    res.json(cliente);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findByIdAndDelete(req.params.id);
    if (!cliente) return res.status(404).json({ message: 'Cliente não encontrado.' });
    res.json({ message: 'Cliente removido com sucesso.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
