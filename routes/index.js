'use strict'

const express = require('express');
const productController = require('../controllers/product');
const userController = require('../controllers/user');
const auth = require('../middlewares/auth');
const api = express.Router();


api.get('/', function(req, res){
      res.status(200).send({message: 'Home Page'})
})

api.get('/product', auth, productController.getProducts);
api.get('/product/:productId', productController.getProduct);
api.post('/product', auth,  productController.saveProduct);
api.put('/product/:productId', auth, productController.updateProduct);
api.delete('/product/:productId', auth, productController.deleteProduct);
api.post('/signup', userController.signUp);
api.post('/signin', userController.signIn);
api.get('/private', auth,  function(req, res){
  res.status(200).send({message: 'access to private'})
})

module.exports = api;
