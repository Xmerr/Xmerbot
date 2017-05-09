//Used for running as a console app

"use strict";

process.env = require('./appFiles/process.env.json');

const readline = require("readline");
const app = require('./appFiles/app.js');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stout
});


rl.on('line', (message) => {
    app(message, (msg) => {
        console.log(msg);
    });
});

console.log('Running Test');