'use strict'

const express = require('express');
const controlador = require('../controllers/product');
const userCtrl = require('../controllers/user');
const auth = require('../middlewares/auth');
const api = express.Router();

api.get('/product', auth, controlador.getProducts);
api.get('/product/:productId', controlador.getProduct);
api.post('/product', auth,  controlador.saveProduct);
api.put('/product/:productId', auth, controlador.updateProduct);
api.delete('/product/:productId', auth, controlador.deleteProduct);
api.post('/signup', userCtrl.signUp);
api.post('/signin', userCtrl.signIn);
api.get('/private', auth,  function(req, res){
  res.status(200).send({message: 'tienes acceso'})
})

module.exports = api;
