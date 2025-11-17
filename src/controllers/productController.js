const productModel = require('../models/productModel');
const logger = require('../logger');
const { success, error } = require('../utils/response');

exports.create = async (req,res) => {
  try{
    const { name, description, price, quantity } = req.body;
    const created_by = req.user.id;
    const prod = await productModel.createProduct({ name, description, price, quantity, created_by });
    logger.info(`Product created by ${req.user.email}: ${prod.name}`);
    return res.status(201).json(success('Product created', prod));
  }catch(e){
    logger.error(e.message);
    return res.status(500).json(error('Server error'));
  }
};

exports.list = async (req,res) => {
  try{
    const prods = await productModel.getProducts();
    return res.json(success('Products fetched', prods));
  }catch(e){
    logger.error(e.message);
    return res.status(500).json(error('Server error'));
  }
};

exports.get = async (req,res) => {
  try{
    const prod = await productModel.getProductById(req.params.id);
    if (!prod) return res.status(404).json(error('Product not found'));
    return res.json(success('Product', prod));
  }catch(e){
    logger.error(e.message);
    return res.status(500).json(error('Server error'));
  }
};

exports.update = async (req,res) => {
  try{
    const allowed = ['name','description','price','quantity'];
    const fields = {};
    for (const key of allowed) if (req.body[key]!==undefined) fields[key]=req.body[key];
    const updated = await productModel.updateProduct(req.params.id, fields);
    return res.json(success('Product updated', updated));
  }catch(e){
    logger.error(e.message);
    return res.status(500).json(error('Server error'));
  }
};

exports.remove = async (req,res) => {
  try{
    await productModel.deleteProduct(req.params.id);
    return res.json(success('Product deleted'));
  }catch(e){
    logger.error(e.message);
    return res.status(500).json(error('Server error'));
  }
};
