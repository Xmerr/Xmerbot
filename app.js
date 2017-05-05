"use strict";

const Wit = require('node-wit').Wit;
const apiai = require('apiai');
const tokens = require('./tokens.json');

const meta = require('./actions/meta');
const save = require('./actions/save');
const greet = require('./actions/greet');
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
    },
    GREET: {
        key: "greet",
        method: greet
    }
};
    

module.exports = (input, output, user) => {
    if(input.toUpperCase().indexOf("XMERBOT") === -1) {
        return;
    }
    
    updateEntities();
    
    if(!user){
        user = "Master";
    }
    
    var request = client.textRequest(input, {
       sessionId: user 
    });
    
    request.on('response', (data) => {
        output(data);
    });
    
    request.on('error', (err) => {
        console.log(err);
    });
    
    request.end();
    
    /*
    client.message(input)
        .then((data) => 
        {
            if(!data.entities || data.entities.intent[0].confidence < 0.7) {
                output("I don't understand...");
            }
            else {
                var found = false;
                for(var ac in actions) {
                    if(data.entities.intent[0].value.toUpperCase() === actions[ac].key.toUpperCase()){
                        output("Found something!");
                        actions[ac].method(output, data, user);
                        
                        found = true;
                        break;
                    }
                }
                if(!found) {
                    output("Wait..... What?");
                }
            }
        
            output("Response: " + JSON.stringify(data));
        })
        .catch(console.error);
        
        */
};
