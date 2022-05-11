const Product = require("./products.model");
const {
  deleteImgCloudinary,
} = require("../../middlewares/deleteFile.middleware");

// Metodo para recuperar todos los productos de nuestra DB
const getAll = async (req, res, next) => {
  try {
    // find es un método de mongoose para recuperar todos los productes
    const products = await Product.find();
    // res - es loq ue enviaremos al frontal
    // cabecera - status 200 Todo OK
    // cuerpo -> products - json
    res.status(200).json(products);
  } catch (error) {
    return next(error);
  }
};

// Metodo para recuperar un product de nuestra DB
const getOne = async (req, res, next) => {
  try {
    // req -> recuperar valores de la request: http://jdhfjdh....10
    const { id } = req.params;
    // findById en el que por param recibe un id y te lo busca
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    return next(error);
  }
};

// Método para crear un nuevo product
const postOne = async (req, res, next) => {
  try {
    // Nuevo product para introducir los datos del front
    const product = new Product();
    // Este body es la info que nos llega desde el front
    product.category = req.body.category;
    product.subcategory = req.body.subcategory;
    if (req.file) product.img = req.file.path;
    product.gender = req.body.gender;
    product.brand = req.body.brand;
    product.model = req.body.model;
    product.color = req.body.color;
    product.size = req.body.size;
    product.price = req.body.price;
    product.discount = req.body.discount;
    product.stock = req.body.stock;

    // Método de mongoose - que guarda el product en la DB
    const productDB = await product.save();
    return res.status(201).json(productDB);
  } catch (error) {
    return next(error);
  }
};

// Método para modificar un product en base a su id
const patchOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = new Product(req.body);
    // id nos lo generan y es un numero único
    product._id = id;
    // updatear el product -> Método de mongoose - que sustituye el product en la DB
    // Param 1- el id recuperado
    // param 2 - el product con la info del front
    const updateProduct = await Product.findByIdAndUpdate(id, product);
    return res.status(200).json(updateProduct);
  } catch (error) {
    return next(error);
  }
};

// Método para eliminar un product en base a su id
const deleteOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    // borrar el product -> Método de mongoose - que borra el product en la DB por el id recuperado
    const product = await Product.findByIdAndDelete(id);
    return res.status(200).json(product);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAll,
  getOne,
  postOne,
  patchOne,
  deleteOne,
};
