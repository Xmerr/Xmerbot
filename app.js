"use strict";

var Discord = require('discord.io');

var meta = require('./actions/meta');
var save = require('./actions/save');
 
var bot = new Discord.Client({
    token: "MzA5NDQyNDc5MDk3MzgwODY0.C-vetw.EDYRzF-Obq5NiliM1N3pt9JMx5I",
    autorun: true
});

const actions = {
    SAVE: "!save",
    LOAD: "!load",
    META: "!meta",
    PING: "!ping"
};
 
bot.on('ready', function() {
    console.log('Logged in as %s - %s\n', bot.username, bot.id);
});
 
bot.on('message', function(user, userID, channelID, message, event) {
    var data = getData(message);
    if(!data) {
        return;
    }
    
    switch(data.action) {
        case actions.PING: 
            bot.sendMessage({
                to: channelID,
                message: "pong"
            });
            break;
        
        case actions.SAVE:
            save.action(bot, data, user, channelID);
            break;
            
        case actions.META:
            meta.action(bot, data, user, channelID);
            break;
    }
});

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