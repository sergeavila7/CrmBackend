const express = require('express');
const router = express.Router();

const clientController = require('../controllers/clientController');
const productsController = require('../controllers/productsController');
const ordersController = require('../controllers/ordersController');
const usersController = require('../controllers/usersController');

// Middleware
const auth = require('../middleware/auth');

module.exports = function () {
  /*****CLIENTS*****/
  // Add New Clients
  router.post('/clients', auth, clientController.newClient);
  // Get All Clients
  router.get('/clients', auth, clientController.showClients);
  // Get Client by ID
  router.get('/clients/:idClient', auth, clientController.showClient);
  // Update Client
  router.put('/clients/:idClient', auth, clientController.updateClient);
  // Delete Client
  router.delete('/clients/:idClient', auth, clientController.deleteClient);

  /*****PRODUCTS*****/
  //Add New Products
  router.post(
    '/products',
    auth,
    productsController.fileUpload,
    productsController.newProduct
  );
  // Get All Products
  router.get('/products', auth, productsController.showProducts);
  // Get Product by ID
  router.get('/products/:idProduct', auth, productsController.showProduct);
  // Update Products
  router.put(
    '/products/:idProduct',
    auth,
    productsController.fileUpload,
    productsController.updateProduct
  );

  router.delete('/products/:idProduct', auth, productsController.deleteProduct);
  router.post(
    '/products/search/:query',

    productsController.searchProduct
  );

  /*****PEDIDOS*****/
  router.post('/orders/new/:idUser', auth, ordersController.newOrder);
  router.get('/orders', auth, ordersController.showOrders);
  router.get('/orders/:idOrder', auth, ordersController.showOrder);
  router.put('/orders/:idOrder', auth, ordersController.updateOrder);
  router.delete('/orders/:idOrder', auth, ordersController.deleteOrder);

  /*****USERS*****/
  router.post('/signup', usersController.registerUser);
  router.post('/login', usersController.authenticateUser);

  return router;
};
