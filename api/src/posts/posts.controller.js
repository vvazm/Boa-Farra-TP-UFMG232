const router = require("express").Router();
const statusHandler = require("../helpers/helpers.statusHandler");
const {
    createPost,
    getAllCheckinsByPub,
    getAllPosts,
    createCheckin,
    getAllCheckinsByPost
} = require("./posts.service");

router.post("/post", async({headers, body}, res)=>{
    try{

        const response = await createPost(body, headers);

        return res.status(response.status).send(response);
    }catch(error){  
        return statusHandler.responseError(error, res);
    }
});

router.post("/checkin", async({headers, body}, res)=>{
    try{

        const response = await createCheckin(headers, body);

        return res.status(response.status).send(response);
    }catch(error){  
        return statusHandler.responseError(error, res);
    }
});

router.get("/checkin", async({headers}, res)=>{
    try{

        const response = await getAllCheckinsByPub(headers);

        return res.status(response.status).send(response);
    }catch(error){  
        return statusHandler.responseError(error, res);
    }
});

router.get("/postCheckins/:id", async({headers, params}, res)=>{
    
    try{

        const response = await getAllCheckinsByPost(headers, params.id);

        return res.status(response.status).send(response);
    }catch(error){  
        return statusHandler.responseError(error, res);
    }
});

router.get("/post", async({}, res)=>{
    try{

        const response = await getAllPosts();

        return res.status(response.status).send(response);
    }catch(error){  
        return statusHandler.responseError(error, res);
    }
});

module.exports = router;
