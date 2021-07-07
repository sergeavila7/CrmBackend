const Clients = require('../models/Clients');

// Add new client

exports.newClient = async (req, res) => {
  // const { name, lastname, company, email, phone } = req.body;
  const client = new Clients(req.body);
  try {
    await client.save();
    res.json({ message: '¡Agregado con exito!' });
  } catch (err) {
    res.send(err);

    next();
  }
  // const emailClient = await Clients.findOne({ email: email });
  // if (emailClient) {
  //   res.json({
  //     message: '¡Algo ha salido mal!',
  //   });
  // } else {
  //   await client.save();
  //   res.json({
  //     message: '¡Agregado con exito!',
  //   });
  // }
};

exports.showClients = async (req, res) => {
  try {
    const clients = await Clients.find({});
    res.json(clients);
  } catch (err) {
    console.log(err);
    next();
  }
};

exports.showClient = async (req, res) => {
  const client = await Clients.findById(req.params.idClient);

  if (!client) {
    res.json({ message: 'Cliente no existe' });
    next();
  }
  res.json(client);
};

exports.updateClient = async (req, res, next) => {
  try {
    let client = await Clients.findOneAndUpdate(
      { _id: req.params.idClient },
      req.body,
      {
        new: true,
      }
    );
    res.json({ message: '¡Se Actualizo Correctamente el Cliente!' });
  } catch (err) {
    res.send(err);
    next();
  }
};

exports.deleteClient = async (req, res, next) => {
  try {
    await Clients.findOneAndDelete({
      _id: req.params.idClient,
    });
    res.json({ message: 'El cliente se ha eliminado' });
  } catch (err) {
    res.send(err);
    next();
  }
};
