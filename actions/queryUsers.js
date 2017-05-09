const fs = require('fs');
const path = require('path');

function getDirectories (srcpath) {
  return fs.readdirSync(srcpath)
    .filter(file => fs.statSync(path.join(srcpath, file)).isDirectory());
}

module.exports = (output, user, data, newCall) => {
    if(!data.user) {
        data.user = user;
    }
    
    var users = getDirectories(path.resolve(__dirname, '../files/'));
    
    var string = `The following users have used this bot: \n`;
    for(var i = 0; i < users.length; i++) {
        string += `${users[i]} \n`;
    }
    
    output(string);
};