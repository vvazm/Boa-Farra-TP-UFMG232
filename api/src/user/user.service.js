const statusHandler = require("../helpers/helpers.statusHandler");
const {
    createHash,
    getKeyFront,
    checkPassword,
    checkEmail,
    verifyTypes,
    checkCookiesAndGetId,
    checkHash
} = require("../helpers/helpers.global");
const {
    save, 
    findAll,
    findById,
    updateById
} = require("../model");
const {
    dtoUser
} = require("./user.dto");

const checkExistValues = async(value, key, id, label)=>{
    try{

        const findUser = await findAll({key:value}, "user");

        if(findUser.length > 0){

            const {
                _id
            } = findUser[0];

            if(_id + "" !== id){
                throw(statusHandler.newResponse(409, `${label} in use`));
            }

        }

        return true;
    }catch(error){
        throw(statusHandler.serviceError(error));
    }
};

const checkValuesUser = async(user, id = null)=>{
    try{

        !id ? verifyTypes(user, dtoUser) : verifyTypes(user, dtoUser, true);

        const password = user[getKeyFront(dtoUser, "key_hash_user")];
        const confirmPassword = user["confirm_password"];
        const email = user[getKeyFront(dtoUser, "key_email_user")];
        const username = user[getKeyFront(dtoUser, "key_username_user")];

        if(confirmPassword !== password){
            throw(statusHandler.newResponse(422, "Passwords do not match"));
        }

        if(!id){
            checkPassword(password);
        }
       
        checkEmail(email);
        await checkExistValues(email, "key_email_user", "E-email", id);
        await checkExistValues(username, "key_username_user", "Username", id);
        
        return true;
    }catch(error){
        throw(statusHandler.serviceError(error));
    }
};

const createUser = async(user)=>{
    try{

        user[getKeyFront(dtoUser, "key_status_user")] = 1;
        await checkValuesUser(user);
        user[getKeyFront(dtoUser, "key_hash_user")] = createHash(user[getKeyFront(dtoUser, "key_hash_user")]);
        await save(user, "user");

        return statusHandler.newResponse(200, "Created user");
    }catch(error){
        throw(statusHandler.serviceError(error));
    }
};

const getUser = async({authorization}) =>{
    try{

        const id = await checkCookiesAndGetId(authorization);

        return statusHandler.newResponse(200, await findById(id, "user"));
    }catch(error){
        throw(statusHandler.serviceError(error));
    }
};

const changeUser = async({authorization}, user)=>{
    try{

        const id = await checkCookiesAndGetId(authorization);

        await checkValuesUser(user, id);
        await updateById(user, id, "user");

        return statusHandler.newResponse(200, "Updated user");
    }catch(error){
        throw(statusHandler.serviceError(error));
    }
};

const changeStatusUser = async({authorization})=>{
    try{

        const id = await checkCookiesAndGetId(authorization);
        const {
            key_status_user
        } = await findById(id, "user");
        const status = key_status_user ? 0 : 1;

        await updateById({key_status_user:status}, id, "user", false);

        const message = status ? "Reactivated user" : "Disabled user";

        return statusHandler.newResponse(200, message);
    }catch(error){
        throw(statusHandler.serviceError(error));
    }
};


module.exports = {
    createUser,
    getUser,
    changeUser,
    changeStatusUser,
};