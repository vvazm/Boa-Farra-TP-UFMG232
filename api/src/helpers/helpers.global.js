const {genSaltSync, hashSync, compareSync} = require("bcrypt");
const nodeMailer = require("nodemailer");
const statusHandler = require("./helpers.statusHandler");
const jwt = require("jsonwebtoken");
const {
    getValue
} = require("./helpers.secret");

const checkEmail = (email)=>{
    try{

        if(!!!email){
            throw(statusHandler.newResponse(422, "E-mail não pode ser vazio"));
        }

        const emailMatch = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
     
        if(!emailMatch){
            throw(statusHandler.newResponse(400, "E-mail inválido"));
        }
        
        return true;
    }catch(error){
        throw(statusHandler.serviceError(error));
    }
};

const checkPassword = (password) =>{
    try{

        if(!!!password){
            throw(statusHandler.newResponse(409, "Password cannot be empty"));
        }

        if(!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)){
            throw(statusHandler.newResponse(400, "Invalid password"));
        }

        return true;
    }catch(error){
        throw(statusHandler.serviceError(error));
    }
};

const createHash = (password)=>{
    try{
 
        return hashSync(password, genSaltSync(12)); 
    }catch(error){
        throw(statusHandler.newResponse(422, "Erro ao gerar hash"));
    }
};
 
 const checkHash = (password, hash, boolean = false)=>{
     try{
         
         if(!compareSync(password, hash)){
 
             if(boolean){
 
                 return false;
             }
 
             throw(statusHandler.newResponse(401, "Incorrect password"));
         }
 
         return true;
     }catch(error){
         throw(statusHandler.serviceError(error))
     }
};
 
function constructorWithArray(key, dto, body){
    try{
    
        this[key] = [];
        const keyFront = dto[key][0].key_front;
    
        if(body[keyFront]?.length > 0){

            body[keyFront].forEach(value=>{
                this[key].push(value);
            });
        }

        return this[key];
    }catch(error){
        throw(statusHandler.serviceError(error));
    }
};

function constructorRecursive(key, dto, body, update){
    try{
    
        if(!dto[key][0].subObject){

            return constructorWithArray(key, dto, body);
        }

        dto = dto[key][0];

        const keyFront = dto.key_front;
        
        if(body[keyFront]){
            body =  body[keyFront];
            this[key] = [];

            body.forEach(val=>{
                 
                let objeto = {};
                Object.keys(val).forEach(keyBody=>{ 
                   
                    let keyBack = getKeyBack(dto, keyBody); 
                  
                    if(keyBack){
                     
                        if(isArray(val[keyBody])){
                            const _ = getKeyBack(dto, keyBody, true);

                            objeto[_] = [];
                            val[keyBody].forEach(value=>{
                                objeto[_].push(value);
                            });
                            
                            return;
                        }
                
                        objeto[keyBack] = val[keyBody];
                    }
                    
                });

                this[key].push(objeto);
            });
           
            return this[key];
        }

    }catch(error){
        throw(statusHandler.serviceError(error));
    }
};

function constructor(dto, body, update){
    try{

        Object.keys(dto).forEach(key=>{

            if(dto[key][0]){

                this[key] = constructorRecursive(key, dto, body, update);

                return;
            }

            const keyFront = dto[key].key_front;

            if(keyFront){

                if(body[keyFront] || body[keyFront] === 0){

                    if(update){

                        if(dto[key].update){
                            this[key] = body[keyFront];
                        }

                        return;
                    }

                    this[key] = body[keyFront]
                }

            }

        });

    }catch(error){
        throw(statusHandler.serviceError(error));
    }
};

const getKeyFront = (dto, keyDB, array=false)=>{
    try{

        return array ? dto[keyDB][0].key_front : dto[keyDB].key_front;
    }catch(error){
        throw(statusHandler.serviceError(error));
    }
};

const verifyJwt = async(token)=>{
    try{

        const secret = await getValue("JWT-SECRET");

        return jwt.verify(token, secret);
    }catch(error){
        console.log(error)
        throw(statusHandler.serviceError(error));
    }
};

const createJwt = async(data)=>{
    try{

        const secret = await getValue("JWT-SECRET");
        const expiresIn = await getValue("JWT-EXPIRE");
        
        
        return  jwt.sign({
            data
        }, secret, { expiresIn });
    }catch(error){
        console.log(error);
        throw(statusHandler.newResponse(422, "Erro ao criar token"));
    }
};

const checkIdMongo = (id)=>{
    try{

    }catch(error){
        throw(statusHandler.serviceError(error));
    }
};

const verifyRecursiveArray = (body, keyDto, dto)=>{
    try{

        body.forEach(value=>{

            const keyFrontBack = dto[keyDto][0].key_front;

            if(dto[keyDto][0].required){

                if(!value[keyFrontBack]){
                    throw(statusHandler.newResponse(422, `${keyFrontBack} is required`));
                }
                
            }
            
            if(value[keyFrontBack]){

                if(isArray(value[keyFrontBack]) && value[keyFrontBack].length > 0){

                    value[keyFrontBack].forEach(val=>{
                           
                        const fild = (""+val);

                        if(fild === "undefined" || fild === "null" || fild === ""){
                
                            if(typeof value[keyFrontBack] === type){
                                return;
                            }

                            throw(statusHandler.newResponse(422, `${keyFrontBack} é invalido`));
                        }

                        const type = getTypeDto(dto[keyDto][0]);

                        if(typeof val === type){
                            return;
                        }

                        throw(statusHandler.newResponse(422, `${keyFrontBack} inválido`));
                    });

                    return;
                }
                
                throw(statusHandler.newResponse(422, `${keyFrontBack} não pode ser vazio`));
            }

        });

        return true;
    }catch(error){
        throw(statusHandler.serviceError(error));
    }
};

