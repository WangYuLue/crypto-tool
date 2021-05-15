const fs = require('fs');
const path = require('path');
const ini = require('ini');

const { decryptByAes256, encryptByAes256 } = require('./utils/crypto');
const { readFileContent, writeFileContent } = require('./utils/io');

const encSuffix = '.enc';

function getConfig() {
  return ini.parse(fs.readFileSync('./config.ini', 'utf-8'));
}

function check() {
  const config = getConfig();
  if (!config.decDir || !config.encDir) {
    throw 'missing necessary configuration';
  }

  if (!fs.existsSync(path.resolve(config.encDir))) {
    throw 'encDir not exist'
  }

  if (!fs.existsSync(path.resolve(config.decDir))) {
    throw 'decDir not exist'
  }
}

/**
 * 加密明文目录中的文件，明文目录在 config.ini 中配置
 * 
 * @param {*} secretkey 
 */
function encrypt(secretkey) {
  clearEncDir();
  const config = getConfig();
  const files = fs.readdirSync(config.decDir)
  files.forEach(file => {
    const decFilePath = path.resolve(config.decDir, file);
    if (fs.lstatSync(decFilePath).isFile()) {
      const encFilePath = path.resolve(config.encDir, file + encSuffix);
      // console.log({ decFilePath, encFilePath });
      const content = readFileContent(decFilePath);
      const encConent = encryptByAes256(content, { secretkey });
      writeFileContent(encFilePath, encConent)
    }
  });
}

/**
 * 解密密文目录中的文件，密文目录在 config.ini 中配置
 * 
 * @param {*} secretkey 密钥
 */
function decrypt(secretkey) {
  const config = getConfig();
  const files = fs.readdirSync(config.encDir);
  files.forEach(file => {
    const decFilePath = path.resolve(config.decDir, file.slice(0, -1 * encSuffix.length));
    const encFilePath = path.resolve(config.encDir, file);
    const content = readFileContent(encFilePath);
    let decConent = '';
    try {
      decConent = decryptByAes256(content, { secretkey });
    } catch (e) {
      console.log(String(e));
      throw `${encFilePath} 解密失败，可能原因：密钥错误`
    }
    writeFileContent(decFilePath, decConent)
  });
}

/**
 * 删除当前明文目录中的文件
 */
function clearDecDir() {
  const config = getConfig();
  const files = fs.readdirSync(config.decDir)
  files.forEach(file => {
    const decFilePath = path.resolve(config.decDir, file);
    if (fs.lstatSync(decFilePath).isFile()) {
      fs.unlinkSync(decFilePath);
    }
  });
}

/**
 * 删除密文目录中的文件
 */
function clearEncDir() {
  const config = getConfig();
  const files = fs.readdirSync(config.encDir)
  files.forEach(file => {
    const decFilePath = path.resolve(config.encDir, file);
    if (fs.lstatSync(decFilePath).isFile()) {
      fs.unlinkSync(decFilePath);
    }
  });
}

module.exports = {
  check,
  encrypt,
  decrypt,
  clear: clearDecDir
}