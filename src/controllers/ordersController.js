const Orders = require('../models/Orders');

exports.newOrder = async (req, res, next) => {
  const order = new Orders(req.body);
  try {
    await order.save();
    res.json({ message: 'Se agrego un nuevo pedido' });
  } catch (err) {
    console.log(err);
    next();
  }
};

exports.showOrders = async (req, res, next) => {
  try {
    const orders = await Orders.find({}).populate('client').populate({
      path: 'order.product',
      model: 'Products',
    });
    res.json(orders);
  } catch (err) {
    console.log(err);
    next();
  }
};

exports.showOrder = async (req, res, next) => {
  const order = await Orders.findById(req.params.idOrder)
    .populate('client')
    .populate({
      path: 'order.product',
      model: 'Products',
    });
  if (!order) {
    res.json({ message: 'Pedido no existe' });
  }
  res.json(order);
};

exports.updateOrder = async (req, res, next) => {
  try {
    let order = await Orders.findOneAndUpdate(
      { _id: req.params.idOrder },
      req.body,
      {
        new: true,
      }
    )
      .populate('client')
      .populate({
        path: 'order.product',
        model: 'Products',
      });
    res.json(order);
  } catch (err) {
    console.log(err);
    next();
  }
};

exports.deleteOrder = async (req, res, next) => {
  try {
    await Orders.findOneAndDelete({ _id: req.params.idOrder });
    res.json({ message: 'El pedido se ha eliminado' });
  } catch (err) {
    console.log(err);
    next();
  }
};
