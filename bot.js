//Used for running as a discord bot

"use strict";

const Discord = require('discord.io');
const app = require('./app.js');
const tokens = require('./tokens.json');
const fs = require('fs');
 
var disc = new Discord.Client({
    token: tokens.discord,
    autorun: true
});
 
disc.on('ready', function() {
    console.log('Logged in as %s - %s\n', disc.username, disc.id);
    fs.writeFile('clientData.json', JSON.stringify(disc), 'utf8');
});
 
disc.on('message', function(user, userID, channelID, message) {
    app(message, (msg) => {
        disc.sendMessage({
            to: channelID,
            message: msg 
        });
    }, user);
});