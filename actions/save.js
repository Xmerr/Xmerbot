const fs = require('fs');

// these can be used with !meta -d <cmd>
const dActions = {
};

module.exports.dActions = dActions;

module.exports.action = (bot, data, user, channelID) => {
    bot.sendMessage({
        to: channelID,
        message: "Saving this for you " + user + "..."
    });
    
    var dir = "files/" + user;
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    
    fs.writeFile(dir + "/" + data.n, data.m, function(err) {
        if(err) {
            return console.log(err);
        }
    
        console.log("The file was saved!");
    }); 
};