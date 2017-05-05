"use strict";

var Discord = require('discord.io');
var app = require('./app.js');
var tokens = require('./tokens.json');
 
var disc = new Discord.Client({
    token: tokens.discord,
    autorun: true
});
 
disc.on('ready', function() {
    console.log('Logged in as %s - %s\n', disc.username, disc.id);
});
 
disc.on('message', function(user, userID, channelID, message) {
    app(message, (msg) => {
        disc.sendMessage({
            to: channelID,
            message: msg 
        });
    }, user);
});