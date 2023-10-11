const {model, Schema} = require("mongoose");

const {
    dtoPub
} = require("./pub.dto");


const models = [
    {
        model:"pub",
        dto:dtoPub,
        schema:model("PUB_BOAFARRA", new Schema(dtoPub, {timestamps:true})),
    }
];

module.exports = models;
