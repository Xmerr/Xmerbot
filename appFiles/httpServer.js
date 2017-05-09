var path = require('path');

module.export = (() => {
    var express = require('express'),
        app = express();

    app.use(express.static(path.join(__dirname + '/../files'),{
        index:false,
        extensions:['html']
    }));
    app.listen(process.env.port);
})();
