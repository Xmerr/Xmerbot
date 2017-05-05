const path = require('path');
const fs = require('fs');

function getDirectories (srcpath) {
  return fs.readdirSync(srcpath)
      .filter(file => fs.statSync(path.join(srcpath, file))
              .isDirectory());
}

module.exports = () => {
    var directories = getDirectories(path.resolve(__dirname, '../files'));
    var users = {
        name: "users",
        entries: []
    };

    for(var i = 0; i <= directories.length - 1; i++) {
        users.entries.push({
            value: directories[i],
            synonyms: [
                directories[i],
                directories[i] + "'s",
                directories[i] + 's'
            ]
        });
    }
    
    return users;
};