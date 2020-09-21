'use strict'

const Product = require('../models/product');

function getProduct(req, res){
  let productId = req.params.productId;

  Product.findById(productId, (error, product) => {
    if (error) return res.status(500).send({message: `Error when requested: ${error}`});
    if(!product) return res.status(404).send({message: 'Product doesnt exist'});

    res.status(200).send({product});
  });
};

function getProducts(req, res) {
  Product.find({}, (err, products) => {
    if(err) return res.status(500).send({message: `Error when requested: ${error}`});
    if(!products) return res.status(404).send({message: 'Products doesnt exist'});

    res.send(200, {products});
  });
};

function saveProduct (req, res) {
  console.log('POST /api/product');
  console.log(req.body);

  let product = new Product()
  product.name = req.body.name
  product.picture = req.body.picture
  product.price = req.body.price
  product.category = req.body.category
  product.description = req.body.description

  product.save((err, productStored) =>{
    if (err)res.status(500).send({message: `Failed to save to database:  ${err}`});

    res.status(200).send({product: productStored});
  });
}

function updateProduct(req, res){
  let productId = req.params.productId;
  let update = req.body;

  Product.findByIdAndUpdate(productId, update, (err, prodUpdated) =>{
    if(err) res.status(500).send({message: `Product update failed ${err}`});

    res.status(200).send({product: prodUpdated});
  })
};

function deleteProduct(req, res){
  let productId = req.params.productId;

  Product.findById(productId, (err, product) =>{
    if(err) res.status(500).send({message: `Failed to delete the product ${err}`});

    product.remove(err => {
      if(err) res.status(500).send({message: `Failed to delete the product ${err}`});
      res.status(200).send({message: 'The product has been removed'});
    })
  })
};

module.exports = {
  getProducts,
  getProduct,
  updateProduct,
  saveProduct,
  deleteProduct
};
