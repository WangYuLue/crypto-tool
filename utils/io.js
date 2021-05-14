const fs = require('fs');

function readFileContent(filePath) {
  const contents = fs.readFileSync(filePath);
  return contents.toString();
}

function writeFileContent(filePath, content) {
  fs.writeFileSync(filePath, content)
}

module.exports = {
  readFileContent,
  writeFileContent
}