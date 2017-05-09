var path = require('path');

module.export = (() => {
    var express = require('express'),
        app = express();

    app.use(express.static(path.join(__dirname + '/../files'),{index:false,extensions:['html']}));
>>>>>>> 2d2affc494e18b9f3fe2fe6d06cb2710914d04da
    app.listen(process.env.port);
})();
