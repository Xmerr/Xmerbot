"use strict";
//https://discordapp.com/oauth2/authorize?&client_id=310822450684493825&scope=bot&permissions=0

const apiai = require('apiai');
const tokens = require('./tokens.json');

const meta = require('./actions/meta');
const save = require('./actions/save');
const updateEntities = require('./advancedActions/updateEntities');

//const client = new Wit({'accessToken': 'ZK5WKHCJGFVEYA6XKJ523BCRXGDM5HNC'});
const client = apiai(tokens.apiai);
 
const actions = {
    SAVE: {
        key: "saveFile",
        method: save
    },
    LOAD: {
        key: "load",
        method: () => {
            console.log("Worked");   
        }
    },
    META: {
        key: "meta",
        method: meta
    }
};

function application (input, output, user) {
    if(input.toUpperCase().indexOf("XMERBOT") === -1) {
        return;
    }
    
    input = input.replace('xmerbot', '').replace('  ', ' ');
    
    updateEntities();
    
    if(!user){
        user = "Master";
    }
    
    var request = client.textRequest(input, {
       sessionId: user 
    });
    
    request.on('response', (data) => {
        output(data.result.fulfillment.speech);
        
        if(data.result.action){
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