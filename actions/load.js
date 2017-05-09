const fs = require('fs');
const path = require('path');

module.exports = (output, user, data, newCall) => {
    if(!data.user) {
        data.user = user;
    }    
    
    var dir = path.resolve(__dirname, "../files/" + data.user);
    
    if (!fs.existsSync(dir)){
        output(`${data.user} doesn't have any files`);
        return;
    }
    
    fs.readdir(dir, (err, items) => {
        if(err){
            console.log(err);
        }
        
        for(var i = items.length - 1; i >= 0; i--) {
            if(items[i].split('.')[0].toUpperCase() === data.fileName.toUpperCase()) {
                
                var url = process.env.url + data.user + "/" + items[i].split('.')[0];
                
                if(global.disc) {
                    global.disc.uploadFile({
                        to: data.channelID,
                        file: dir + "/" + items[i],
                        message: `Here it is: ${url}`
                    });
                    return;
                }
                
                output(`Here it is: ${url}`);
                return;
            }
        }
        
        output(`${data.user} doesn't have any files named ${data.fileName}`);
    });
};