const verifyRecursiveObject = (body, keyDto, dto)=>{
    try{

        const keyFrontBack = dto[keyDto].key_front;
        const type = getTypeDto(dto[keyDto]);
               
        body.forEach(value=>{   

            if(dto[keyDto].required){

                const fild = (""+value[keyFrontBack]);
                
                if(fild === "undefined" || fild === "null" || fild === ""){
                        throw(statusHandler.newResponse(422, `${keyFrontBack} is required`));
                }

                if(typeof value[keyFrontBack] === type){
                    return;
                }

                throw(statusHandler.newResponse(422, `${keyFrontBack} is invalid`));
            }

        });

        return true;
    }catch(error){
        throw(statusHandler.serviceError(error));
    }
};

const verifyRecursive = (key, body, dto)=>{
    try{
        
        if(!dto[key][0].subObject){

            return verifyTypesWithArray(key, body, dto);
        }

        const keyFront = dto[key][0].key_front;

        if(dto[key][0].required){
             
            if(!body[keyFront]){
                throw(statusHandler.newResponse(422, `${keyFront} é obrigatorio`));
            }

        }
       
        dto = dto[key][0];
        
        if(body[keyFront]){
            
            if(body[keyFront].length === 0){
                throw(statusHandler.newResponse(422, `Se ${keyFront} existir não pode ser vazio`));
            }

            body = body[keyFront];
            Object.keys(dto).forEach(keyDto=>{

                if(keyDto === 'key_front' || keyDto === "subObject" || keyDto === "type"){
                    return;
                }
               
                if(dto[keyDto][0]){

                    return verifyRecursiveArray(body, keyDto, dto);
                }

                verifyRecursiveObject(body, keyDto, dto);
            });
        }

        return true;
    }catch(error){
        throw(statusHandler.serviceError(error));
    }
};

const verifyTypesWithArray = (key, body, dto)=>{
    try{
       
        const keyFront =  dto[key][0].key_front;
        
        if(keyFront){
            let type = (""+dto[key][0].type)
                    .replace("() { [native code] }", "")
                    .replace("function ", "")
                    .toLowerCase();
            type = type === "string" || type === "number" ? type : "string";

            const fild = (""+body[keyFront]);

            if(dto[key][0].required){

                if(fild === "undefined" || fild === "null" || fild === ""  || body[keyFront].length < 1){
                    throw(statusHandler.newResponse(422, `O campo ${keyFront} não pode ser vazio`))
                }

            }

            if(body[keyFront]){

                if(!isArray(body[keyFront])){
                    throw(statusHandler.newResponse(422, `${keyFront} possui tipo inválido`))
                }

                body[keyFront].forEach(valor=>{

                    if(typeof valor !== type){
                        throw(statusHandler.newResponse(422, `O campo ${keyFront} é inválido`));
                    }

                    return;
                });

            }
    
        }

        return true;
    }catch(error){
        throw(statusHandler.serviceError(error));
    }
};

const verifyTypes = (body, dto, update = false)=>{
    try{
      
        if(!!!body){
            throw(statusHandler.newResponse(422, "Valor não pode ser vazio"));
        }
        
        Object.keys(dto).forEach(key=>{

            if(dto[key][0]){
                return verifyRecursive(key, body, dto);
            }

            const keyFront =  dto[key].key_front;

            if(keyFront){

                let type = (""+dto[key].type)
                    .replace("() { [native code] }", "")
                    .replace("function ", "")
                    .toLowerCase();
                type = type === "string" || type === "number" || type === "object" ?   type : "string";
                    
                const fild = (""+body[keyFront]);

                if(!dto[key].update && update){

                    return;
                }

                if(dto[key].required){

                    if(fild === "undefined" || fild === "null" || fild === ""){
                        throw(statusHandler.newResponse(422, `O campo ${keyFront} não pode ser vazio`))
                    }

                }
                
                if(body[keyFront] || body[keyFront] === 0){
                    
                    if(typeof body[keyFront] !== type){
                        throw(statusHandler.newResponse(422, `O campo ${keyFront} é inválido`));s
                    }

                    return;
                }

            }

        });

        return true;
    }catch(error){
        throw(statusHandler.serviceError(error));
    }
};

const encryptKeyFront = (key)=>{

    return key;
};

const checkCookiesAndGetId = async(cookies)=>{
    try{

        cookies = cookies.replace("Bearer ", "");

        const {data} = await verifyJwt(cookies);

        checkIdMongo(data?.id);

        return data.id;
    }catch(error){
        console.log(error);
        throw(statusHandler.newResponse(401, "Unauthorized user"));
    }
};

module.exports = {
    constructor,
    constructorRecursive,
    constructorWithArray,
    checkHash,
    createHash,
    getKeyFront,
    checkPassword,
    checkEmail,
    checkIdMongo,
    createJwt,
    verifyJwt,
    verifyTypes,
    encryptKeyFront,
    checkCookiesAndGetId
};