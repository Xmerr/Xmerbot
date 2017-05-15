"use strict";

const apiai = require('apiai');

const save = require('../actions/save');
const load = require('../actions/load');
const queryFiles = require('../actions/queryFiles');
const queryUsers = require('../actions/queryUsers');

const updateEntities = require('../advancedActions/updateEntities');

require('./databaseConnection');

const fs = require('fs');
const path = require('path');

const client = apiai(process.env.apiai);
 
const actions = {
    Save: {
        key: "saveFile",
        method: save
    },
    Load: {
        key: "loadFile",
        method: load
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

process.env.url = (() => {
    var url = process.env.domain;
    
    if(process.env.port !== 80) {
        url += ":80";
    }
    
    return url + "/dndImages/";
})();

require('./httpServer');

function application (input, output, user, userID, channelID) {
    if(!user){
        user = "Master";
    }
    
    var dir = path.resolve(__dirname, "../files/" + user);
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
                    actions[ac].method(
                        output,
                        user,
                        Object.assign(data.result.parameters, {userID, channelID}),
                        application
                    );
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