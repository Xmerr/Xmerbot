module.export = (() => {
    var express = require('express'),
        app = express();

    app.use(express.static(__dirname + '../files'));
    console.log(process.env.port);
    app.listen(process.env.port);
})();