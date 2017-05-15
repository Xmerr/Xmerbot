var path = require('path');

module.export = (() => {
    var express = require('express'),
        app = express();

    app.use('/dndImages', express.static(path.join(__dirname + '/../files'),{
        index: false,
        extensions: ['webp', 'html']
    }));
    app.listen(process.env.port);
})();