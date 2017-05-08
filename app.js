"use strict";
//https://discordapp.com/oauth2/authorize?&client_id=310822450684493825&scope=bot&permissions=0

const apiai = require('apiai');
const tokens = require('./tokens.json');

const save = require('./actions/save');
const queryFiles = require('./actions/queryFiles');
const queryUsers = require('./actions/queryUsers');

const updateEntities = require('./advancedActions/updateEntities');

const fs = require('fs');
const path = require('path');

//const client = new Wit({'accessToken': 'ZK5WKHCJGFVEYA6XKJ523BCRXGDM5HNC'});
const client = apiai(tokens.apiai);
 
const actions = {
    Save: {
        key: "saveFile",
        method: save
    },
    Load: {
        key: "load",
        method: () => {
            console.log("Worked");   
        }
    },
    QueryFiles: {
        key: "displayFiles",
        method: queryFiles 
    },
    QueryUsers: {
        key: "displayUsers",
        method: queryUsers
    }
};

function application (input, output, user) {
    if(!user){
        user = "Master";
    }
    
    var dir = path.resolve(__dirname, "./files/" + user);
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    
    if(input.toUpperCase().indexOf("XMERBOT") === -1) {
        return;
    }
    
    input = input.replace('xmerbot', '').replace('  ', ' ');
    
    updateEntities();
    
    var request = client.textRequest(input, {
       sessionId: user 
    });
    
    request.on('response', (data) => {
        if(data.result.fulfillment.speech && data.result.fulfillment.speech.length >= 1) {
            output(data.result.fulfillment.speech);
        }
        
        if(data.result.action) {
            for(var ac in actions) {
                if(data.result.action.toUpperCase() === actions[ac].key.toUpperCase()) {
                    actions[ac].method(output, user, data.result.parameters, application);
                }
            }
        }
    });
    
    request.on('error', (err) => {
         console.log(err);
    });
    
    request.end();
}


module.exports = application;