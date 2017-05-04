var util = require('util');

const greetings = [
    'Oh, hello there %s',
    "What's up %s",
    'Good to see you %s',
    'What\'s cracking?',
    'It\'s always a pleasure to see you %s',
    'Oh.... It\'s you...',
    'I guess you want me to stop what I\'m working on and help you'
];

module.exports = (output, data, user) => {
    var greet = greetings[Math.floor(Math.random() * (greetings.length + 1))];
    
    if(greet.indexOf('%s') !== -1) {
        output(util.format(greet, user));
    }
    else{
        output(greet);
    }
};