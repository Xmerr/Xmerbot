const fs = require('fs');
const request = require('request');
const path = require('path');

var webp = require('webp-converter');

module.exports = (output, user, data, newCall) => {
    var dir = path.resolve(__dirname, "../files/" + user);
    var filePath = path.resolve(dir, data.fileName);
    
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    
    fs.readdir(dir, (err, items) => {
        if(err){
            console.log(err);
        }
        
        for(var i = items.length - 1; i >= 0; i--) {
            if(items[i].split('.')[0] === data.fileName) {
                if(data.override) {
                    fs.unlinkSync(dir + "/" + items[i]);
                    break;
                }
                else {
                    newCall("XMERBOT ERROR 501: " + data.url + " " + data.fileName, output, user);
                    return;
                }
            }
        }
        
        data.override = true;
        
        if(data.override) {
            request.head(data.url, (err, res, body) => {
                if(err) {
                    console.log(err);
                }
                
                var fileType = res.headers['content-type'];
                fileType = fileType.split('/')[1];
                
                if(fileType.indexOf(';') !== -1) {
                    fileType = fileType.substr(0, fileType.indexOf(';'));
                }
                
                request(data.url).pipe(fs.createWriteStream(`${filePath}.${fileType}`))
                    .on('close', () => {
                        var removeTmpFile = () => {
                            fs.unlinkSync(`${filePath}.${fileType}`);
                        };
                        
                        if(fileType.indexOf('gif') !== -1) {
                            webp.gwebp(`${filePath}.${fileType}`, `${filePath}.webp`, "-q 80", (status) => {
                                if(status === 100) {
                                    removeTmpFile();
                                }
                                else{
                                    console.log('error');
                                }
                            });
                        }
                        else {
                            webp.cwebp(`${filePath}.${fileType}`, `${filePath}.webp`, "-q 80", (status) => {
                                if(status === 100) {
                                    removeTmpFile();
                                }
                                else{
                                    console.log('error');
                                }
                            });
                        }
                       output("Successfully saved that file");
                });
            });
        }
    });
};