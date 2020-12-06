'use strict'

const User = require('../models/user');
const services = require('../services')

function signUp(req, res){
  const user = new User({
    email: req.body.email,
    displayName: req.body.displayName,
    password: req.body.password
  })

  user.save((err) =>{
    if(err) return res.status(500).send({ message: `Error creating user ${err}`});

    return res.status(200).send({ token: services.createToken(user) });
  })
}

function signIn(req, res){
  User.find({email: req.body.email}, (err, user) =>{

    if(err) return res.status(500).send({message: `Register Error: ${err}`});

    if(!user) return res.status(404).send({message: 'No User'});
    req.user = user
    res.status(200).send({
      message: 'Login Successfull',
      token: services.createToken(user)
    })
  })
}

module.exports = {
  signUp,
  signIn
}
