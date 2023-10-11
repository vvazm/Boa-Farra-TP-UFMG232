const {Schema} = require("mongoose");
const {
    encryptKeyFront
} = require("../helpers/helpers.global");


const dtoCheckin = {
    key_user_checkin:{
        type: Schema.Types.ObjectId, 
        ref: 'USER_BOAFARRA',
        update:false,
        required:true,
        key_front:encryptKeyFront('user'),
    },
    key_post_checkin:{
        type: Schema.Types.ObjectId, 
        ref: 'POST_BOAFARRA',
        update:false,
        required:true,
        key_front:encryptKeyFront('post'),
    },
    key_picture_checkin:{
        // required:true,
        type:String,
        key_front:encryptKeyFront('picture'),
        update:false
    },
    key_pub_checkin:{
        type: Schema.Types.ObjectId, 
        ref: 'PUB_BOAFARRA',
        update:false,
        required:true,
        key_front:encryptKeyFront('pub'),
    },
};

const dtoPost = {
    key_pub_post:{
        type: Schema.Types.ObjectId, 
        ref: 'PUB_BOAFARRA',
        update:false,
        required:true,
        key_front:encryptKeyFront('pub'),
    },
    key_picture_post:{
        // required:true,
        type:String,
        key_front:encryptKeyFront('picture'),
        update:false
    }   
};

module.exports = {
    dtoPost,
    dtoCheckin
};