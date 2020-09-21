'use strict'

const User = require('../models/user');
const servicios = require('../services')

function signUp(req, res){
  const user = new User({
    email: req.body.email,
    displayName: req.body.displayName,
    password: req.body.password
  })

  user.save((err) =>{
    if(err) return res.status(500).send({ message: `Error creating user ${err}`});

    return res.status(200).send({ token: servicios.createToken(user) });
  })
}

function signIn(){
  user.find({email: req.body.email}, (err, user) =>{
    if(err) return res.status(500).send({message: `Register Error: ${err}`});
    if(!user) return res.status(404).send({message: 'No User'});

    req.user = user
    res.status(200).send({
      message: 'Login Successfull',
      token: service.createToken(user)
    })
  })
}

module.exports = {
  signUp,
  signIn
}
