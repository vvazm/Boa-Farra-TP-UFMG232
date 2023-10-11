const statusHandler = require("../helpers/helpers.statusHandler")
const {
    aggregate,
    populate,
    save, 
    findAll,
    findById,
} = require("../model");

const {
    getKeyFront,
    checkIdMongo,
    verifyTypes,
    checkCookiesAndGetId
} = require("../helpers/helpers.global");

const {
    dtoPost,
    dtoCheckin
} = require("./posts.dto")

const createPost = async(post, {authorization}, firtsPost = false)=>{
    try{

        if(!firtsPost){

            const pub = await checkCookiesAndGetId(authorization);

            post[getKeyFront(dtoPost, "key_pub_post")] = "" + pub;
        }

        verifyTypes(post, dtoPost);
        await save(post, "post");

        return statusHandler.newResponse(200, "Created post");
    }catch(error){
        throw(statusHandler.serviceError(error));
    }
};

const createCheckin = async({authorization}, checkin)=>{
    try{    

        const idUser = await checkCookiesAndGetId(authorization);
        const post = checkin[getKeyFront(dtoCheckin, "key_post_checkin")];
        const {key_pub_post} = await findById(post, "post");

        checkin[getKeyFront(dtoCheckin, "key_pub_checkin")] = "" + key_pub_post._id;
        checkin[getKeyFront(dtoCheckin, "key_user_checkin")] = idUser;
        verifyTypes(checkin, dtoCheckin);
        await save(checkin, "checkin");

        return statusHandler.newResponse(200, "Created checkin");
    }catch(error){
        throw(statusHandler.serviceError(error));
    }
};

const organizeCheckinsByUser = (checkins)=>{
    try{

        let newCheckins = [];

        checkins.forEach(checkin=>{

            const checkinAlreadyExists = newCheckins.find(value=>{

                if(value.key_user_checkin._id === checkin.key_user_checkin._id){
                    
                    return value;
                }

            });

            if(checkinAlreadyExists){

                return;
            }

            let totalCheckins = 0;

            checkins.forEach(({key_user_checkin:user})=>{

                if(user._id === checkin.key_user_checkin._id){
                    totalCheckins += 1;
                }

            });
            
            newCheckins.push({
                ...(checkin.toJSON()),
                totalCheckins
            })

        });

        return newCheckins;
    }catch(error){
        throw(statusHandler.serviceError(error));
    }
};

const getAllCheckinsByPub = async({authorization})=>{
    try{

        const id = await checkCookiesAndGetId(authorization);
        const checkins = await findAll({key_pub_checkin:id}, "checkin")

        return statusHandler.newResponse(200, organizeCheckinsByUser(checkins));
    }catch(error){
        throw(statusHandler.serviceError(error));
    }
};

const getAllCheckinsByPost = async({authorization}, id)=>{
    try{
        const checkins = await findAll({key_post_checkin:id}, "checkin")

        return statusHandler.newResponse(200, organizeCheckinsByUser(checkins));
    }catch(error){
        throw(statusHandler.serviceError(error));
    }
};

const getAllPosts = async()=>{
    try{

        const query = [
            {
                $lookup:{
                    from:"checkin_boafarras",
                    localField:"_id",
                    foreignField:"key_post_checkin",
                    as:"checkin",
                    pipeline:[
                        {
                            $sort:{
                                createdAt:-1
                            }
                        }
                    ]
                }
            }
        ];

        let findPosts = await aggregate(query, "post");

        findPosts = await populate(findPosts, "post");

        if(findPosts.length){
            
            for(i in findPosts){
                if(findPosts[i].checkin.length){
                    findPosts[i].checkin = await populate(findPosts[i].checkin, "checkin");
                }
                
            }
            
        }

        return statusHandler.newResponse(200, findPosts);
    }catch(error){
        throw(statusHandler.serviceError(error));
    }
};

module.exports = {
    createPost,
    getAllCheckinsByPub,
    getAllPosts,
    createCheckin,
    getAllCheckinsByPost
};