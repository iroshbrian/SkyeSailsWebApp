var secureRandom = require('secure-random');

module.exports.jwtSecret = {
  signingKey: secureRandom(256, {type: 'Buffer'})
}
