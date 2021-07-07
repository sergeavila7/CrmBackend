const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ordersSchema = new Schema({
  client: {
    type: Schema.ObjectId,
    ref: 'Clients',
  },
  order: [
    {
      product: {
        type: Schema.ObjectId,
        ref: 'Products',
      },
      qty: Number,
    },
  ],
  total: {
    type: Number,
  },
});

module.exports = mongoose.model('Orders', ordersSchema);
