const crypto = require('crypto');
const algorithm = 'aes256';


module.exports = {
  salting: (data) => {
    const buf = crypto.randomBytes(64);
    const salt = buf.toString('base64');
    const digest = crypto.pbkdf2Sync(data, salt, 100000, 64, 'sha512');
    return salt + digest.toString('base64');
  },

  hashing: data => crypto.createHash('sha512').update(data).digest('base64'),

  checkHashword: (hashword, data) => {
    const salt = hashword.slice(0, 88);
    const temp = crypto.pbkdf2Sync(data, salt, 100000, 64, 'sha512');
    const tempDigest = temp.toString('base64');
    const tempHashword = salt + tempDigest;
    return hashword === tempHashword;
  },

  encrypt: (data, key) => {
    const cipher = crypto.createCipher(algorithm, key);
    let crypted = cipher.update(data, 'uft8', 'base64');
    crypted += cipher.final('base64');
    return crypted;
  },

  decrypt: (data, key) => {
    const decipher = crypto.createDecipher(algorithm, key);
    let dec = decipher.update(data, 'base64', 'utf8');
    dec += decipher.final('utf8');
    return dec
  },
};



