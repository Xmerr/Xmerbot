const users = require('./users.js');
const tokens = require('../tokens.json');
const request = require('request');

const options = {
    url: "https://api.api.ai/v1/entities?v=20150910",
    headers: {
        Authorization: "Bearer " + tokens.apiai,
        'Content-Type': 'application/json'
    }
};


module.exports = () => {
    var entities = [];
    entities.push(users());
    
    console.log('sending users...');
    console.log(entities);
    
    request.put(options, {
        json: JSON.stringify(entities)
    }, (err, response, body) => {
       if(err){
           console.log(err);
       } 
       else {
           console.log(body);
       }
    });
};
