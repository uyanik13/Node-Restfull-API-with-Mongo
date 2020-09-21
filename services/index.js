'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../config')

function createToken(user){
  const payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix(),
  }
  return jwt.encode(payload, config.SECRET_TOKEN);
}

function decodeToken(token){
  const decoded = new Promise((resolve, reject) =>{
    try{
      const paylod = jwt.decode(token, config.SECRET_TOKEN)

      if (paylod.exp <= moment().unix()) {
        reject({
          status: 401,
          message: 'Token Expired.'
        })
      }
      resolve(paylod.sub)
    }catch(err){
      reject({
        status: 500,
        message: 'Token invalid.'
      })
    }
  })

  return decoded
}

module.exports = {
  createToken,
  decodeToken
}
