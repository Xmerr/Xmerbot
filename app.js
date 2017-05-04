"use strict";

const Wit = require('node-wit').Wit;
const meta = require('./actions/meta');
const save = require('./actions/save');

const client = new Wit({'accessToken': 'ZK5WKHCJGFVEYA6XKJ523BCRXGDM5HNC'});
 
const actions = {
    SAVE: "!save",
    LOAD: "!load",
    META: "!meta",
    PING: "!ping"
};
 
function getData(msg) {
    if(msg[0] !== '!') {
        return null;
    }
    
    var obj = {};
    
    for(var i in actions) {
        if(msg.toUpperCase().indexOf(actions[i].toUpperCase()) === 0) {
            obj.action = actions[i];
            break;
        }
    }
    
    var params = msg.split(' ');
    
    for(var j = 0; j < params.length - 1; j++) {
        if(params[j].indexOf('-') === 0 && params[j][1] && params[j][1] !== '-' && params[j+1]){
            obj[params[j][1]] = params[j+1];
            j++;
        }
    }
    
    return obj;
}

module.exports = (input, output, user) => {
    if(!user){
        user = "master";
    }
    
    client.message(input)
        .then((data) => {
            output("Respons: " + JSON.stringify(data));
        })
        .catch(console.error);
    
    var data = getData(input);
    if(!data) {
        return;
    }
    
    switch(data.action) {
        case actions.PING: 
            output("pong");
            break;
        
        case actions.SAVE:
            save.action(output, data, user);
            break;
            
        case actions.META:
            meta.action(output, data, user);
            break;
    }
};
