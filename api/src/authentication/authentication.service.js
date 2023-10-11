const statusHandler = require("../helpers/helpers.statusHandler");
const {
    checkHash,
    checkPassword,
    createJwt,
    checkCookiesAndGetId,
    createHash,
    
} = require("../helpers/helpers.global");
const {
    findAll,
    updateById
} = require("../model");

const login = async(body)=>{
    try{

        const username = body["username"];
        const password = body["password"];

        if(!!!username || !!!password){
            throw(statusHandler.newResponse(412, "Username and password cannot be empty"));
        }

        checkPassword(password);

        const findUser = await findAll({key_username_user:username}, "user");
        const findPub = await findAll({key_name_pub:username}, "pub");
        

        if(findUser.length !== 1 && findPub.length !== 1){
            throw(statusHandler.newResponse(412, "Invalid username"));
        }

        const type = findUser.length ? "user" : "pub";
        const currentLogin = findUser.length ? findUser : findPub;
        const id = currentLogin[0]._id;
        const hash = currentLogin[0][`key_hash_${type}`];

        if(!checkHash(password, hash, true)){
            throw(statusHandler.newResponse(401, "Invalid password"));
        }

        const jwt = await createJwt({id});

        return statusHandler.newResponse(200, {jwt, type});
    }catch(error){
        throw(statusHandler.serviceError(error));
    }
};

const changePassword = async({password, confirm_password, last_password}, {authorization})=>{
    try{

        checkPassword(password);
        checkPassword(confirm_password);
        checkPassword(last_password);

        if(password !== confirm_password){
            throw(statusHandler.newResponse(409, "Passwords don't match"));
        }

        const id = await checkCookiesAndGetId(authorization);
        const findUser = await findAll({_id:id}, "user");
        const findPub = await findAll({_id:id}, "pub");
        const type = findUser.length ? "user" : "pub";
        const currentType = findUser.length ? findUser : findPub;
        const hash = currentType.pop()[`key_hash_${type}`]
    
        if(!checkHash(last_password, hash, true)){
            throw(statusHandler.newResponse(409, "Old invalid password"));
        }

        if(last_password === password){
            throw(statusHandler.newResponse(409, "Your new password cannot be the same as your previous one"));
        }

        let update = {};
        update[`key_hash_${type}`] = createHash(password);

        await updateById(update, id, type, false);

        return statusHandler.newResponse(200, "Updated password");
    }catch(error){
        throw(statusHandler.serviceError(error));
    }
};


module.exports = {
    login,
    changePassword
};