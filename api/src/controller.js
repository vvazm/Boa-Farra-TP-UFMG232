const {readdirSync, existsSync} = require("fs");
const app = require("express")();
const dirs = readdirSync(__dirname);


if(dirs.length>0){
    dirs.forEach(dir=>{

        const path = `${__dirname}/${dir}/${dir}.controller.js`;

        if(existsSync(path)){
            app.use(require(path));
        }

    });
}

module.exports = app;