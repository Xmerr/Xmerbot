const fs = require('fs');
const path = require('path');

module.exports = (output, user, data, newCall) => {
    if(!data.user) {
        data.user = user;
    }
    
    var noFiles = `Oh... This is awkward.... ${data.user} has not saved any files.`; 
    
    var dir = path.resolve(__dirname, '../files/' + data.user);
    
    if(!fs.existsSync(dir)){
        output(noFiles);
        return;
    }
    
    fs.readdir(dir, (err, items) => {
        if(err) {
            console.log(err);
        }
        
        if(items.length === 0) {
            output(noFiles);
            return;
        }
        
        output(`${data.user} has the following files: `);
        for(var i = items.length - 1; i >= 0; i--) {
            output(items[i]);
        }
    });
};