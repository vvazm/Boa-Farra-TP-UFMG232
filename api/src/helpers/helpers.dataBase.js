const mongoose = require("mongoose");
const {getValue} = require("./helpers.secret")

module.exports = async ()=>{
    try{

        const url = await getValue("URL-DB");
        mongoose.set("strictQuery", false);
        mongoose.set("strictPopulate", false);

        await mongoose.connect(url);

        return;
    }catch(erro){
       
        console.log(erro);

    }
};