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
                directories[i] + "'s"
            ]
        });
    }
    
    fs.writeFile(path.resolve(__dirnamem, './users.json'), JSON.stringify(users), (err) => {
        if(err) {
            console.log(err);
        }
        else{
            console.log('worked???');
        }
    });
};