import Contato from '../models/Contato';

class ContatoController {
  async store(req, res) {
    const { name, number } = req.body;
    const { userId } = req;

    const contato = await Contato.create({
      name,
      number,
      user_id: userId,
    });

    return res.status(201).json(contato);
  }

  async update(req, res) {
    const { contatoId } = req.params;
    const { name, number } = req.body;
    const { userId } = req;

    const contato = await Contato.findOne({
      where: { id: contatoId, user_id: userId },
    });

    if (!contato) {
      return res.status(404).json({ error: 'Contato não encontrado ou não autorizado' });
    }

    contato.name = name || contato.name;
    contato.number = number || contato.number;
    await contato.save();

    return res.json(contato);
  }

  async delete(req, res) {
    const { contatoId } = req.params;
    const { userId } = req;

    const contato = await Contato.findOne({
      where: { id: contatoId, user_id: userId },
    });

    if (!contato) {
      return res.status(404).json({ error: 'Contato não encontrado ou não autorizado' });
    }

    await contato.destroy();

    return res.status(204).send();
  }

  async index(req, res) {
    const { userId } = req;

    const contatos = await Contato.findAll({
      where: { user_id: userId },
    });

    return res.json(contatos);
  }
}

export default new ContatoController();
