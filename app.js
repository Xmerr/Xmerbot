"use strict";

const Wit = require('node-wit').Wit;
const apiai = require('apiai');

const meta = require('./actions/meta');
const save = require('./actions/save');
const greet = require('./actions/greet');

//const client = new Wit({'accessToken': 'ZK5WKHCJGFVEYA6XKJ523BCRXGDM5HNC'});
const client = apiai("6948700182f145b7940afc91fede274b");
 
const actions = {
    SAVE: {
        key: "save",
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
