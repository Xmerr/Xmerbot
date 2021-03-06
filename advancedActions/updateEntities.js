const users = require('./users.js');
const https = require('https');

var options = {
    hostname: 'api.api.ai',
    port: 443,
    path: '/v1/entities?v=20150910',
    method: 'PUT',
    headers: {
        Authorization: "Bearer " + process.env.apiai,
        'Content-Type': 'application/json'
    }
};


module.exports = () => {
    var entities = [];
    entities.push(users());
    
    var strEntities = JSON.stringify(entities);
    options.headers['Content-Length'] = strEntities.length; 
    
    var req = https.request(options, res => {
        res.on('data', data => { });
    });
    req.write(strEntities);
    req.end();
};
