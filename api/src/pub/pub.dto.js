const {
    encryptKeyFront
} = require("../helpers/helpers.global");

const dtoPub = {
    key_name_pub:{
        type:String,
        required:true,
        update:true,
        key_front:encryptKeyFront('name'),

    },
    key_picture_pub:{
        type:String,
        required:false,
        update:true,
        key_front:encryptKeyFront('picture'),
    },
    key_email_pub:{
        type:String,
        required:true,
        update:true,
        key_front:encryptKeyFront('email'),
    },
    key_hash_pub:{
        type:String,
        required:true,
        update:false,
        key_front:encryptKeyFront('password'),
    }
};


module.exports = {
    dtoPub
};