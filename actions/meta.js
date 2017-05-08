const fs = require('fs');
const path = require('path');

function getDirectories (srcpath) {
  return fs.readdirSync(srcpath)
      .filter(file => fs.statSync(path.join(srcpath, file))
              .isDirectory());
}

// these can be used with !meta -d <cmd>
const dActions = {
    LIST_USERS: 'users',
    LIST_FILES: 'files'
};

module.exports.dActions = dActions;

module.exports.action = (output, user, data) => {
    var message = "Invalid Command(s)";
    
    switch(data.d) {
        case dActions.LIST_USERS:
            var directories = getDirectories(path.resolve(__dirname, '../files'));
             message = "users:";
            
            if(directories.length > 0) {
                for(var i = 0; i <= directories.length - 1; i++) {
                    message += "\n" + directories[i];
                }
            }
            else {
                message = "No Users... Yet :)";
            }
            
            break;
            
        case dActions.LIST_FILES:
            if(data.u) {
                if (fs.existsSync("../files/" + data.u)){
                    var directories = getDirectories(path.resolve(__dirname, '../files', data.u));
                    message = "files:";
                    
                    if(directories.length > 0) {
                        for(var i = 0; i <= directories.length - 1; i++) {
                            message += "\n" + directories[i];
                        }
                    }
                    else {
                        message = "No files :sweat_smile:";
                    }
                }
                else {
                    message = "No user with that name";
                }
            }
            else {
                message = "User name must be specified. Try '!meta -d users' first. Then use '!meta -d files -u <user name>";
            }
            break;
    }
    
    output(message);
}