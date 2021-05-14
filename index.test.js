
const { decryptByAes192, encryptByAes192 } = require('./utils/crypto')

const str = 'hello google';

const secretkey = 'asia';

const encStr = encryptByAes192(str, { secretkey });

console.log({ encStr });

const decStr = decryptByAes192(encStr, { secretkey });

console.log(decStr);