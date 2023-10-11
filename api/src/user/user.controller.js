const router = require("express").Router();
const statusHandler = require("../helpers/helpers.statusHandler");
const {
    createUser,
    getUser,
    changeUser,
    changeStatusUser,
} = require("./user.service")

router.post("/user", async({body}, res)=>{
    try{

        const response = await createUser(body);

        return res.status(response.status).send(response);
    }catch(error){  

        return statusHandler.responseError(error, res);
    }
});

router.get("/user", async({headers}, res)=>{
    try{

        const response = await getUser(headers);

        return res.status(response.status).send(response);
    }catch(error){

        return statusHandler.responseError(error, res);
    }
});

router.put("/user", async({headers, body}, res)=>{
    try{

        const response = await changeUser(headers, body);

        return res.status(response.status).send(response);
    }catch(error){

        return statusHandler.responseError(error, res);
    }
});





router.delete("/user", async({headers}, res)=>{
    try{

        const response = await changeStatusUser(headers);

        return res.status(response.status).send(response);
    }catch(error){

        return statusHandler.responseError(error, res);
    }
});

module.exports = router;