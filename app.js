"use strict";

var Discord = require('discord.io');
 
var bot = new Discord.Client({
    token: "MzA5NDQyNDc5MDk3MzgwODY0.C-vetw.EDYRzF-Obq5NiliM1N3pt9JMx5I",
    autorun: true
});
 
bot.on('ready', function() {
    console.log('Logged in as %s - %s\n', bot.username, bot.id);
});
 
bot.on('message', function(user, userID, channelID, message, event) {
    if (message === "ping") {
        bot.sendMessage({
            to: channelID,
            message: "pong"
        });
    }
});
