const statusHandler = require("./helpers.statusHandler");
const nodeVault = require("node-vault");

require("dotenv").config();

let cash = {};

const createCash = (data)=>{
    try{

        if(data){

            if(Object.entries(data)?.length > 0){

                Object.keys(data).forEach(key=>{

                    if(data[key]){
                        cash[key] = data[key];
                    }
                    
                });
            }

        }
        
        return true;
    }catch(error){
        throw(statusHandler.serviceError(error));
    }
};

const auth = async()=>{
    try{

        const options = {
            apiVersion: '',
            endpoint: '',
            token: ''
        };

        let vault = nodeVault(options);

        const result = await vault.approleLogin({
            role_id:process.env.ROLE_ID,
            secret_id:process.env.SECRET_ID
        });

        vault.token = result?.auth?.client_token

        return vault;
    }catch(error){
        throw(statusHandler.serviceError(error));
    }
};

const getVault = async(key)=>{
    try{

        if(cash[key]){

            return cash[key];
        }

        const vault = await auth();
        const url = process.env.URL_VAULT;
        const {data} = vault.read(url);

        createCash(data?.data);

        return data[key];
    }catch(error){
        throw(statusHandler.serviceError(error));
    }
};

const getValue = async(key)=>{
    try{

        if(process.env.ENV == "DEV"){

            let newKey =  key;
            key.split("-").forEach(valor=>{
                newKey = newKey.replace("-","_")
            });

            return process.env[newKey];
        }

        return getVault(key);
    }catch(error){
        throw(statusHandler.serviceError(error));
    }
};

module.exports = {
    getValue
};