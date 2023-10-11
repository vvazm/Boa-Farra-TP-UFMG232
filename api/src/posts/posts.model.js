const {model, Schema} = require("mongoose");

const {
    dtoPost,
    dtoCheckin
} = require("./posts.dto");


const models = [
    {
        model:"post",
        dto:dtoPost,
        schema:model("POST_BOAFARRA", new Schema(dtoPost, {timestamps:true})),
        populate:"key_pub_post"

    },
    {
        model:"checkin",
        dto:dtoCheckin,
        schema:model("CHECKIN_BOAFARRA", new Schema(dtoCheckin, {timestamps:true})),
        populate:"key_user_checkin"

    }
];

module.exports = models;
