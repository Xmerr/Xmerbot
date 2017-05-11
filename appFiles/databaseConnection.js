const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dnd');

var Item = require('./schemas/items.js')(mongoose);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => { });

module.exports.Item = Item;