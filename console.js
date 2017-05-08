//Used for running as a console app

"use strict";

const readline = require("readline");
const app = require('./app.js');

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