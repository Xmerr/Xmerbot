//Used for running as a discord bot

"use strict";

process.env = require('../process.env.json');

const Discord = require('discord.io');
const app = require('./appFiles/app.js');
const fs = require('fs');
 
var disc = new Discord.Client({
    token: process.env.discord,
    autorun: true
});
 
disc.on('ready', function() {
    console.log('Logged in as %s - %s\n', disc.username, disc.id);
    fs.writeFile('./appFiles/clientData.json', JSON.stringify(disc), 'utf8');
});
 
disc.on('message', function(user, userID, channelID, message) {
    app(message, (msg) => {
        disc.sendMessage({
            to: channelID,
            message: msg 
        });
    }, user, userID, channelID);
});

global.disc = disc;