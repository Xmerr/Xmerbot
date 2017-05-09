var path = require('path');

module.export = (() => {
    var express = require('express'),
        app = express();

    app.use(express.static(path.join(__dirname + '/../files'),{
        index: false,
        extensions: ['webp', 'html']
    }));
    
    app.listen(process.env.port, 'xmer.pw', (err) => {
        if(err){
            console.log(err);
        }
        else {
            console.log('we\'re online');
        }
    });
})();
