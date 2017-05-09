module.export = (() => {
    var express = require('express'),
        app = express();

    app.use(express.static(__dirname + '../files'));
    app.listen(process.env.port);
})();