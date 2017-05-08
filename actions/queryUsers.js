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
    
    output("The following users have used this bot: ");
    for(var i = 0; i < users.length; i++) {
        output(users[i]);
    }
};