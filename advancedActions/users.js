const path = require('path');
const fs = require('fs');
const jsonfile = require('jsonfile');

function getDirectories (srcpath) {
  return fs.readdirSync(srcpath)
      .filter(file => fs.statSync(path.join(srcpath, file))
              .isDirectory());
}

module.exports = () => {
    var directories = getDirectories(path.resolve(__dirname, '../files'));
    var users = [];

    for(var i = 0; i <= directories.length - 1; i++) {
        users.push(directories[i]);
    }
    
    jsonfile.writeFile('./users.json', users);
};