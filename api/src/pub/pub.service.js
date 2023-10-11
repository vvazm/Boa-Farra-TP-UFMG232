const { 
    verifyTypes, 
    getKeyFront,
    checkEmail,
    checkPassword,
    createHash,
    createJwt,
    checkCookiesAndGetId
} = require("../helpers/helpers.global");
const statusHandler = require("../helpers/helpers.statusHandler")
const {
    save, 
    findAll,
    findById,
    updateById,
} = require("../model");

const {
    dtoPub
} = require("./pub.dto")

const {
    createPost
} = require("../posts/posts.service")

const checkExistValuesPub = async(query, id, label)=>{
    try{

        const findPub = await findAll(query, "pub");

        if(findPub.length){

            const { 
                _id
            } = findPub[0];

            if(_id + "" !== id){
                throw(statusHandler.newResponse(402, `Pub ${label} in use`));
            }
        }

        return true;
    }catch(error){
        throw(statusHandler.serviceError(error));
    }
};

const checkValuesPub = async(pub, id = null)=>{
    try{

        !id ? verifyTypes(pub, dtoPub) : verifyTypes(pub, dtoPub, true);
        
        const name = pub[getKeyFront(dtoPub, "key_name_pub")];
        const email = pub[getKeyFront(dtoPub, "key_email_pub")];
        
        if(!id){
            const password = pub[getKeyFront(dtoPub, "key_hash_pub")];
            
            checkPassword(password);   
        }
        
        checkEmail(email);
        await checkExistValuesPub({key_name_pub:name}, id, "name");
        await checkExistValuesPub({key_email_pub:email}, id, "email");

        return true;
    }catch(error){
        throw(statusHandler.serviceError(error));
    }
};

const createNewPub = async(pub)=>{
    try{

        await checkValuesPub(pub);

        const password = pub[getKeyFront(dtoPub, "key_hash_pub")];

        pub[getKeyFront(dtoPub, "key_hash_pub")] = createHash(password);

        const id = await save(pub, "pub");
        const picture = pub[getKeyFront(dtoPub, "key_picture_pub")];
        const post = {
            pub:"" + id,
            picture
        };

        await createPost(post, false, true);

        return statusHandler.newResponse(200, {jwt:await createJwt({id})});
    }catch(error){
        throw(statusHandler.serviceError(error));
    }
};

const getPub = async({authorization})=>{
    try{

        const id = await checkCookiesAndGetId(authorization);

        return statusHandler.newResponse(200, await findById(id, "pub"));
    }catch(error){
        throw(statusHandler.serviceError(error));
    }
};

const changePub = async({authorization}, pub)=>{
    try{

        const id = await checkCookiesAndGetId(authorization);

        await checkValuesPub(pub, id);
        await updateById(pub, id, "pub");

        return statusHandler.newResponse(200, "Updated pub");
    }catch(error){
        throw(statusHandler.serviceError(error));
    }
};

module.exports = {
    getPub,
    createNewPub,
    changePub
};


