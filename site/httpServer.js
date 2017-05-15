var path = require('path');

module.export = (() => {
    var express = require('express'),
        app = express();

    app.use(process.env.dndImageLocation, express.static(path.join(__dirname + '/../files'),{
        index: false,
        extensions: ['webp', 'html']
    }));
    app.use('/public', express.static(path.join(__dirname + './publicFiles')));
    
    app.get('/', (req, res) => {
       res.send("This is going to be Xmer's portfolio site. Which is going to be super awesome... Once it's done"); 
    });
    
    app.listen(process.env.port);
})();