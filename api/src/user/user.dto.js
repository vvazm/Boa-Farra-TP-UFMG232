const {Schema} = require("mongoose");
const {
    encryptKeyFront
} = require("../helpers/helpers.global");

const dtoUser = {
    key_username_user:{
        type:String,
        required:true,
        key_front:encryptKeyFront('username'),
        update:true
    },
    key_email_user:{
        type:String,
        required:true,
        key_front:encryptKeyFront('email'),
        update:true
    },
    key_hash_user:{
        type:String,
        required:true,
        key_front:encryptKeyFront('password'),
        update:false
    },
    key_status_user:{
        required:true,
        type:Number,
        key_front:encryptKeyFront('status'),
        update:false,
        default:1,
        enum:[0,1]
    },
    key_picture_user:{
        type:String,
        // required:true,
        key_front:encryptKeyFront('picture'),
        update:true
    },
};

module.exports = {
    dtoUser
};