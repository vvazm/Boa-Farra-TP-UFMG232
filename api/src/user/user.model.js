const {model, Schema} = require("mongoose");

const {
    dtoUser
} = require("./user.dto");


const models = [
    {
        model:"user",
        dto:dtoUser,
        schema:model("USER_BOAFARRA", new Schema(dtoUser, {timestamps:true}))
    }
];

module.exports = models;