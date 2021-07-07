const Products = require('../models/Products');

const multer = require('multer');

const multerConfig = require('../utils/multerConfig');

// set multer config and model field
const upload = multer(multerConfig).single('image');

// file upload
exports.fileUpload = (req, res, next) => {
  upload(req, res, function (error) {
    if (error) {
      res.json({ message: error });
    }
    return next();
  });
};

// Add New Product
exports.newProduct = async (req, res, next) => {
  const product = new Products(req.body);
  try {
    if (req.file.filename) {
      product.image = req.file.filename;
    }
    await product.save();
    res.json({ message: 'Se agrego un nuevo producto' });
  } catch (err) {
    console.log(err);
    next();
  }
};

exports.showProducts = async (req, res, next) => {
  try {
    const products = await Products.find({});
    res.json(products);
  } catch (err) {
    console.log(err);
    next();
  }
};

exports.showProduct = async (req, res, next) => {
  const product = await Products.findById(req.params.idProduct);

  if (!product) {
    res.json({ message: 'El Producto no existe' });
    next();
  }
  res.json(product);
};

exports.updateProduct = async (req, res, next) => {
  try {
    let newProduct = req.body;

    if (req.file) {
      newProduct.image = req.file.filename;
    } else {
      let productBefore = await Products.findById(req.params.idProduct);
      newProduct.image = productBefore.image;
    }

    let product = await Products.findOneAndUpdate(
      {
        _id: req.params.idProduct,
      },
      newProduct,
      {
        new: true,
      }
    );
    res.json({ message: '¡Se Actualizo Correctamente el Producto!' });
  } catch (err) {
    console.log(err);
    next();
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    await Products.findOneAndDelete({
      _id: req.params.idProduct,
    });
    res.json({ message: 'El producto se ha eliminado' });
  } catch (err) {
    console.log(err);
    next();
  }
};

exports.searchProduct = async (req, res, next) => {
  try {
    const { query } = req.params;
    const product = await Products.find({ name: new RegExp(query, 'i') });
    res.json(product);
  } catch (error) {
    console.log(error);
    next();
  }
};
