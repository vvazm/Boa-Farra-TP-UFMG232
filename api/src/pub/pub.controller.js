const router = require("express").Router();
const statusHandler = require("../helpers/helpers.statusHandler");
const {
    getPub,
    createNewPub,
    changePub
} = require("./pub.service");

router.post("/pub", async({body}, res)=>{
    try{

        const response = await createNewPub(body);

        return res.status(response.status).send(response);
    }catch(error){  

        return statusHandler.responseError(error, res);
    }
});

router.get("/pub", async({headers}, res)=>{
    try{

        const response = await getPub(headers);

        return res.status(response.status).send(response);
    }catch(error){

        return statusHandler.responseError(error, res);
    }
});

router.put("/pub", async({headers, body}, res)=>{
    try{

        const response = await changePub(headers, body);

        return res.status(response.status).send(response);
    }catch(error){

        return statusHandler.responseError(error, res);
    }
});

module.exports = router;