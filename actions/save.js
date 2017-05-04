const fs = require('fs');

// these can be used with !meta -d <cmd>
const dActions = {
};

module.exports.dActions = dActions;

module.exports.action = (output, data, user) => {
    output("Saving this for you " + user + "...");
    
    var dir = "files/" + user;
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    
    fs.writeFile(dir + "/" + data.n, data.m, function(err) {
        if(err) {
            return console.log(err);
        }
    
        output("The file was saved!");
    }); 
};