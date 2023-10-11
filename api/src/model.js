const connection = require("./helpers/helpers.dataBase")();
const statusHandler = require("./helpers/helpers.statusHandler");
const {
    constructor
} = require("./helpers/helpers.global");
const {readdirSync, existsSync} = require("fs");
const dirs = readdirSync(__dirname);

const getAllModels = ()=>{
    try{

        let models = [];

        if(dirs.length>0){

            dirs.forEach(dir=>{
        
                const path = `${__dirname}/${dir}/${dir}.model.js`;
        
                if(existsSync(path)){

                    const model = require(path);
                    
                    models = models.concat(model);
                }
        
            });

        }
    
        return models;
    }catch(error){
        throw(statusHandler.serviceError(error));
    }
};

const findSchemaAndDto = (model)=>{
    try{

        const models = getAllModels();

        const find = models.find(value=>{

            if(value.model === model){

                return value;
            }

        });

        if(find){

            return find;
        }

        throw(statusHandler.newResponse(422, "Invalid model"));
    }catch(error){
        throw(statusHandler.serviceError(error));
    }
};

const save = async(value, model, useConstructor=true)=>{
    try{

        const {
            schema:Schema,
            dto, 
        } = findSchemaAndDto(model);

        value = useConstructor ? new constructor(dto, value) : value;
       
        const newValue =  new Schema(value);
        const {_id} = await newValue.save();

        if(!!!_id){
            throw(statusHandler.newResponse(422, `Error creating ${model}`));
        }
        
        return _id;
    }catch(error){
        throw(statusHandler.serviceError(error));
    }
};

const findAll = async(query, model)=>{
    try{

        const {
            schema:Schema,
            dto, 
            populate
        } = findSchemaAndDto(model);

        return await Schema.find(query)
            .populate(populate);
    }catch(error){
        throw(statusHandler.serviceError(error));
    }
};

const findById = async(_id, model)=>{
    try{    

        const {
            schema:Schema,
            dto, 
            populate
        } = findSchemaAndDto(model);
        const find = await Schema.findOne({_id})
            .populate(populate);

        if(!!!find){
            throw(statusHandler.newResponse(500, `Error getting ${model}`));
        }
        
        return find;
    }catch(error){
        throw(statusHandler.serviceError(error));
    }
};

const updateById = async(value, _id, model, useConstructor = true)=>{
    try{
        
        const {
            schema:Schema,
            dto, 
        } = findSchemaAndDto(model);

        value = useConstructor ? new constructor(dto, value, true) : value;

        const update = await Schema.updateOne({_id}, value);

        if(!update.acknowledged || update.modifiedCount === 0){
            throw(statusHandler.newResponse(500, `Error updating ${model}`));
        }

        return true;
    }catch(error){   
        throw(statusHandler.serviceError(error));
    }
};

const aggregate = async(query, model)=>{
    try{

        const {
            schema:Schema,
        } = findSchemaAndDto(model);

        return await Schema.aggregate(query)

    }catch(error){
        throw(statusHandler.serviceError(error));
    }
};

const populate = async(value, model)=>{
    try{

        const {
            schema:Schema,
            populate
        } = findSchemaAndDto(model);
        
        return await Schema.populate(value, populate);
    }catch(error){
        throw(statusHandler.serviceError(error));
    }
};

module.exports = {
   save, 
   findAll,
   findById,
   updateById,
   aggregate,
   populate
};