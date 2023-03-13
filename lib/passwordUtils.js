const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const fs = require('fs');

function genPassword(password) {
    var salt = crypto.randomBytes(32).toString('hex');
    var genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    
    return {
      salt: salt,
      hash: genHash
    };
}

function validPassword(password, hash, salt) {
    var hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return hash === hashVerify;
}

function issueJWT(user){
  const PRIV_KEY = fs.readFileSync('./keys/id_rsa_priv.pem', 'utf8');
  const expiresIn = "30d";

  const signedToken = jwt.sign({
    sub: user._id,
    iat: Date.now()
  },
  PRIV_KEY,
  {
    expiresIn: expiresIn,
    algorithm: 'RS256'
  });

  return{
    token: "Bearer " + signedToken,
    expires: expiresIn
  };
}

module.exports.validPassword = validPassword;
module.exports.genPassword = genPassword;
module.exports.issueJWT = issueJWT;