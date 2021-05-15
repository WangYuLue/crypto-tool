const crypto = require("crypto");

const defaultSecretkey = 'helloworld';
const defaultIv = 'earth';

// interface cryptOptions {
//   secretkey?: string;
//   iv?: string;
// }

/**
 * 生成符合规范的密钥
 * 
 * @param {string} secret 
 * @param {number} length 
 * @returns {string}
 */
function genkey(secret, length = 32) {
  return crypto.createHash('sha256').update(String(secret)).digest('base64').substr(0, length);
}

/**
 * 解密字符串
 * 
 * @param {string} content 
 * @param {cryptOptions} options 
 * @returns {string}
 */
function decryptByAes256(content, options = {}) {
  const { secretkey, iv } = options;
  const decipher = crypto.createDecipheriv('aes-256-cbc', genkey(secretkey || defaultSecretkey), genkey(iv || defaultIv, 16));
  let dec = decipher.update(content, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec;
}

/**
 * 加密字符串 
 * 
 * @param {string} content 
 * @param {cryptOptions} options 
 * @returns {string}
 */
function encryptByAes256(content, options = {}) {
  const { secretkey, iv } = options;
  const cipher = crypto.createCipheriv('aes-256-cbc', genkey(secretkey || defaultSecretkey), genkey(iv || defaultIv, 16));
  let enc = cipher.update(content, 'utf8', 'hex');
  enc += cipher.final('hex');
  return enc;
}

module.exports = {
  decryptByAes256,
  encryptByAes256
}