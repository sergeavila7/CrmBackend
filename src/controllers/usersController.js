const Users = require('../models/Users');
const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

exports.registerUser = async (req, res) => {
  const user = new Users(req.body);
  user.password = await bcrypt.hash(req.body.password, 12);
  try {
    await user.save();
    res.json({ message: 'Usuario Creado Correctamente' });
  } catch (err) {
    res.json({ message: 'Hubo un error' });
  }
};

exports.authenticateUser = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ email });

  if (!user) {
    await res.status(401).json({ message: 'El Usuario No Existe' });
  } else {
    if (!bcrypt.compareSync(password, user.password)) {
      await res.status(401).json({ message: 'Password Incorrecto' });
      next();
    } else {
      const token = jwt.sign(
        {
          email: user.email,
          name: user.name,
          id: user._id,
        },
        'SECRETKEY',
        {
          expiresIn: '1h',
        }
      );
      res.json({ token });
    }
  }
};
